// Lê as promoções na hora do build. Cada promoção é um arquivo JSON salvo pelo painel /admin.
import fs from "node:fs";
import path from "node:path";
import type { Promocao } from "./promocao";

// Em desenvolvimento dá para apontar para promoções de teste que não vão para o repositório.
const PASTA = path.join(process.cwd(), process.env.PROMOS_DIR ?? "content/promocoes");

function ler(arquivo: string): Promocao | null {
  try {
    const dados = JSON.parse(fs.readFileSync(path.join(PASTA, arquivo), "utf8"));
    return {
      itemPessoal: false,
      mao: false,
      despachadas: 0,
      esgotada: false,
      classe: "Econômica",
      ...dados,
      slug: arquivo.replace(/\.json$/, ""),
    } as Promocao;
  } catch (erro) {
    console.warn(`Promoção ignorada (${arquivo}):`, erro);
    return null;
  }
}

/** Todas as promoções, das mais novas para as mais antigas. */
export function todasPromocoes(): Promocao[] {
  if (!fs.existsSync(PASTA)) return [];
  return fs
    .readdirSync(PASTA)
    .filter((f) => f.endsWith(".json"))
    .map(ler)
    .filter((p): p is Promocao => p !== null)
    .sort((a, b) => b.verificadaEm.localeCompare(a.verificadaEm));
}

export function promocao(slug: string): Promocao | undefined {
  return todasPromocoes().find((p) => p.slug === slug);
}

/** Hora do build: decide o que aparece antes de o navegador do visitante ler o próprio relógio. */
export const GERADO_EM = Date.now();
