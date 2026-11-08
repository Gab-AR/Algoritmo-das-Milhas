"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import s from "./Campos.module.css";

type ContadorProps = {
  rotulo: string;
  ajuda?: string;
  valor: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
};

/** Quantidade com botões grandes de − e +, confortáveis para o polegar. */
export function Contador({ rotulo, ajuda, valor, min = 0, max = 9, onChange }: ContadorProps) {
  const id = useId();
  return (
    <div className={s.contador} role="group" aria-labelledby={id}>
      <span className={s.contadorRotulo}>
        <span id={id}>{rotulo}</span>
        {ajuda && <span className={s.ajuda}>{ajuda}</span>}
      </span>
      <span className={s.controles}>
        <button
          type="button"
          onClick={() => onChange(Math.max(min, valor - 1))}
          disabled={valor <= min}
          aria-label={`Menos ${rotulo.toLowerCase()}`}
        >
          −
        </button>
        <output aria-live="polite">{valor}</output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, valor + 1))}
          disabled={valor >= max}
          aria-label={`Mais ${rotulo.toLowerCase()}`}
        >
          +
        </button>
      </span>
    </div>
  );
}

type EscolhaProps<T extends string> = {
  rotulo: string;
  opcoes: { valor: T; texto: string }[];
  valor: T;
  onChange: (v: T) => void;
};

/** Escolha única em botões lado a lado (rádios por baixo, para teclado e leitor de tela). */
export function Escolha<T extends string>({ rotulo, opcoes, valor, onChange }: EscolhaProps<T>) {
  const nome = useId();
  return (
    <fieldset className={s.escolha}>
      <legend>{rotulo}</legend>
      <div className={s.opcoes}>
        {opcoes.map((o) => (
          <label key={o.valor} data-marcado={valor === o.valor}>
            <input
              type="radio"
              name={nome}
              value={o.valor}
              checked={valor === o.valor}
              onChange={() => onChange(o.valor)}
            />
            {o.texto}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type CampoProps = InputHTMLAttributes<HTMLInputElement> & { rotulo: string; ajuda?: string };

export function Campo({ rotulo, ajuda, ...input }: CampoProps) {
  const id = useId();
  return (
    <div className={s.campo}>
      <label htmlFor={id}>
        {rotulo}
        {ajuda && <span className={s.ajuda}> {ajuda}</span>}
      </label>
      <input id={id} {...input} />
    </div>
  );
}

type TextoProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { rotulo: string };

export function Texto({ rotulo, ...area }: TextoProps) {
  const id = useId();
  return (
    <div className={s.campo}>
      <label htmlFor={id}>{rotulo}</label>
      <textarea id={id} rows={3} {...area} />
    </div>
  );
}

/** A mensagem que vai para o WhatsApp, mostrada enquanto o visitante preenche. */
export function Previa({ mensagem }: { mensagem: string }) {
  return (
    <div className={s.previa}>
      <span className={s.previaRotulo}>Sua mensagem para o WhatsApp</span>
      <p>{mensagem}</p>
    </div>
  );
}
