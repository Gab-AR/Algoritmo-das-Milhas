"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ordem } from "@/lib/estilo";
import { useAgora } from "@/lib/relogio";
import {
  cidade,
  datasCurtas,
  internacional,
  mesReferencia,
  mesTexto,
  noAr,
  reais,
  type Promocao,
} from "@/lib/promocao";
import { INSTAGRAM_URL, SITE } from "@/lib/site";
import s from "./Painel.module.css";

type Props = { promocoes: Promocao[]; geradoEm: number };

/** A vitrine como um painel de partidas: uma linha por promoção, agrupada pela cidade de saída. */
export default function Painel({ promocoes, geradoEm }: Props) {
  // O relógio do visitante decide o que já venceu; antes de carregar, vale a hora do build.
  const agora = useAgora() ?? geradoEm;

  const [origem, setOrigem] = useState("todas");
  const [alcance, setAlcance] = useState<"todos" | "nacional" | "internacional">("todos");
  const [mes, setMes] = useState("todos");

  const noArAgora = useMemo(() => promocoes.filter((p) => noAr(p, agora)), [promocoes, agora]);
  const origens = useMemo(() => [...new Set(noArAgora.map((p) => p.origem))], [noArAgora]);
  const meses = useMemo(() => [...new Set(noArAgora.map(mesReferencia).filter(Boolean))].sort(), [noArAgora]);

  const lista = noArAgora.filter(
    (p) =>
      (origem === "todas" || p.origem === origem) &&
      (alcance === "todos" || (alcance === "internacional") === internacional(p)) &&
      (mes === "todos" || mesReferencia(p) === mes),
  );
  const grupos = origens
    .map((o) => ({ origem: o, itens: lista.filter((p) => p.origem === o) }))
    .filter((g) => g.itens.length);

  return (
    <section id="promocoes" className={`${s.painel} moldura`} aria-labelledby="titulo-promocoes">
      <div className={s.cabeca}>
        <h2 id="titulo-promocoes" data-revelar>
          Promoções no ar
        </h2>
        <p data-revelar style={ordem(1)}>
          Preço por pessoa, à vista no PIX. As tarifas mudam rápido: confirmamos tudo com você no WhatsApp antes de
          emitir.
        </p>
      </div>

      {noArAgora.length > 0 && (
        <form className={s.filtros} aria-label="Filtrar promoções" onSubmit={(e) => e.preventDefault()}>
          <label>
            <span>Saindo de</span>
            <select value={origem} onChange={(e) => setOrigem(e.target.value)}>
              <option value="todas">Todas as cidades</option>
              {origens.map((o) => (
                <option key={o} value={o}>
                  {cidade(o)} ({o})
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Destino</span>
            <select value={alcance} onChange={(e) => setAlcance(e.target.value as typeof alcance)}>
              <option value="todos">Brasil e exterior</option>
              <option value="nacional">Só no Brasil</option>
              <option value="internacional">Só no exterior</option>
            </select>
          </label>
          <label>
            <span>Quando</span>
            <select value={mes} onChange={(e) => setMes(e.target.value)}>
              <option value="todos">Qualquer mês</option>
              {meses.map((m) => (
                <option key={m} value={m}>
                  {mesTexto(m)}
                </option>
              ))}
            </select>
          </label>
        </form>
      )}

      {grupos.length > 0 ? (
        grupos.map((g) => (
          <div key={g.origem} className={s.grupo}>
            <h3 className={s.saida}>
              Saindo de {cidade(g.origem)} ({g.origem})
            </h3>
            <ul className={s.linhas}>
              {g.itens.map((p) => (
                <li key={p.slug}>
                  <Link href={`/promocoes/${p.slug}/`} className={s.linha}>
                    <span className={s.destino}>
                      {cidade(p.destino)} <span className={s.codigo}>{p.destino}</span>
                    </span>
                    <span className={s.datas}>{datasCurtas(p)}</span>
                    <span className={s.cia}>{p.companhia}</span>
                    <span className={s.preco}>
                      {p.modoDatas === "periodo" && "desde "}
                      {reais(p.preco)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className={s.vazio}>
          <p className={s.vazioTitulo}>
            {noArAgora.length ? "Nenhuma promoção com esses filtros." : "Novas promoções em breve."}
          </p>
          <p>
            Diga para onde quer ir e a gente procura uma tarifa para você.{" "}
            <Link className="link" href="/orcamento/">
              Pedir orçamento
            </Link>{" "}
            ou{" "}
            <a className="link" href={SITE.canal ?? INSTAGRAM_URL} target="_blank" rel="noopener">
              {SITE.canal ? "entrar no canal de promoções" : "seguir no Instagram"}
            </a>
            .
          </p>
        </div>
      )}
    </section>
  );
}
