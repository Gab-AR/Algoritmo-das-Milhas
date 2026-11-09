"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import { AEROPORTOS } from "@/data/aeroportos";
import s from "./Campos.module.css";

type Props = {
  rotulo: string;
  ajuda?: string;
  valor: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
};

const semAcento = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const OPCOES = AEROPORTOS.map((a) => ({
  texto: `${a.cidade} (${a.codigo})`,
  detalhe: [a.detalhe, a.pais].filter(Boolean).join(" · "),
  busca: semAcento(`${a.cidade} ${a.codigo} ${a.detalhe ?? ""} ${a.pais}`),
}));

/** Cidade ou aeroporto com sugestões logo abaixo do campo. Aceita texto livre para destinos fora da lista. */
export default function CampoCidade({ rotulo, ajuda, valor, onChange, placeholder, required }: Props) {
  const id = useId();
  const lista = `${id}-lista`;
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);

  const sugestoes = useMemo(() => {
    const q = semAcento(valor.trim());
    if (!q) return OPCOES.slice(0, 8);
    const comeca = OPCOES.filter((o) => o.busca.startsWith(q) || o.busca.includes(` ${q}`));
    const contem = OPCOES.filter((o) => !comeca.includes(o) && o.busca.includes(q));
    return [...comeca, ...contem].slice(0, 8);
  }, [valor]);

  const visivel = aberto && sugestoes.length > 0 && !OPCOES.some((o) => o.texto === valor);

  function escolher(texto: string) {
    onChange(texto);
    setAberto(false);
  }

  function teclas(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAberto(true);
      setAtivo((i) => Math.min(i + 1, sugestoes.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAtivo((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && visivel) {
      e.preventDefault();
      escolher(sugestoes[ativo].texto);
    } else if (e.key === "Escape") {
      setAberto(false);
    }
  }

  return (
    <div className={`${s.campo} ${s.cidade}`}>
      <label htmlFor={id}>
        {rotulo}
        {ajuda && <span className={s.ajuda}> {ajuda}</span>}
      </label>
      <input
        id={id}
        role="combobox"
        aria-expanded={visivel}
        aria-controls={lista}
        aria-autocomplete="list"
        aria-activedescendant={visivel ? `${lista}-${ativo}` : undefined}
        autoComplete="off"
        value={valor}
        placeholder={placeholder}
        required={required}
        onChange={(e) => {
          onChange(e.target.value);
          setAtivo(0);
          setAberto(true);
        }}
        onFocus={() => setAberto(true)}
        onBlur={() => setAberto(false)}
        onKeyDown={teclas}
      />
      {visivel && (
        <ul id={lista} role="listbox" className={s.sugestoes}>
          {sugestoes.map((o, i) => (
            <li
              key={o.texto}
              id={`${lista}-${i}`}
              role="option"
              aria-selected={i === ativo}
              // mousedown, não click: escolhe antes de o campo perder o foco e fechar a lista
              onMouseDown={(e) => {
                e.preventDefault();
                escolher(o.texto);
              }}
              onMouseEnter={() => setAtivo(i)}
            >
              <span>{o.texto}</span>
              <span className={s.ajuda}>{o.detalhe}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
