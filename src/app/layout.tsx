import type { Metadata, Viewport } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import Cabecalho from "@/components/Cabecalho";
import Rodape from "@/components/Rodape";
import { SITE } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["600", "700", "800"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Algoritmo das Milhas · Passagens em promoção, você só paga depois de receber",
    template: "%s · Algoritmo das Milhas",
  },
  description:
    "Agência de viagens de Teresina-PI. Passagens aéreas em promoção com atendimento pelo WhatsApp: você só paga depois de receber a passagem.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
    images: ["/fotos/site/ponte-estaiada-noite.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2a56",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body>
        <a className="oculto" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
