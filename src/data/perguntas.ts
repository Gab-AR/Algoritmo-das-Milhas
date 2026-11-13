import { REGRAS, SITE } from "@/lib/site";

export type Pergunta = { pergunta: string; resposta: string };

/** As seis que aparecem na página inicial. */
export const PERGUNTAS_PRINCIPAIS: Pergunta[] = [
  {
    pergunta: "Quando eu pago?",
    resposta: `Só depois de receber a passagem. O PIX é feito em ${SITE.prazoPix}; sem o pagamento nesse prazo, a passagem é cancelada. No cartão de crédito vale a mesma regra, com parcelamento sujeito aos juros da operadora.`,
  },
  {
    pergunta: "Como sei que a passagem é de verdade?",
    resposta:
      "Você recebe o código da reserva e confere tudo direto no site da companhia aérea, com os dados que ela pedir, antes de fazer qualquer pagamento.",
  },
  {
    pergunta: "Em quanto tempo recebo a passagem?",
    resposta: `A emissão é feita em ${SITE.prazoEmissao}: ${SITE.atendimento}.`,
  },
  {
    pergunta: "O preço do site está garantido?",
    resposta: `${REGRAS.validade} Cada promoção mostra quando foi verificada pela última vez, e confirmamos o valor com você antes de emitir.`,
  },
  {
    pergunta: "Posso cancelar ou remarcar?",
    resposta: `${REGRAS.cancelamento} ${REGRAS.remarcacao}`,
  },
  {
    pergunta: "Vocês vendem passagens saindo de outras cidades?",
    resposta:
      "Sim. Atendemos clientes de todo o Brasil e do exterior. Se a sua cidade não aparece nas promoções, peça um orçamento com a origem e as datas que você quer.",
  },
];

/** Página de perguntas frequentes: as principais e mais algumas. */
export const PERGUNTAS: Pergunta[] = [
  ...PERGUNTAS_PRINCIPAIS,
  {
    pergunta: "O preço é por pessoa?",
    resposta:
      "Sim. O valor das promoções é por pessoa, à vista no PIX. Ao escolher uma promoção, o site mostra o total estimado para os passageiros que você informar.",
  },
  {
    pergunta: "Vocês também vendem passagem de ônibus, hotel, pacote e seguro viagem?",
    resposta:
      "Sim, sob orçamento. Na página Solicitar orçamento você escolhe Ônibus, Hotel, Pacote ou Seguro viagem, preenche o que precisa e a mensagem vai pronta para o nosso WhatsApp.",
  },
  {
    pergunta: "Como envio os dados dos passageiros?",
    resposta:
      "Pelo WhatsApp, depois de confirmar a promoção. O site não guarda nenhum dado: os formulários só montam a mensagem que você envia.",
  },
  {
    pergunta: "Qual é o horário de atendimento?",
    resposta: `${SITE.atendimento.charAt(0).toUpperCase() + SITE.atendimento.slice(1)}, pelo WhatsApp ${SITE.whatsappVisivel}.`,
  },
];
