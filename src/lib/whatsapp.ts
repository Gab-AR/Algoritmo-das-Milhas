import { SITE } from "./site";

/** Link que abre a conversa com a agência já com a mensagem escrita. */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Junta as linhas da mensagem, pulando as vazias. */
export function montarMensagem(linhas: (string | false | null | undefined)[]): string {
  return linhas.filter((l): l is string => Boolean(l && l.trim())).join("\n");
}
