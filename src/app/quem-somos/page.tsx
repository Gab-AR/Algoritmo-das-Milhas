import type { Metadata } from "next";
import ChamadaWhatsApp from "@/components/ChamadaWhatsApp";
import Foto from "@/components/Foto";
import PaginaTexto from "@/components/PaginaTexto";
import ListaEtapas from "@/components/etapas/ListaEtapas";
import { INSTAGRAM_URL, SITE } from "@/lib/site";
import s from "./quem-somos.module.css";

export const metadata: Metadata = {
  title: "Quem somos",
  description: "A Algoritmo das Milhas é uma agência de viagens de Teresina-PI que atende o Brasil e o exterior pelo WhatsApp.",
};

// A foto e a história de quem atende entram aqui quando o dono enviar (pendência registrada no Notion).
export default function QuemSomos() {
  return (
    <PaginaTexto
      titulo="Quem somos"
      abertura="Uma agência de viagens de Teresina que procura passagens em promoção e cuida da emissão para você."
      lado={<ChamadaWhatsApp />}
    >
      <Foto
        nome="ponte-estaiada-aerea"
        alt="Vista aérea da Ponte Estaiada e do rio Poti, em Teresina"
        className={s.foto}
        tamanhos="(max-width: 860px) 100vw, 60vw"
      />
      <p>
        A Algoritmo das Milhas fica em {SITE.cidade} e atende clientes de todo o Brasil e do exterior. O atendimento é
        todo pelo WhatsApp, de {SITE.atendimento}.
      </p>
      <h2>Como trabalhamos</h2>
      <ListaEtapas />
      <h2>Onde nos encontrar</h2>
      <p>
        WhatsApp {SITE.whatsappVisivel} e Instagram{" "}
        <a className="link" href={INSTAGRAM_URL} target="_blank" rel="noopener">
          @{SITE.instagram}
        </a>
        , onde as promoções também aparecem.
      </p>
    </PaginaTexto>
  );
}
