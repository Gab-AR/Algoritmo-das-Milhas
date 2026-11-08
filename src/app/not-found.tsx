import Link from "next/link";
import PaginaTexto from "@/components/PaginaTexto";

export default function NaoEncontrada() {
  return (
    <PaginaTexto titulo="Página não encontrada" abertura="Esse endereço não existe ou a promoção saiu do ar.">
      <p>
        Veja as{" "}
        <Link className="link" href="/#promocoes">
          promoções no ar
        </Link>{" "}
        ou{" "}
        <Link className="link" href="/orcamento/">
          peça um orçamento
        </Link>{" "}
        para o destino que você quer.
      </p>
    </PaginaTexto>
  );
}
