import Link from "next/link";
import Foto from "@/components/Foto";
import s from "./Hero.module.css";

/** Primeira tela: a passagem que o cliente recebe antes de pagar, sobre Teresina à noite. */
export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="titulo-principal">
      <Foto
        nome="ponte-estaiada-noite"
        alt="Ponte Estaiada de Teresina iluminada à noite"
        className={s.foto}
        prioridade
        altura={1067}
      />
      <article className={s.bilhete} id="bilhete">
        <div className={s.corpo}>
          <h1 id="titulo-principal">Você só paga depois de receber a passagem</h1>
          <ul className={s.fatos}>
            <li>Passagens aéreas em promoção</li>
            <li>Atendimento pelo WhatsApp</li>
            <li>De Teresina para o Brasil e o mundo</li>
          </ul>
          <p className={s.apoio}>
            A Algoritmo das Milhas emite a passagem, você confere a reserva no site da companhia aérea e só então faz o
            PIX.
          </p>
        </div>
        <div className={s.canhoto}>
          <span className={s.credito}>Ponte Estaiada, Teresina</span>
          <a className="botao" href="#promocoes">
            Ver promoções
          </a>
          <Link className="link" href="/orcamento/">
            Pedir orçamento
          </Link>
        </div>
      </article>
    </section>
  );
}
