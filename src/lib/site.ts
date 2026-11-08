// Dados públicos da agência. Nada aqui é interno: custos e milheiros nunca entram no repositório.
export const SITE = {
  nome: "Algoritmo das Milhas",
  url: "https://algoritmodasmilhas.com",
  cidade: "Teresina-PI",
  whatsapp: "5586988385498",
  whatsappVisivel: "(86) 98838-5498",
  instagram: "algoritmodasmilhas",
  // Preencher quando existirem: e-mail no domínio próprio e link do Canal do WhatsApp.
  email: null as string | null,
  canal: null as string | null,
  atendimento: "segunda a sábado, das 8h às 20h",
  prazoEmissao: "até 2 horas após a confirmação, no horário de atendimento",
  prazoPix: "até 2 horas depois de receber a passagem",
};

export const INSTAGRAM_URL = `https://www.instagram.com/${SITE.instagram}/`;

export const REGRAS = {
  pagamento:
    "Você só paga depois de receber a passagem. O PIX é feito em até 2 horas após o recebimento; sem o pagamento nesse prazo, a passagem é cancelada. No cartão de crédito vale a mesma regra, com parcelamento sujeito aos juros da operadora.",
  cancelamento:
    "Passagens não reembolsáveis. Cancelamento em até 24 horas após a emissão, com taxa de R$ 100 por passageiro. Após esse prazo, não há cancelamento.",
  remarcacao: "Para remarcar, consulte no WhatsApp: pode haver taxas e diferença de tarifa.",
  validade:
    "Valores e disponibilidade válidos enquanto durar a tarifa promocional, sujeitos a alteração pela companhia aérea a qualquer momento até a emissão.",
};
