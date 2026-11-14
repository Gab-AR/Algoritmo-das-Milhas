"use client";

import { useEffect, useId, useRef, useState } from "react";
import s from "./Campos.module.css";

type Props = {
  rotulo: string;
  ajuda?: string;
  /** Data escolhida em AAAA-MM-DD, ou "" enquanto não houver uma data válida. */
  valor: string;
  onChange: (iso: string) => void;
  /** Primeira data aceita (AAAA-MM-DD). */
  min?: string;
  /** Última data aceita (AAAA-MM-DD). */
  max?: string;
  /** Mensagem quando a data vem antes de `min`. */
  avisoMin?: string;
  required?: boolean;
};

const textoDe = (iso: string) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "");

/** Só os números, com as barras no lugar: "2012" vira "20/12". */
function mascara(v: string): string {
  const n = v.replace(/\D/g, "").slice(0, 8);
  return [n.slice(0, 2), n.slice(2, 4), n.slice(4)].filter(Boolean).join("/");
}

/** "20/12/2026" vira "2026-12-20"; data que não existe (31/02) vira null. */
function isoDe(texto: string): string | null {
  const m = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [, d, mes, a] = m;
  const data = new Date(Date.UTC(+a, +mes - 1, +d));
  if (data.getUTCFullYear() !== +a || data.getUTCMonth() !== +mes - 1 || data.getUTCDate() !== +d) return null;
  return `${a}-${mes}-${d}`;
}

function problema(texto: string, min?: string, max?: string, avisoMin?: string): string {
  if (!texto) return "";
  if (texto.length < 10) return "Digite a data completa: dd/mm/aaaa.";
  const iso = isoDe(texto);
  if (!iso) return "Essa data não existe.";
  if (min && iso < min) return avisoMin ?? `Escolha uma data a partir de ${textoDe(min)}.`;
  if (max && iso > max) return `Escolha uma data até ${textoDe(max)}.`;
  return "";
}

const CALENDARIO = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

/**
 * Data digitada no formato dd/mm/aaaa, com as barras entrando sozinhas, e um botão que abre o calendário do aparelho.
 * Substitui o campo de data do navegador, que pula do dia para o mês no meio da digitação em alguns aparelhos.
 * Só devolve a data quando ela existe e está entre `min` e `max`.
 */
export default function CampoData({ rotulo, ajuda, valor, onChange, min, max, avisoMin, required }: Props) {
  const id = useId();
  const campo = useRef<HTMLInputElement>(null);
  const seletor = useRef<HTMLInputElement>(null);
  const [texto, setTexto] = useState(() => textoDe(valor));
  const [saiu, setSaiu] = useState(false);
  const [valorVisto, setValorVisto] = useState(valor);

  const erro = problema(texto, min, max, avisoMin);
  const valido = erro ? "" : (isoDe(texto) ?? "");

  // A data mudou por fora (ex.: a ida passou da volta e a volta foi apagada): o texto acompanha.
  if (valor !== valorVisto) {
    setValorVisto(valor);
    if (valor !== valido) setTexto(textoDe(valor));
  }

  // O formulário não envia com data incompleta ou fora do prazo; o navegador mostra o motivo.
  useEffect(() => {
    campo.current?.setCustomValidity(erro);
  }, [erro]);

  function mudar(novo: string) {
    setTexto(novo);
    const e = problema(novo, min, max, avisoMin);
    const iso = e ? "" : (isoDe(novo) ?? "");
    if (iso !== valor) onChange(iso);
  }

  function abrirCalendario() {
    const el = seletor.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      campo.current?.focus();
    }
  }

  const mostrarErro = erro && (saiu || texto.length === 10);

  return (
    <div className={s.campo}>
      <label htmlFor={id}>
        {rotulo}
        {ajuda && <span className={s.ajuda}> {ajuda}</span>}
      </label>
      <div className={s.data}>
        <input
          ref={campo}
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="dd/mm/aaaa"
          maxLength={10}
          value={texto}
          required={required}
          aria-invalid={mostrarErro ? true : undefined}
          aria-describedby={mostrarErro ? `${id}-erro` : undefined}
          onChange={(e) => mudar(mascara(e.target.value))}
          onBlur={() => setSaiu(true)}
        />
        <button type="button" className={s.calendario} onClick={abrirCalendario} aria-label={`Abrir calendário: ${rotulo}`}>
          {CALENDARIO}
        </button>
        <input
          ref={seletor}
          type="date"
          className={s.seletor}
          tabIndex={-1}
          aria-hidden="true"
          min={min}
          max={max}
          value={valido}
          onChange={(e) => {
            setSaiu(true);
            mudar(textoDe(e.target.value));
          }}
        />
      </div>
      {mostrarErro && (
        <span id={`${id}-erro`} className={s.erro} role="alert">
          {erro}
        </span>
      )}
    </div>
  );
}
