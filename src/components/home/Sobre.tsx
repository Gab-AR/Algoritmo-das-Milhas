import Link from "next/link";
import Foto from "@/components/Foto";
import piaui from "@/data/piaui.json";
import { SITE } from "@/lib/site";
import s from "./Sobre.module.css";

const FATOS = [
  { rotulo: "Base", valor: SITE.cidade },
  { rotulo: "Aeroporto de casa", valor: "THE, Senador Petrônio Portella" },
  { rotulo: "Atendimento", valor: "Segunda a sábado, das 8h às 20h" },
  { rotulo: "Pagamento", valor: "PIX depois de receber a passagem" },
];

export default function Sobre() {
  return (
    <section className={`${s.sobre} moldura`} aria-labelledby="titulo-sobre">
      <h2 id="titulo-sobre">
        De Teresina para o mundo
      </h2>
      <p className={s.lead}>
        Uma agência de viagens de Teresina: procuramos passagens em promoção e cuidamos da emissão para você.
      </p>
      <div className={s.mosaico}>
        <figure className={s.fotoBloco}>
          <Foto
            nome="ponte-estaiada-aerea"
            alt="Vista aérea da Ponte Estaiada e do rio Poti, em Teresina"
            className={s.foto}
            tamanhos="(max-width: 760px) 100vw, 66vw"
          />
          <figcaption className={s.legenda}>
            Atendemos clientes de todo o Brasil e do exterior, sempre pelo WhatsApp, com a mesma regra: você só paga
            depois de receber a passagem. <Link href="/quem-somos/">Quem somos</Link>
          </figcaption>
        </figure>
        <div className={s.lado}>
          <div className={s.mapa}>
            <svg viewBox={`-10 -10 ${piaui.w + 20} ${piaui.h + 20}`} role="img" aria-labelledby="mapa-titulo">
              <title id="mapa-titulo">Mapa do Piauí com Teresina marcada</title>
              <path d={piaui.d} className={s.estado} />
              <circle cx={piaui.teresina[0]} cy={piaui.teresina[1]} r="11" className={s.ponto} />
            </svg>
            <span className={s.rotuloMapa}>Teresina</span>
          </div>
          <dl className={s.fatos}>
            {FATOS.map((f) => (
              <div key={f.rotulo}>
                <dt>{f.rotulo}</dt>
                <dd>{f.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
