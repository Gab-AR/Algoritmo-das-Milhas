"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAgora } from "@/lib/relogio";
import { noAr, reais, titulo, type Promocao } from "@/lib/promocao";
import s from "./EstadoPromocao.module.css";

type Props = { promocao: Promocao; outras: Promocao[]; children: ReactNode };

/** O link de uma promoção nunca morre: quando ela vence ou esgota, a página avisa e sugere outras. */
export default function EstadoPromocao({ promocao, outras, children }: Props) {
  const agora = useAgora();

  // Até o relógio do visitante responder, só o "Esgotou" marcado no painel decide.
  const ativa = agora === null ? !promocao.esgotada : noAr(promocao, agora);
  if (ativa) return <>{children}</>;

  const sugestoes = agora === null ? [] : outras.filter((o) => noAr(o, agora)).slice(0, 3);
  return (
    <div className={s.encerrada} role="status">
      <p className={s.aviso}>{promocao.esgotada ? "Esta promoção esgotou." : "Esta promoção acabou."}</p>
      {sugestoes.length > 0 && (
        <ul className={s.outras}>
          {sugestoes.map((o) => (
            <li key={o.slug}>
              <Link href={`/promocoes/${o.slug}/`}>
                {titulo(o)} <strong>{reais(o.preco)}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p>
        Quer essa rota mesmo assim?{" "}
        <Link className="link" href={`/orcamento/?origem=${promocao.origem}&destino=${promocao.destino}`}>
          Peça um orçamento
        </Link>{" "}
        e a gente procura a melhor tarifa disponível.
      </p>
    </div>
  );
}
