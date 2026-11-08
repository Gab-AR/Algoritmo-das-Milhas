import type { CSSProperties } from "react";

/** Atraso da entrada de cada parte da seção (80 ms por passo). */
export const ordem = (n: number) => ({ "--ordem": n }) as CSSProperties;
