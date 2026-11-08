import type { Metadata } from "next";
import { Suspense } from "react";
import Orcamento from "@/components/orcamento/Orcamento";
import { SITE } from "@/lib/site";
import s from "./orcamento.module.css";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description:
    "Peça um orçamento de passagem, hotel, pacote ou seguro viagem. Você preenche, a mensagem vai pronta para o WhatsApp da Algoritmo das Milhas.",
};

export default function PaginaOrcamento() {
  return (
    <div className={`${s.pagina} moldura`}>
      <header className={s.cabeca}>
        <h1>Solicitar orçamento</h1>
        <p className={s.lead}>Passagem, hotel, pacote ou seguro viagem, com a mensagem pronta para o WhatsApp.</p>
        <p>
          Não achou seu destino nas promoções? Preencha o que precisa e você só envia. Respondemos de{" "}
          {SITE.atendimento}.
        </p>
      </header>
      <Suspense>
        <Orcamento />
      </Suspense>
    </div>
  );
}
