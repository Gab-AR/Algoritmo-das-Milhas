import { useSyncExternalStore } from "react";

// Hora em que a página abriu no navegador. No build (servidor) não há relógio do visitante.
const abertura = typeof window === "undefined" ? 0 : Date.now();
const semMudancas = () => () => {};

/** Relógio de quem visita, ou `null` enquanto a página ainda é a gerada no build. */
export function useAgora(): number | null {
  return useSyncExternalStore(
    semMudancas,
    () => abertura,
    () => null,
  );
}
