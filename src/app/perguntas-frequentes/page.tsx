import type { Metadata } from "next";
import Perguntas from "@/components/Perguntas";
import { PERGUNTAS } from "@/data/perguntas";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Quando pagar, como conferir a passagem, cancelamento, remarcação, hotel, pacote e seguro viagem.",
};

export default function PaginaPerguntas() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
      <Perguntas titulo="Perguntas frequentes" perguntas={PERGUNTAS} nivel="h1" />
    </>
  );
}
