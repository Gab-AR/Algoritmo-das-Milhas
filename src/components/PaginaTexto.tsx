import type { ReactNode } from "react";
import s from "./PaginaTexto.module.css";

type Props = { titulo: string; abertura?: ReactNode; lado?: ReactNode; children: ReactNode };

/** Páginas de leitura: título largo, abertura e o texto numa coluna confortável. */
export default function PaginaTexto({ titulo, abertura, lado, children }: Props) {
  return (
    <article className={`${s.pagina} moldura`}>
      <header className={s.cabeca}>
        <h1>{titulo}</h1>
        {abertura && (
          <div className={s.abertura}>
            {abertura}
          </div>
        )}
      </header>
      <div className={s.corpo}>
        <div className={s.texto}>{children}</div>
        {lado && <aside className={s.lado}>{lado}</aside>}
      </div>
    </article>
  );
}
