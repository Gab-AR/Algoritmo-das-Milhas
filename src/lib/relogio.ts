import { useSyncExternalStore } from "react";

// Hora em que a página abriu no navegador. No build (servidor) não há relógio do visitante.
const abertura = typeof window === "undefined" ? 0 : Date.now();
const semMudancas = () => () => {};

/** Data de hoje (AAAA-MM-DD) no fuso de quem visita. */
export function dataLocal(instante: number): string {
  const d = new Date(instante);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Hoje no aparelho de quem visita, ou `undefined` enquanto a página ainda é a gerada no build. */
export function useHoje(): string | undefined {
  const agora = useAgora();
  return agora === null ? undefined : dataLocal(agora);
}

/** Relógio de quem visita, ou `null` enquanto a página ainda é a gerada no build. */
export function useAgora(): number | null {
  return useSyncExternalStore(
    semMudancas,
    () => abertura,
    () => null,
  );
}
