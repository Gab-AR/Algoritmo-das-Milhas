import type { Metadata } from "next";
import PaginaTexto from "@/components/PaginaTexto";
import { REGRAS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de uso e de compra",
  description: "Condições de compra de passagens com a Algoritmo das Milhas: pagamento, emissão, cancelamento e remarcação.",
};

// Rascunho em revisão jurídica (decisão de 07/11/2026): ajustar aqui quando o advogado responder.
export default function Termos() {
  return (
    <PaginaTexto
      titulo="Termos de uso e de compra"
      abertura="As regras para comprar passagens com a Algoritmo das Milhas, escritas da forma mais direta possível."
    >
      <h2>Sobre o site</h2>
      <p>
        Este site mostra promoções de passagens aéreas e recebe pedidos de orçamento. A compra não acontece no site: ao
        escolher uma promoção ou pedir um orçamento, você é levado ao WhatsApp {SITE.whatsappVisivel}, onde o
        atendimento continua.
      </p>

      <h2>Preços e disponibilidade</h2>
      <p>
        Os preços das promoções são por pessoa, à vista no PIX, e valem para as datas e condições descritas em cada uma.{" "}
        {REGRAS.validade} Antes de emitir, confirmamos com você o valor e a disponibilidade.
      </p>

      <h2>Emissão e pagamento</h2>
      <p>
        Com a sua confirmação e os dados dos passageiros, a Algoritmo das Milhas emite a passagem em{" "}
        {SITE.prazoEmissao} e envia o código da reserva para você conferir no site da companhia aérea.
      </p>
      <p>{REGRAS.pagamento}</p>

      <h2>Cancelamento e remarcação</h2>
      <p>{REGRAS.cancelamento}</p>
      <p>{REGRAS.remarcacao}</p>

      <h2>Responsabilidade dos dados</h2>
      <p>
        Os nomes e documentos dos passageiros precisam ser informados exatamente como nos documentos de viagem. Erros
        nesses dados podem impedir o embarque e gerar custos de correção cobrados pela companhia aérea.
      </p>

      <h2>Regras da companhia aérea</h2>
      <p>
        Bagagem, marcação de assento, horários e eventuais alterações de voo seguem as regras da companhia aérea que
        opera o voo.
      </p>

      <h2>Contato</h2>
      <p>
        {SITE.nome}, {SITE.cidade}. WhatsApp {SITE.whatsappVisivel}, de {SITE.atendimento}.
      </p>
    </PaginaTexto>
  );
}
