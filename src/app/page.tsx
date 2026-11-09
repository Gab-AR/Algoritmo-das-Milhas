import Perguntas from "@/components/Perguntas";
import Canal from "@/components/home/Canal";
import ComoFunciona from "@/components/home/ComoFunciona";
import Contato from "@/components/home/Contato";
import Hero from "@/components/home/Hero";
import Painel from "@/components/home/Painel";
import Sobre from "@/components/home/Sobre";
import { PERGUNTAS_PRINCIPAIS } from "@/data/perguntas";
import { GERADO_EM, todasPromocoes } from "@/lib/conteudo";
import { SITE } from "@/lib/site";

export default function Inicio() {
  const promocoes = todasPromocoes();
  const dadosAgencia = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.nome,
    url: SITE.url,
    telephone: "+55 86 98838-5498",
    address: { "@type": "PostalAddress", addressLocality: "Teresina", addressRegion: "PI", addressCountry: "BR" },
    areaServed: ["BR", "Mundo"],
    sameAs: [`https://www.instagram.com/${SITE.instagram}/`],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosAgencia) }} />
      <Hero promocoes={promocoes} geradoEm={GERADO_EM} />
      <Painel promocoes={promocoes} geradoEm={GERADO_EM} />
      <ComoFunciona />
      <Contato />
      <Sobre />
      <Perguntas titulo="Perguntas frequentes" perguntas={PERGUNTAS_PRINCIPAIS} />
      <Canal />
    </>
  );
}
