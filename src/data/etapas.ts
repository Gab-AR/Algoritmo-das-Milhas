import { SITE } from "@/lib/site";

/** As quatro etapas da compra, com a foto de cada uma (créditos em /creditos). */
export const ETAPAS = [
  {
    verbo: "Escolha",
    frase: "Escolha a promoção ou peça um orçamento. Os dados dos passageiros você manda pelo WhatsApp.",
    foto: "janela-aviao",
    alt: "Vista da janela do avião sobre as nuvens",
  },
  {
    verbo: "Emitimos",
    frase: `A Algoritmo das Milhas emite a passagem em ${SITE.prazoEmissao} e envia o código da reserva.`,
    foto: "aeroporto-teresina-fachada",
    alt: "Fachada do Aeroporto de Teresina",
  },
  {
    verbo: "Confira",
    frase: "Com o código da reserva, você confere a passagem no site da companhia aérea.",
    foto: "aeroporto-teresina-saguao",
    alt: "Saguão de embarque do Aeroporto de Teresina",
  },
  {
    verbo: "Pague",
    frase: `Só então você faz o PIX, em ${SITE.prazoPix}.`,
    foto: "avioes-por-do-sol",
    alt: "Aviões na fila para decolar ao pôr do sol",
  },
];
