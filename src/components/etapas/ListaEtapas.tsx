import Foto from "@/components/Foto";
import { ETAPAS } from "@/data/etapas";
import s from "./ListaEtapas.module.css";

/** As etapas em lista, com foto pequena ao lado: usada nas páginas internas. */
export default function ListaEtapas() {
  return (
    <ol className={s.etapas}>
      {ETAPAS.map((e) => (
        <li key={e.verbo}>
          <Foto
            nome={e.foto}
            alt={e.alt}
            className={s.foto}
            tamanhos="(max-width: 860px) 40vw, 18vw"
            largura={800}
            altura={600}
          />
          <p>
            <strong>{e.verbo}.</strong> {e.frase}
          </p>
        </li>
      ))}
    </ol>
  );
}
