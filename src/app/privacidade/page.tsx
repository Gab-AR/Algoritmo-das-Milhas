import type { Metadata } from "next";
import PaginaTexto from "@/components/PaginaTexto";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "O site da Algoritmo das Milhas não guarda dados pessoais nem usa cookies de rastreamento.",
};

// Rascunho em revisão jurídica (decisão de 07/11/2026).
export default function Privacidade() {
  return (
    <PaginaTexto
      titulo="Privacidade"
      abertura="O site não guarda seus dados pessoais e não usa cookies de rastreamento."
    >
      <h2>Formulários</h2>
      <p>
        Os formulários de orçamento e a janela das promoções apenas montam uma mensagem no seu próprio navegador. Nada
        é enviado para um servidor do site: a mensagem só sai quando você mesmo a envia pelo WhatsApp.
      </p>

      <h2>Conversa no WhatsApp</h2>
      <p>
        Os dados que você manda pelo WhatsApp, como nomes e documentos dos passageiros, são usados somente para fazer
        o orçamento e emitir as passagens que você pediu. O WhatsApp tem a sua própria política de privacidade.
      </p>

      <h2>Medição de visitas</h2>
      <p>
        Contamos visitas às páginas e cliques nos botões de compra de forma agregada, sem cookies e sem identificar quem
        visitou. Esses números servem só para saber quais promoções interessam mais.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Você pode pedir a qualquer momento que os dados enviados pelo WhatsApp sejam apagados, conforme a Lei Geral de
        Proteção de Dados (Lei 13.709/2018). Basta pedir no WhatsApp {SITE.whatsappVisivel}.
      </p>
    </PaginaTexto>
  );
}
