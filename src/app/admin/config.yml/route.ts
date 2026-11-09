// Configuração do painel /admin (Sveltia CMS), gerada no build a partir dos dados do site.
// JSON também é YAML válido, então o arquivo sai como config.yml sem precisar de biblioteca.
import { AEROPORTOS, COMPANHIAS } from "@/data/aeroportos";

export const dynamic = "force-static";

const CLASSES = ["Econômica", "Premium Economy", "Executiva", "Primeira classe"];
const data = (name: string, label: string, hint?: string, required = false) => ({
  name,
  label,
  widget: "datetime",
  format: "YYYY-MM-DD",
  time_format: false,
  required,
  ...(hint ? { hint } : {}),
});
const aeroportos = AEROPORTOS.map((a) => ({
  label: `${a.cidade}${a.detalhe ? ` (${a.detalhe})` : ""} · ${a.codigo}`,
  value: a.codigo,
}));

const config = {
  backend: { name: "github", repo: "Gab-AR/Algoritmo-das-Milhas", branch: "main" },
  site_url: "https://algoritmodasmilhas.com",
  display_url: "https://algoritmodasmilhas.com",
  logo: { src: "/marca/logo.png" },
  media_folder: "public/fotos/promocoes",
  public_folder: "/fotos/promocoes",
  media_libraries: {
    default: { config: { transformations: { raster_image: { format: "webp", quality: 82, width: 1600, height: 1600 } } } },
  },
  collections: [
    {
      name: "promocoes",
      label: "Promoções",
      label_singular: "Promoção",
      description: "Cada promoção vira um cartão na vitrine e uma página própria. Ao salvar, o site é atualizado em 1 a 3 minutos.",
      folder: "content/promocoes",
      extension: "json",
      format: "json",
      create: true,
      delete: true,
      slug: "{{year}}-{{month}}-{{day}}-{{fields.origem}}-{{fields.destino}}",
      summary: "{{fields.origem}} → {{fields.destino}} · R$ {{fields.preco}} · válida até {{fields.validaAte}}",
      sortable_fields: { fields: ["verificadaEm", "validaAte", "preco"], default: { field: "verificadaEm", direction: "descending" } },
      preview_path: "promocoes/{{slug}}/",
      fields: [
        { name: "origem", label: "Saindo de", widget: "select", options: aeroportos, default: "THE" },
        { name: "destino", label: "Destino", widget: "select", options: aeroportos },
        { name: "companhia", label: "Companhia aérea", widget: "select", options: COMPANHIAS },
        {
          name: "tipo",
          label: "Viagem",
          widget: "select",
          options: [
            { label: "Ida e volta", value: "idavolta" },
            { label: "Só ida", value: "ida" },
          ],
          default: "idavolta",
        },
        {
          name: "modoDatas",
          label: "Datas",
          widget: "select",
          options: [
            { label: "Datas exatas", value: "exatas" },
            { label: "Período (o cliente escolhe os dias)", value: "periodo" },
          ],
          default: "exatas",
          hint: "Datas exatas: preencha Ida e Volta. Período: preencha Início e Fim do período.",
        },
        data("ida", "Ida"),
        data("volta", "Volta", "Deixe vazio se for só ida."),
        data("periodoInicio", "Início do período"),
        data("periodoFim", "Fim do período"),
        { name: "classe", label: "Classe", widget: "select", options: CLASSES, default: "Econômica" },
        { name: "itemPessoal", label: "Item pessoal (bolsa ou mochila)", widget: "boolean", default: true },
        { name: "mao", label: "Bagagem de mão", widget: "boolean", default: true },
        { name: "maoKg", label: "Peso da bagagem de mão (kg)", widget: "number", value_type: "int", required: false, default: 10 },
        { name: "despachadas", label: "Malas despachadas", widget: "number", value_type: "int", default: 0, min: 0, max: 3 },
        { name: "despKg", label: "Peso de cada mala despachada (kg)", widget: "number", value_type: "int", required: false },
        {
          name: "preco",
          label: "Preço por pessoa (R$)",
          widget: "number",
          value_type: "int",
          min: 1,
          hint: "Valor à vista no PIX, em reais inteiros. Em promoção de período, é o menor preço (aparece como \"a partir de\").",
        },
        {
          name: "foto",
          label: "Foto do destino",
          widget: "image",
          required: false,
          hint: "Opcional. Sem foto, o site usa a foto padrão do destino, quando existir.",
        },
        { name: "fotoCredito", label: "Crédito da foto", widget: "string", required: false, hint: "Ex.: Foto: Nome do autor" },
        { name: "observacao", label: "Observação", widget: "string", required: false, hint: "Ex.: Voo direto. Aparece na página da promoção." },
        {
          name: "verificadaEm",
          label: "Verificada em",
          widget: "datetime",
          format: "YYYY-MM-DDTHH:mm",
          default: "{{now}}",
          auto_now: true,
          hint: "Atualiza sozinho a cada vez que você salva.",
        },
        data("validaAte", "Fica no ar até", "Depois desse dia a promoção sai da vitrine sozinha. O normal é 3 dias.", true),
        {
          name: "esgotada",
          label: "Esgotou",
          widget: "boolean",
          default: false,
          hint: "Marque quando a tarifa acabar: a promoção sai da vitrine e a página avisa que esgotou.",
        },
      ],
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(config, null, 2), { headers: { "Content-Type": "text/yaml; charset=utf-8" } });
}
