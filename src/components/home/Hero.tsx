/* eslint-disable @next/next/no-img-element -- site estático: fotos já nos tamanhos certos */
import type { Promocao } from "@/lib/promocao";
import BuscaRapida from "./BuscaRapida";
import Destaque from "./Destaque";
import s from "./Hero.module.css";

// Destinos que se revezam no fundo da primeira tela (fotos da biblioteca de destinos).
const FUNDOS = [
  { arquivo: "fernando-de-noronha", lugar: "Baía do Sancho, Fernando de Noronha" },
  { arquivo: "lisboa", lugar: "Bonde 28, Lisboa" },
  { arquivo: "rio-de-janeiro", lugar: "Pão de Açúcar, Rio de Janeiro" },
  { arquivo: "paris", lugar: "Torre Eiffel, Paris" },
];

const CONFIANCA = [
  "Você só paga depois de receber a passagem",
  "Confira a reserva no site da companhia",
  "Atendimento pelo WhatsApp, de Teresina para o mundo",
];

/** Primeira tela: destinos que se revezam ao fundo, a busca rápida e a promoção do momento. */
export default function Hero({ promocoes, geradoEm }: { promocoes: Promocao[]; geradoEm: number }) {
  return (
    <section className={s.hero} aria-labelledby="titulo-principal">
      <div className={s.fundos} aria-hidden="true">
        {FUNDOS.map((f, i) => (
          <figure key={f.arquivo} className={s.fundo} style={{ animationDelay: `${i === 0 ? 0 : i * 6 - 24}s` }}>
            <img
              src={`/fotos/destinos/${f.arquivo}.jpg`}
              alt=""
              width={1200}
              height={800}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
            />
            <figcaption>{f.lugar}</figcaption>
          </figure>
        ))}
      </div>

      <div className={`${s.conteudo} moldura`}>
        <div className={s.topo}>
          <div className={s.chamada}>
            <h1 id="titulo-principal">Sua próxima viagem começa aqui</h1>
            <p>Passagens aéreas em promoção para o Brasil e o mundo, com atendimento pelo WhatsApp.</p>
          </div>
          <div className={s.destaque}>
            <Destaque promocoes={promocoes} geradoEm={geradoEm} />
          </div>
        </div>
        <BuscaRapida />
        <ul className={s.confianca}>
          {CONFIANCA.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
