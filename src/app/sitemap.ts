import type { MetadataRoute } from "next";
import { todasPromocoes } from "@/lib/conteudo";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "orcamento/", "como-funciona/", "quem-somos/", "perguntas-frequentes/", "termos/", "privacidade/"];
  return [
    ...paginas.map((p) => ({ url: `${SITE.url}/${p}` })),
    ...todasPromocoes().map((p) => ({ url: `${SITE.url}/promocoes/${p.slug}/`, lastModified: p.verificadaEm.slice(0, 10) })),
  ];
}
