import Foto from "@/components/Foto";
import { INSTAGRAM_URL, SITE } from "@/lib/site";
import s from "./Canal.module.css";

/** Última foto antes do rodapé: o litoral do Piauí e o convite para receber as promoções. */
export default function Canal() {
  const link = SITE.canal ?? INSTAGRAM_URL;
  return (
    <section className={s.canal} aria-labelledby="titulo-canal">
      <Foto
        nome="barra-grande"
        alt="Praia de Barra Grande, no litoral do Piauí, com árvores secas na areia"
        className={s.foto}
      />
      <div className={s.texto}>
        <h2 id="titulo-canal">
          Receba as promoções antes
        </h2>
        <p>
          As tarifas boas duram pouco. {SITE.canal ? "No canal do WhatsApp" : "No Instagram"} você fica sabendo assim
          que uma promoção entra no ar.
        </p>
        <a className="botao" data-tom="papel" href={link} target="_blank" rel="noopener">
          {SITE.canal ? "Entrar no canal" : "Seguir @" + SITE.instagram}
        </a>
      </div>
    </section>
  );
}
