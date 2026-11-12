// Dados públicos da agência. Nada aqui é interno: custos e milheiros nunca entram no repositório.
export const SITE = {
  nome: "Algoritmo das Milhas",
  url: "https://algoritmodasmilhas.com.br",
  cidade: "Teresina-PI",
  cnpj: "70.044.651/0001-69",
  whatsapp: "5586995126252",
  whatsappVisivel: "(86) 99512-6252",
  instagram: "algoritmodasmilhas",
  // Preencher quando existir: link do Canal do WhatsApp.
  email: "algoritmodasmilhas@gmail.com" as string | null,
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
