import type { Pergunta } from "@/data/perguntas";
import s from "./Perguntas.module.css";

type Props = { titulo: string; perguntas: Pergunta[]; nivel?: "h1" | "h2" };

/** Título largo à esquerda, perguntas recuadas para a direita. Abre e fecha sem script. */
export default function Perguntas({ titulo, perguntas, nivel = "h2" }: Props) {
  const Titulo = nivel;
  return (
    <section className={`${s.secao} moldura`} aria-labelledby="titulo-perguntas">
      <Titulo id="titulo-perguntas" className={s.titulo}>
        {titulo}
      </Titulo>
      <div className={s.lista}>
        {perguntas.map((p) => (
          <details key={p.pergunta} className={s.item}>
            <summary>
              <span>{p.pergunta}</span>
              <span className={s.seta} aria-hidden="true" />
            </summary>
            <p>{p.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
