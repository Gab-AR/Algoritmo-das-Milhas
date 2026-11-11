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

export default function QuemSomos() {
  return (
    <PaginaTexto
      titulo="Quem somos"
      abertura="Uma agência de viagens de Teresina que procura passagens em promoção e cuida da emissão para você."
      lado={<ChamadaWhatsApp />}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- site estático: foto já no tamanho certo */}
      <img
        src="/fotos/site/fundador.jpg"
        alt="Gabriel Rocha, fundador da Algoritmo das Milhas, em viagem"
        width={900}
        height={1200}
        className={s.retrato}
      />
      <h2>Quem atende você</h2>
      <p>
        Eu sou o Gabriel Rocha, fundador da Algoritmo das Milhas. Sou estudante de Computação na Universidade Federal
        do Piauí e apaixonado por aviação, e trabalho com emissão de passagens desde 2025.
      </p>
      <p>
        O nome da agência junta esses dois lados: a lógica de quem estuda computação, usada para garimpar as melhores
        tarifas, e o gosto por voar. Cada cliente é atendido por mim, pelo WhatsApp, do primeiro orçamento até o
        embarque.
      </p>
      <p>
        E a regra é sempre a mesma: você só paga depois de receber a passagem e conferir a reserva no site da companhia
        aérea. A Algoritmo das Milhas é registrada no CNPJ {SITE.cnpj}.
      </p>
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
