// Tipos e formatação das promoções. Sem acesso a arquivos: é usado também no navegador.
import { AEROPORTOS, type Aeroporto } from "@/data/aeroportos";

export type Promocao = {
  slug: string;
  origem: string;
  destino: string;
  companhia: string;
  tipo: "ida" | "idavolta";
  modoDatas: "exatas" | "periodo";
  ida?: string;
  volta?: string;
  periodoInicio?: string;
  periodoFim?: string;
  classe: string;
  itemPessoal: boolean;
  mao: boolean;
  maoKg?: number;
  despachadas: number;
  despKg?: number;
  preco: number;
  foto?: string;
  fotoCredito?: string;
  observacao?: string;
  verificadaEm: string;
  validaAte: string;
  esgotada: boolean;
};

const MAPA = new Map(AEROPORTOS.map((a) => [a.codigo, a]));
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGOS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function aeroporto(codigo: string): Aeroporto {
  return MAPA.get(codigo) ?? { codigo, cidade: codigo, pais: "" };
}

export const cidade = (codigo: string) => aeroporto(codigo).cidade;

/** Internacional quando origem e destino não estão os dois no Brasil. */
export function internacional(p: Pick<Promocao, "origem" | "destino">): boolean {
  return aeroporto(p.origem).pais !== "Brasil" || aeroporto(p.destino).pais !== "Brasil";
}

/** Código curto que vai na mensagem do WhatsApp, ex.: THE-LIS-1108. */
export function codigo(p: Pick<Promocao, "slug" | "origem" | "destino">): string {
  const data = p.slug.match(/^\d{4}-(\d{2})-(\d{2})/);
  return `${p.origem}-${p.destino}${data ? `-${data[2]}${data[1]}` : ""}`.toUpperCase();
}

export const reais = (valor: number) =>
  "R$ " + new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(Math.round(valor));

function partes(iso?: string) {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? { a: +m[1], m: +m[2], d: +m[3] } : null;
}

export function dataCurta(iso?: string): string {
  const p = partes(iso);
  return p ? `${p.d} ${MESES[p.m - 1]}` : "";
}

export function dataBR(iso?: string): string {
  const p = partes(iso);
  return p ? `${String(p.d).padStart(2, "0")}/${String(p.m).padStart(2, "0")}/${p.a}` : "";
}

/** "10 dez a 20 dez", "10 dez, só ida" ou "março a junho de 2027". */
export function datasTexto(p: Promocao): string {
  if (p.modoDatas === "periodo") {
    const a = partes(p.periodoInicio);
    const b = partes(p.periodoFim);
    if (!a || !b) return "Datas a combinar";
    if (a.a === b.a && a.m === b.m) return `${MESES_LONGOS[a.m - 1]} de ${a.a}`;
    return a.a === b.a
      ? `${MESES_LONGOS[a.m - 1]} a ${MESES_LONGOS[b.m - 1]} de ${b.a}`
      : `${MESES_LONGOS[a.m - 1]} de ${a.a} a ${MESES_LONGOS[b.m - 1]} de ${b.a}`;
  }
  if (p.tipo === "ida" || !p.volta) return `${dataCurta(p.ida)}, só ida`;
  return `${dataCurta(p.ida)} a ${dataCurta(p.volta)}`;
}

/** Versão curta para o painel: "abr a jun 2027". */
export function datasCurtas(p: Promocao): string {
  if (p.modoDatas !== "periodo") return datasTexto(p);
  const a = partes(p.periodoInicio);
  const b = partes(p.periodoFim);
  if (!a || !b) return "Datas a combinar";
  if (a.a === b.a && a.m === b.m) return `${MESES[a.m - 1]} ${a.a}`;
  return `${MESES[a.m - 1]}${a.a !== b.a ? ` ${a.a}` : ""} a ${MESES[b.m - 1]} ${b.a}`;
}

export const tipoTexto = (p: Pick<Promocao, "tipo">) => (p.tipo === "ida" ? "Só ida" : "Ida e volta");

export function bagagemTexto(p: Promocao): string {
  const itens: string[] = [];
  if (p.itemPessoal) itens.push("item pessoal");
  if (p.mao) itens.push(`bagagem de mão${p.maoKg ? ` de ${p.maoKg} kg` : ""}`);
  if (p.despachadas > 0)
    itens.push(`${p.despachadas} ${p.despachadas === 1 ? "mala despachada" : "malas despachadas"}${p.despKg ? ` de ${p.despKg} kg` : ""}`);
  if (!itens.length) return "Sem bagagem incluída";
  const texto = itens.length === 1 ? itens[0] : itens.slice(0, -1).join(", ") + " e " + itens[itens.length - 1];
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Datas do site são do horário de Teresina (UTC-3, sem horário de verão). */
export function instante(iso: string, fimDoDia = false): number {
  const temHora = /T\d{2}:\d{2}/.test(iso);
  const base = temHora ? iso.slice(0, 16) : `${iso.slice(0, 10)}T${fimDoDia ? "23:59" : "00:00"}`;
  return Date.parse(`${base}:00-03:00`);
}

export function verificadaTexto(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if (!m) return "";
  return `Verificada em ${m[3]}/${m[2]}${m[4] ? ` às ${m[4]}h${m[5] !== "00" ? m[5] : ""}` : ""}`;
}

/** No ar: não esgotada e dentro do prazo. `agora` vem do relógio de quem visita. */
export function noAr(p: Pick<Promocao, "esgotada" | "validaAte">, agora: number): boolean {
  return !p.esgotada && instante(p.validaAte, true) >= agora;
}

export function titulo(p: Pick<Promocao, "origem" | "destino">): string {
  return `${cidade(p.origem)} → ${cidade(p.destino)}`;
}

/** Mês de referência para o filtro: o da ida ou o início do período. */
export function mesReferencia(p: Promocao): string {
  return (p.modoDatas === "periodo" ? p.periodoInicio : p.ida)?.slice(0, 7) ?? "";
}

export function mesTexto(ym: string): string {
  const [a, m] = ym.split("-").map(Number);
  return a && m ? `${MESES_LONGOS[m - 1]} de ${a}` : ym;
}
