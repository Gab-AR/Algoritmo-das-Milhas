"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Faz as partes de cada seção subirem ao entrar na tela. Sem script, tudo aparece normalmente. */
export default function Revelar() {
  const caminho = usePathname();

  useEffect(() => {
    const raiz = document.documentElement;
    const itens = Array.from(document.querySelectorAll<HTMLElement>("[data-revelar]:not(.visivel)"));
    // O que já está na tela ao carregar não pisca: só anima o que está abaixo da dobra.
    itens.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("visivel");
    });
    raiz.classList.add("revela");

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            observador.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px 15% 0px" },
    );
    itens.forEach((el) => !el.classList.contains("visivel") && observador.observe(el));
    return () => observador.disconnect();
  }, [caminho]);

  return null;
}
