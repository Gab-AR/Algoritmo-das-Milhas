import Image from "next/image";
import Link from "next/link";
import { linkWhatsApp } from "@/lib/whatsapp";
import s from "./Cabecalho.module.css";

const LINKS = [
  { href: "/#promocoes", texto: "Promoções" },
  { href: "/orcamento/", texto: "Orçamento" },
  { href: "/como-funciona/", texto: "Como funciona" },
  { href: "/quem-somos/", texto: "Quem somos" },
];

export default function Cabecalho() {
  const whatsapp = linkWhatsApp("Olá! Vim pelo site da Algoritmo das Milhas.");
  return (
    <header className={`${s.barra} moldura`}>
      <Link href="/" className={s.marca} aria-label="Algoritmo das Milhas, página inicial">
        <Image src="/marca/logo.png" alt="" width={560} height={398} priority className={s.logo} />
        <span>Algoritmo das Milhas</span>
      </Link>
      <nav aria-label="Principal" className={s.nav}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={s.item}>
            {l.texto}
          </Link>
        ))}
      </nav>
      <a className={`botao ${s.acao}`} href={whatsapp} target="_blank" rel="noopener">
        WhatsApp
      </a>
      <details className={s.menu}>
        <summary>Menu</summary>
        <nav aria-label="Principal no celular">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.texto}
            </Link>
          ))}
          <a href={whatsapp} target="_blank" rel="noopener">
            Falar no WhatsApp
          </a>
        </nav>
      </details>
    </header>
  );
}
