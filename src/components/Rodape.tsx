import Link from "next/link";
import { ordem } from "@/lib/estilo";
import { INSTAGRAM_URL, SITE } from "@/lib/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import s from "./Rodape.module.css";

export default function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className={`${s.rodape} moldura`}>
      <div className={s.topo}>
        <div className={s.convite} data-revelar>
          <h2>Para onde vamos agora?</h2>
          <a
            className="botao"
            href={linkWhatsApp("Olá! Vim pelo site e quero ajuda para encontrar uma passagem.")}
            target="_blank"
            rel="noopener"
          >
            Chamar no WhatsApp
          </a>
        </div>
        <ul className={s.links} data-revelar style={ordem(1)}>
          <li>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
              Instagram @{SITE.instagram}
            </a>
          </li>
          <li>
            <a href={linkWhatsApp("Olá! Vim pelo site da Algoritmo das Milhas.")} target="_blank" rel="noopener">
              WhatsApp {SITE.whatsappVisivel}
            </a>
          </li>
          {SITE.email && (
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          )}
          <li>
            <Link href="/orcamento/">Solicitar orçamento</Link>
          </li>
          <li>
            <Link href="/perguntas-frequentes/">Perguntas frequentes</Link>
          </li>
        </ul>
      </div>
      <div className={s.legal}>
        <span>
          © {ano} {SITE.nome} · {SITE.cidade} · Atendimento de {SITE.atendimento}
        </span>
        <span className={s.legalLinks}>
          <Link href="/termos/">Termos</Link>
          <Link href="/privacidade/">Privacidade</Link>
          <Link href="/creditos/">Créditos das fotos</Link>
        </span>
      </div>
      <p className={s.nome} aria-hidden="true">
        Algoritmo das Milhas
      </p>
    </footer>
  );
}
