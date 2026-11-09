import { FOTOS_DESTINOS } from "@/data/fotos-destinos";
import { cidade, type Promocao } from "./promocao";

export type FotoPromocao = { grande: string; pequena: string; credito?: string };

/** Foto enviada no painel; senão a da biblioteca de destinos; senão nenhuma (o cartão mostra os códigos). */
export function fotoDaPromocao(p: Pick<Promocao, "foto" | "fotoCredito" | "destino">): FotoPromocao | null {
  if (p.foto) return { grande: p.foto, pequena: p.foto, credito: p.fotoCredito };
  const d = FOTOS_DESTINOS[cidade(p.destino)];
  if (!d) return null;
  return {
    grande: `/fotos/destinos/${d.arquivo}.jpg`,
    pequena: `/fotos/destinos/${d.arquivo}-640.jpg`,
    credito: `Foto: ${d.credito}, via Wikimedia Commons`,
  };
}
