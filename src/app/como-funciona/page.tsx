import type { Metadata } from "next";
import ChamadaWhatsApp from "@/components/ChamadaWhatsApp";
import PaginaTexto from "@/components/PaginaTexto";
import ListaEtapas from "@/components/etapas/ListaEtapas";
import { REGRAS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Como funciona",
  description:
    "Você escolhe o destino e as datas, a Algoritmo das Milhas emite a passagem e você só faz o PIX depois de receber e conferir a reserva.",
};

export default function ComoFunciona() {
  return (
    <PaginaTexto
      titulo="Como funciona a compra"
      abertura="Você escolhe o destino e as datas, a Algoritmo das Milhas emite a passagem e você só paga depois de receber."
      lado={<ChamadaWhatsApp />}
    >
      <ListaEtapas />

      <h2>Pagamento</h2>
      <p>{REGRAS.pagamento}</p>

      <h2>Preços das promoções</h2>
      <p>
        Os valores são por pessoa, à vista no PIX. {REGRAS.validade} Cada promoção mostra quando foi verificada pela
        última vez, e confirmamos o valor com você antes de emitir.
      </p>

      <h2>Cancelamento e remarcação</h2>
      <p>{REGRAS.cancelamento}</p>
      <p>{REGRAS.remarcacao}</p>

      <h2>Atendimento</h2>
      <p>
        De {SITE.atendimento}, pelo WhatsApp {SITE.whatsappVisivel}. Atendemos clientes de todo o Brasil e do exterior.
      </p>
    </PaginaTexto>
  );
}
