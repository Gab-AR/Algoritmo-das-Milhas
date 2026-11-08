import Link from "next/link";
import { ordem } from "@/lib/estilo";
import { INSTAGRAM_URL, SITE } from "@/lib/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import s from "./Contato.module.css";

/** O número do WhatsApp como o maior texto da tela: é por ele que tudo acontece. */
export default function Contato() {
  const [ddd, numero] = SITE.whatsappVisivel.split(" ");
  return (
    <section className={`${s.contato} moldura`} aria-labelledby="titulo-contato">
      <div className={s.topo}>
        <h2 id="titulo-contato" data-revelar>
          Não achou seu destino?
        </h2>
        <p data-revelar style={ordem(1)}>
          Peça um orçamento de passagem, hotel, pacote ou seguro viagem. A mensagem vai pronta para o nosso WhatsApp.
        </p>
      </div>
      <a
        className={s.numero}
        href={linkWhatsApp("Olá! Vim pelo site e quero um orçamento.")}
        target="_blank"
        rel="noopener"
        aria-label={`Chamar no WhatsApp ${SITE.whatsappVisivel}`}
        data-revelar
      >
        <span>{ddd}</span>
        <span>{numero}</span>
      </a>
      <div className={s.cantos}>
        <Link className="botao" data-tom="papel" href="/orcamento/">
          Solicitar orçamento
        </Link>
        <span>
          {SITE.cidade} · {SITE.atendimento}
        </span>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
          Instagram @{SITE.instagram}
        </a>
      </div>
    </section>
  );
}
