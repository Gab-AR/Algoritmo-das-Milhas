import Link from "next/link";
import { SITE } from "@/lib/site";
import { linkWhatsApp } from "@/lib/whatsapp";

/** Bloco lateral das páginas de texto: a regra principal e os dois caminhos. */
export default function ChamadaWhatsApp() {
  return (
    <>
      <h2>Você só paga depois de receber a passagem</h2>
      <p>
        Atendimento de {SITE.atendimento}, pelo WhatsApp {SITE.whatsappVisivel}.
      </p>
      <a
        className="botao"
        href={linkWhatsApp("Olá! Vim pelo site da Algoritmo das Milhas.")}
        target="_blank"
        rel="noopener"
      >
        Chamar no WhatsApp
      </a>
      <Link className="botao" data-tom="papel" href="/orcamento/">
        Solicitar orçamento
      </Link>
    </>
  );
}
