// Worker da Cloudflare: entrega o site estático (pasta out/) e conta os cliques nos botões de compra.
// Só os endereços /api/* passam por aqui; o resto a Cloudflare serve direto dos arquivos.

const TIPOS = new Set(["promocao", "orcamento"]);

const worker = {
  /**
   * @param {Request} request
   * @param {{ ASSETS: { fetch: typeof fetch }, DB?: any }} env
   */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/clique") return clique(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;

/** Soma um clique por dia, tipo e código. Não guarda nada sobre quem clicou. */
async function clique(request, env) {
  if (request.method !== "POST") return new Response(null, { status: 405 });
  if (!env.DB) return new Response(null, { status: 204 });
  let dados;
  try {
    dados = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  const tipo = String(dados?.tipo ?? "");
  const codigo = String(dados?.codigo ?? "").toUpperCase().slice(0, 24);
  if (!TIPOS.has(tipo) || !/^[A-Z0-9-]*$/.test(codigo)) return new Response(null, { status: 400 });
  // Dia no horário de Teresina (UTC-3)
  const dia = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
  await env.DB.prepare(
    "INSERT INTO cliques (dia, tipo, codigo, total) VALUES (?1, ?2, ?3, 1) " +
      "ON CONFLICT (dia, tipo, codigo) DO UPDATE SET total = total + 1",
  )
    .bind(dia, tipo, codigo)
    .run();
  return new Response(null, { status: 204 });
}
