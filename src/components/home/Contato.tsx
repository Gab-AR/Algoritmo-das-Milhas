import Link from "next/link";
import { ordem } from "@/lib/estilo";
import { INSTAGRAM_URL, SITE } from "@/lib/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import s from "./Contato.module.css";

const TIPOS = [
  { tipo: "passagem", titulo: "Passagem", texto: "Qualquer origem e destino, com datas exatas ou flexíveis." },
  { tipo: "hotel", titulo: "Hotel", texto: "Destino, datas, quartos e se quer café da manhã." },
  { tipo: "pacote", titulo: "Pacote", texto: "Passagem, hotel, passeios e transfer juntos." },
  { tipo: "seguro", titulo: "Seguro viagem", texto: "Para viagens ao exterior, pela idade de cada viajante." },
];

/** Para quem não achou a promoção certa: os quatro tipos de orçamento e o contato direto. */
export default function Contato() {
  return (
    <section className={`${s.contato} moldura`} aria-labelledby="titulo-contato">
      <div className={s.texto}>
        <h2 id="titulo-contato" data-revelar>
          Não achou seu destino?
        </h2>
        <p data-revelar style={ordem(1)}>
          Conte para onde quer ir e a gente procura a melhor tarifa disponível para você. Respondemos de{" "}
          {SITE.atendimento}.
        </p>
        <div className={s.acoes} data-revelar style={ordem(2)}>
          <Link className="botao" href="/orcamento/">
            Solicitar orçamento
          </Link>
          <a
            className="botao"
            data-tom="tinta"
            href={linkWhatsApp("Olá! Vim pelo site e quero um orçamento.")}
            target="_blank"
            rel="noopener"
          >
            Chamar no WhatsApp
          </a>
        </div>
        <p className={s.contatos} data-revelar style={ordem(3)}>
          WhatsApp {SITE.whatsappVisivel} ·{" "}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
            Instagram @{SITE.instagram}
          </a>
        </p>
      </div>
      <ul className={s.tipos}>
        {TIPOS.map((t, i) => (
          <li key={t.tipo} data-revelar style={ordem(i + 1)}>
            <Link href={`/orcamento/?tipo=${t.tipo}`}>
              <span className={s.tipoTitulo}>{t.titulo}</span>
              <span className={s.tipoTexto}>{t.texto}</span>
              <span className={s.seta} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
