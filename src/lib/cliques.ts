/**
 * Conta o clique no botão de compra. O endereço /api/clique só existe depois da publicação
 * na Cloudflare; até lá o envio falha em silêncio e nada muda para o visitante.
 */
export function registrarClique(tipo: string, codigo = "") {
  try {
    const dados = JSON.stringify({ tipo, codigo });
    navigator.sendBeacon?.("/api/clique", new Blob([dados], { type: "application/json" }));
  } catch {
    // sem contagem, sem problema
  }
}
