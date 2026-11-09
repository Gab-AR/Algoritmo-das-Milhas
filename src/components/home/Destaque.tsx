"use client";

/* eslint-disable @next/next/no-img-element -- site estático: foto já no tamanho do cartão */
import Link from "next/link";
import { fotoDaPromocao } from "@/lib/fotos";
import { useAgora } from "@/lib/relogio";
import { cidade, datasTexto, noAr, reais, type Promocao } from "@/lib/promocao";
import s from "./Destaque.module.css";

/** A promoção mais recente no ar, no canto da primeira tela. Some quando não há nenhuma. */
export default function Destaque({ promocoes, geradoEm }: { promocoes: Promocao[]; geradoEm: number }) {
  const agora = useAgora() ?? geradoEm;
  const p = promocoes.find((x) => noAr(x, agora));
  if (!p) return null;
  const foto = fotoDaPromocao(p);
  return (
    <Link href={`/promocoes/${p.slug}/`} className={s.destaque}>
      {foto && <img src={foto.pequena} alt="" width={640} height={480} className={s.foto} />}
      <span className={s.texto}>
        <strong>
          {cidade(p.origem)} → {cidade(p.destino)}
        </strong>
        <span className={s.preco}>
          {p.modoDatas === "periodo" ? "a partir de " : ""}
          {reais(p.preco)}
        </span>
        <span>
          <span className={s.rotulo}>Promoção do momento</span> · {datasTexto(p)}
        </span>
      </span>
    </Link>
  );
}
