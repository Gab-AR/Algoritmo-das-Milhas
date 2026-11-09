/* eslint-disable @next/next/no-img-element -- site estático: as fotos já vêm no tamanho do cartão */
import Link from "next/link";
import { fotoDaPromocao } from "@/lib/fotos";
import { aeroporto, cidade, dataBR, datasTexto, reais, type Promocao } from "@/lib/promocao";
import s from "./CartaoPromocao.module.css";

/** Uma promoção como passagem: foto do destino, os dados do voo e o canhoto com a forma de pagamento. */
export default function CartaoPromocao({ promocao: p }: { promocao: Promocao }) {
  const foto = fotoDaPromocao(p);
  const pais = aeroporto(p.destino).pais;
  return (
    <Link href={`/promocoes/${p.slug}/`} className={s.cartao}>
      <div className={s.foto}>
        {foto ? (
          <img src={foto.pequena} alt={`Foto de ${cidade(p.destino)}`} width={640} height={480} loading="lazy" decoding="async" />
        ) : (
          <span className={s.semFoto} aria-hidden="true">
            {p.origem} → {p.destino}
          </span>
        )}
      </div>
      <div className={s.corpo}>
        <h4 className={s.destino}>
          {cidade(p.destino)}
          {pais !== "Brasil" && <span className={s.pais}>, {pais}</span>}
        </h4>
        <p className={s.saida}>Saindo de {cidade(p.origem)}</p>
        {p.modoDatas === "periodo" ? (
          <p className={s.datas}>Datas em {datasTexto(p)}</p>
        ) : (
          <p className={s.datas}>
            Ida {dataBR(p.ida)}
            {p.tipo === "idavolta" && p.volta ? <> · Volta {dataBR(p.volta)}</> : " · só ida"}
          </p>
        )}
        <p className={s.cia}>{p.companhia}</p>
        <p className={s.preco}>
          <span className={s.prefixo}>{p.modoDatas === "periodo" ? "a partir de" : "por pessoa"}</span>
          {reais(p.preco)}
        </p>
      </div>
      <p className={s.canhoto}>
        <span>À vista no PIX</span>
        <span className={s.ver}>Ver promoção</span>
      </p>
    </Link>
  );
}
