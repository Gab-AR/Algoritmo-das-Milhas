import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import PaginaTexto from "@/components/PaginaTexto";

export const metadata: Metadata = {
  title: "Créditos das fotos",
  description: "Autores e licenças das fotografias usadas no site.",
};

type Credito = { file: string; title: string; creator: string | null; license: string; licenseUrl: string | null; page: string };

function creditos(): Credito[] {
  const arquivo = path.join(process.cwd(), "public/fotos/site/credits.json");
  return fs.existsSync(arquivo) ? JSON.parse(fs.readFileSync(arquivo, "utf8")) : [];
}

export default function Creditos() {
  return (
    <PaginaTexto
      titulo="Créditos das fotos"
      abertura="As fotos do site vêm de acervos abertos. Obrigado a quem as publicou."
    >
      <ul>
        {creditos().map((c) => (
          <li key={c.file}>
            <a className="link" href={c.page} target="_blank" rel="noopener">
              {c.title}
            </a>
            {c.creator ? `, por ${c.creator}` : ""}, {c.license}
            {c.licenseUrl && (
              <>
                {" "}
                (
                <a className="link" href={c.licenseUrl} target="_blank" rel="noopener">
                  licença
                </a>
                )
              </>
            )}
            , via Wikimedia Commons.
          </li>
        ))}
      </ul>
      <p>As fotos das promoções trazem o crédito na própria página de cada uma.</p>
    </PaginaTexto>
  );
}
