import Foto from "@/components/Foto";
import { ETAPAS } from "@/data/etapas";
import s from "./ComoFunciona.module.css";

/** Quatro telas, um verbo por etapa: o verbo fica no centro enquanto a foto passa por trás. */
export default function ComoFunciona() {
  return (
    <section className={s.secao} aria-labelledby="titulo-como">
      <h2 id="titulo-como" className={s.titulo}>
        Como funciona a compra
      </h2>
      <ol className={s.etapas}>
        {ETAPAS.map((e) => (
          <li key={e.verbo} className={s.etapa}>
            <Foto nome={e.foto} alt={e.alt} className={s.foto} />
            <div className={s.trilho}>
              <h3 className={s.verbo}>{e.verbo}</h3>
            </div>
            <p className={s.frase}>{e.frase}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
