import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Foto from "@/components/Foto";
import ListaEtapas from "@/components/etapas/ListaEtapas";
import EstadoPromocao from "@/components/promocao/EstadoPromocao";
import QueroPromocao from "@/components/promocao/QueroPromocao";
import { promocao, todasPromocoes } from "@/lib/conteudo";
import { fotoDaPromocao } from "@/lib/fotos";
import {
  aeroporto,
  bagagemTexto,
  cidade,
  datasTexto,
  internacional,
  reais,
  tipoTexto,
  titulo,
  verificadaTexto,
} from "@/lib/promocao";
import { REGRAS } from "@/lib/site";
import s from "./promocao.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  const lista = todasPromocoes();
  // Sem nenhuma promoção, o build estático ainda precisa de uma rota; ela vira página 404.
  return lista.length ? lista.map((p) => ({ slug: p.slug })) : [{ slug: "sem-promocoes" }];
}

export async function generateMetadata({ params }: PageProps<"/promocoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = promocao(slug);
  if (!p) return { title: "Promoção não encontrada" };
  const descricao = `${tipoTexto(p)}, ${datasTexto(p)}, ${p.companhia}. ${reais(p.preco)} por pessoa, à vista no PIX. Você só paga depois de receber a passagem.`;
  return {
    title: `${titulo(p)} por ${reais(p.preco)}`,
    description: descricao,
    openGraph: {
      title: `${titulo(p)} por ${reais(p.preco)}`,
      description: descricao,
      images: fotoDaPromocao(p) ? [fotoDaPromocao(p)!.grande] : undefined,
    },
  };
}

export default async function PaginaPromocao({ params }: PageProps<"/promocoes/[slug]">) {
  const { slug } = await params;
  const p = promocao(slug);
  if (!p) notFound();
  const outras = todasPromocoes().filter((o) => o.slug !== p.slug);
  const foto = fotoDaPromocao(p);

  const detalhes = [
    { rotulo: "Datas", valor: p.modoDatas === "periodo" ? `Em ${datasTexto(p)}, você escolhe os dias` : datasTexto(p) },
    { rotulo: "Viagem", valor: `${tipoTexto(p)} · ${p.classe}` },
    { rotulo: "Companhia", valor: p.companhia },
    { rotulo: "Bagagem", valor: bagagemTexto(p) },
  ];

  return (
    <article className={s.pagina}>
      <div className={`${s.topo} moldura`}>
        <div className={s.texto}>
          <h1>{titulo(p)}</h1>
          <p className={s.subtitulo}>
            Passagem {tipoTexto(p).toLowerCase()}, {datasTexto(p)}, {p.companhia}
          </p>
          <p className={s.preco}>
            {p.modoDatas === "periodo" && <span className={s.pequeno}>a partir de </span>}
            {reais(p.preco)} <span className={s.pequeno}>por pessoa, à vista no PIX</span>
          </p>
          <EstadoPromocao promocao={p} outras={outras}>
            <QueroPromocao promocao={p} internacional={internacional(p)} />
          </EstadoPromocao>
          <p className={s.verificada}>
            {verificadaTexto(p.verificadaEm)}. {REGRAS.validade}
          </p>
        </div>
        <figure className={s.figura}>
          {foto ? (
            // eslint-disable-next-line @next/next/no-img-element -- site estático: foto já no tamanho certo
            <img src={foto.grande} alt={`Foto de ${cidade(p.destino)}`} width={1200} height={900} className={s.foto} />
          ) : (
            <div className={s.semFoto} aria-hidden="true">
              <Foto nome="janela-aviao" alt="" className={s.fundo} tamanhos="(max-width: 860px) 100vw, 40vw" />
              <span className={s.codOrigem}>{p.origem}</span>
              <span className={s.codDestino}>→ {p.destino}</span>
              <span>
                {cidade(p.origem)} para {cidade(p.destino)}, {aeroporto(p.destino).pais}
              </span>
            </div>
          )}
          {foto?.credito && <figcaption>{foto.credito}</figcaption>}
        </figure>
      </div>

      <section className={`${s.detalhes} moldura`} aria-labelledby="titulo-detalhes">
        <h2 id="titulo-detalhes">
          O que está incluído
        </h2>
        <dl>
          {detalhes.map((d) => (
            <div key={d.rotulo}>
              <dt>{d.rotulo}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
        {p.observacao && (
          <p className={s.obs}>
            {p.observacao}
          </p>
        )}
        <div className={s.regras}>
          <h3>Pagamento</h3>
          <p>{REGRAS.pagamento}</p>
          <h3>Cancelamento</h3>
          <p>
            {REGRAS.cancelamento} {REGRAS.remarcacao}
          </p>
        </div>
      </section>

      <section className={`${s.etapas} moldura`} aria-labelledby="titulo-etapas">
        <h2 id="titulo-etapas">
          Como funciona
        </h2>
        <ListaEtapas />
      </section>
    </article>
  );
}
