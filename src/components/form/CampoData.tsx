"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ToggleEvent } from "react";
import { dataLocal } from "@/lib/relogio";
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
  /** A outra ponta da viagem (a volta, no campo da ida, e vice-versa): o calendário sombreia os dias entre as duas. */
  outra?: string;
  required?: boolean;
};

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const SEMANA_LONGA = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

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

/* Contas de calendário em UTC, para o fuso nunca mudar o dia. */
const utc = (iso: string) => new Date(`${iso}T00:00:00Z`);
const isoUtc = (d: Date) => d.toISOString().slice(0, 10);
const somarDias = (iso: string, n: number) => {
  const d = utc(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return isoUtc(d);
};
const somarMeses = (mes: string, n: number) => {
  const d = utc(`${mes}-01`);
  d.setUTCMonth(d.getUTCMonth() + n);
  return isoUtc(d).slice(0, 7);
};
/** As 6 semanas que aparecem na tela para o mês (AAAA-MM), começando no domingo. */
function semanasDo(mes: string): string[] {
  const primeiro = utc(`${mes}-01`);
  const inicio = somarDias(`${mes}-01`, -primeiro.getUTCDay());
  return Array.from({ length: 42 }, (_, i) => somarDias(inicio, i));
}

const ICONE = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
const SETA = (d: "esq" | "dir") => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d === "esq" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/**
 * Data digitada no formato dd/mm/aaaa, com as barras entrando sozinhas, e um calendário próprio no botão ao lado.
 * Substitui o campo de data do navegador, que pula do dia para o mês no meio da digitação e tem visual próprio de cada aparelho.
 * Só devolve a data quando ela existe e está entre `min` e `max`.
 */
export default function CampoData({ rotulo, ajuda, valor, onChange, min, max, avisoMin, outra, required }: Props) {
  const id = useId();
  const popId = `${id}-calendario`;
  const campo = useRef<HTMLInputElement>(null);
  const caixa = useRef<HTMLDivElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const grade = useRef<HTMLDivElement>(null);
  const [texto, setTexto] = useState(() => textoDe(valor));
  const [saiu, setSaiu] = useState(false);
  const [valorVisto, setValorVisto] = useState(valor);
  const [aberto, setAberto] = useState(false);
  const [mes, setMes] = useState("");
  const [foco, setFoco] = useState("");
  const [hoje, setHoje] = useState("");

  const erro = problema(texto, min, max, avisoMin);
  const valido = erro ? "" : (isoDe(texto) ?? "");

  // A data mudou por fora (ex.: a ida passou da volta): o texto acompanha.
  if (valor !== valorVisto) {
    setValorVisto(valor);
    if (valor !== valido) setTexto(textoDe(valor));
  }

  // O formulário não envia com data incompleta ou fora do prazo; o navegador mostra o motivo.
  useEffect(() => {
    campo.current?.setCustomValidity(erro);
  }, [erro]);

  // Calendário aberto: fica colado no campo (abaixo, ou acima se faltar espaço) mesmo rolando a página.
  useEffect(() => {
    if (!aberto) return;
    const posicionar = () => {
      const el = pop.current;
      const c = caixa.current;
      if (!el || !c) return;
      const r = c.getBoundingClientRect();
      const larg = el.offsetWidth;
      const alt = el.offsetHeight;
      const left = Math.max(8, Math.min(r.left, window.innerWidth - larg - 8));
      let top = r.bottom + 6;
      if (top + alt > window.innerHeight - 8) {
        // Sem espaço embaixo: abre em cima; se também não couber, encosta na borda de baixo da tela.
        top = r.top - alt - 6 > 8 ? r.top - alt - 6 : Math.max(8, window.innerHeight - alt - 8);
      }
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    };
    posicionar();
    window.addEventListener("scroll", posicionar, true);
    window.addEventListener("resize", posicionar);
    return () => {
      window.removeEventListener("scroll", posicionar, true);
      window.removeEventListener("resize", posicionar);
    };
  }, [aberto, mes]);

  // Setas do teclado movem o foco entre os dias.
  useEffect(() => {
    if (aberto && foco) grade.current?.querySelector<HTMLButtonElement>(`[data-dia="${foco}"]`)?.focus();
  }, [aberto, foco]);

  function mudar(novo: string) {
    setTexto(novo);
    const e = problema(novo, min, max, avisoMin);
    const iso = e ? "" : (isoDe(novo) ?? "");
    if (iso !== valor) onChange(iso);
  }

  const permitido = (iso: string) => (!min || iso >= min) && (!max || iso <= max);

  function alternou(e: ToggleEvent<HTMLDivElement>) {
    const abrir = e.newState === "open";
    setAberto(abrir);
    if (!abrir) return;
    const agora = dataLocal(Date.now());
    const base = valido || (min && min > agora ? min : agora);
    setHoje(agora);
    setMes(base.slice(0, 7));
    setFoco(permitido(base) ? base : (min ?? base));
  }

  function escolher(iso: string) {
    setSaiu(true);
    mudar(textoDe(iso));
    pop.current?.hidePopover();
    campo.current?.focus();
  }

  function teclas(e: KeyboardEvent<HTMLDivElement>) {
    const passos: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    let alvo = "";
    if (e.key in passos) alvo = somarDias(foco, passos[e.key]);
    else if (e.key === "PageUp") alvo = somarDias(foco, -30);
    else if (e.key === "PageDown") alvo = somarDias(foco, 30);
    else return;
    e.preventDefault();
    if (min && alvo < min) alvo = min;
    if (max && alvo > max) alvo = max;
    setFoco(alvo);
    setMes(alvo.slice(0, 7));
  }

  const mostrarErro = erro && (saiu || texto.length === 10);
  const [ano, mesNum] = mes ? mes.split("-").map(Number) : [0, 0];
  const podeVoltar = !!mes && (!min || somarMeses(mes, -1) >= min.slice(0, 7));
  const podeAvancar = !!mes && (!max || somarMeses(mes, 1) <= max.slice(0, 7));
  // Dias entre a ida e a volta, para sombrear a viagem.
  const faixa = valido && outra ? (valido < outra ? [valido, outra] : [outra, valido]) : null;

  return (
    <div className={s.campo}>
      <label htmlFor={id}>
        {rotulo}
        {ajuda && <span className={s.ajuda}> {ajuda}</span>}
      </label>
      <div className={s.data} ref={caixa}>
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
        <button
          type="button"
          className={s.calendario}
          popoverTarget={popId}
          aria-label={`Abrir calendário: ${rotulo}`}
          aria-expanded={aberto}
        >
          {ICONE}
        </button>
      </div>
      <div
        ref={pop}
        id={popId}
        popover="auto"
        className={s.calendarioPop}
        role="dialog"
        aria-label={`Calendário: ${rotulo}`}
        onToggle={alternou}
      >
        {aberto && mes && (
          <>
            <div className={s.calTopo}>
              <button type="button" className={s.calSeta} onClick={() => setMes(somarMeses(mes, -1))} disabled={!podeVoltar} aria-label="Mês anterior">
                {SETA("esq")}
              </button>
              <p className={s.calMes} aria-live="polite">
                {MESES[mesNum - 1]} <span>{ano}</span>
              </p>
              <button type="button" className={s.calSeta} onClick={() => setMes(somarMeses(mes, 1))} disabled={!podeAvancar} aria-label="Próximo mês">
                {SETA("dir")}
              </button>
            </div>
            <div className={s.calSemana} aria-hidden="true">
              {SEMANA.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className={s.calDias} ref={grade} role="grid" onKeyDown={teclas}>
              {semanasDo(mes).map((dia) => {
                const fora = dia.slice(0, 7) !== mes;
                const ok = permitido(dia);
                const escolhido = dia === valido;
                const ponta = (!!faixa && (dia === faixa[0] || dia === faixa[1])) || dia === outra;
                const meio = !!faixa && dia > faixa[0] && dia < faixa[1];
                const d = utc(dia);
                return (
                  <button
                    key={dia}
                    type="button"
                    data-dia={dia}
                    className={s.calDia}
                    data-fora={fora || undefined}
                    data-hoje={dia === hoje || undefined}
                    data-escolhido={escolhido || undefined}
                    data-ponta={(ponta && !escolhido) || undefined}
                    data-meio={meio || undefined}
                    disabled={!ok}
                    tabIndex={dia === foco ? 0 : -1}
                    aria-pressed={escolhido}
                    aria-label={`${SEMANA_LONGA[d.getUTCDay()]}, ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`}
                    onClick={() => escolher(dia)}
                  >
                    {d.getUTCDate()}
                  </button>
                );
              })}
            </div>
            <div className={s.calRodape}>
              {texto ? (
                <button
                  type="button"
                  className={s.calLink}
                  onClick={() => {
                    mudar("");
                    pop.current?.hidePopover();
                    campo.current?.focus();
                  }}
                >
                  Limpar
                </button>
              ) : (
                <span />
              )}
              <button type="button" className={s.calLink} onClick={() => pop.current?.hidePopover()}>
                Fechar
              </button>
            </div>
          </>
        )}
      </div>
      {mostrarErro && (
        <span id={`${id}-erro`} className={s.erro} role="alert">
          {erro}
        </span>
      )}
    </div>
  );
}
