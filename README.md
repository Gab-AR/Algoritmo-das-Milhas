# Algoritmo das Milhas

Site da Algoritmo das Milhas, agência de viagens de Teresina-PI: promoções de passagens aéreas e pedidos de orçamento de hotel, pacote e seguro viagem, com atendimento pelo WhatsApp.

A venda não acontece no site. Cada botão de compra ou de orçamento abre o WhatsApp da agência com a mensagem já escrita: a promoção escolhida, os passageiros, as datas e o que mais o cliente marcou. A regra principal aparece em todo lugar: **o cliente só paga depois de receber a passagem**.

## O que tem no site

- **Vitrine de promoções** em forma de painel de partidas, agrupada pela cidade de saída, com filtros por origem, destino nacional ou internacional e mês.
- **Página de cada promoção**, com link próprio para compartilhar. Quando vence ou esgota, o link continua abrindo, avisa que acabou e sugere outras.
- **Janela antes do WhatsApp**: passageiros, datas (quando a promoção é de período), hospedagem e seguro viagem (só em voos internacionais), total estimado e a mensagem montada ao vivo.
- **Solicitar orçamento** em quatro abas: passagem, hotel, pacote e seguro viagem.
- Como funciona, Quem somos, Perguntas frequentes, Termos e Privacidade.

## Tecnologia

- [Next.js](https://nextjs.org) 16 com App Router e TypeScript, exportado como site estático (`output: "export"`).
- CSS Modules, sem biblioteca de componentes. Fontes Montserrat e DM Sans.
- Nenhum dado de visitante é guardado: os formulários só montam a mensagem no navegador.

## Promoções

Cada promoção é um arquivo JSON em `content/promocoes/`. O nome do arquivo vira o endereço da página (`2026-11-08-the-lis.json` → `/promocoes/2026-11-08-the-lis/`).

```json
{
  "origem": "THE",
  "destino": "LIS",
  "companhia": "TAP Air Portugal",
  "tipo": "idavolta",
  "modoDatas": "exatas",
  "ida": "2027-03-10",
  "volta": "2027-03-24",
  "classe": "Econômica",
  "itemPessoal": true,
  "mao": true,
  "maoKg": 10,
  "despachadas": 1,
  "despKg": 23,
  "preco": 3890,
  "verificadaEm": "2026-11-08T09:30",
  "validaAte": "2026-11-11",
  "esgotada": false
}
```

Promoções de período usam `"modoDatas": "periodo"` com `periodoInicio` e `periodoFim`. Campos opcionais: `foto`, `fotoCredito` e `observacao`. Os horários seguem o fuso de Teresina (UTC-3). Uma promoção sai da vitrine sozinha depois de `validaAte`, ou na hora em que `esgotada` vira `true`.

## Rodando no computador

```bash
npm install
npm run dev
```

Para ver o site com promoções de teste sem colocá-las no repositório, crie a pasta `dev/promocoes/` (ignorada pelo git) e um arquivo `.env.development.local` com:

```
PROMOS_DIR=dev/promocoes
```

`npm run build` gera o site estático na pasta `out/`.

## Estrutura

```
src/app/            páginas (início, promoção, orçamento, institucionais)
src/components/     seções e componentes de cada página
src/data/           aeroportos, companhias, perguntas frequentes e etapas da compra
src/lib/            regras do site, formatação das promoções e mensagens do WhatsApp
content/promocoes/  uma promoção por arquivo JSON
public/fotos/site/  fotos do site e seus créditos (credits.json)
```

## Fotos

As fotos do site vêm do Wikimedia Commons, em domínio público ou licenças Creative Commons. Autores e licenças estão em `public/fotos/site/credits.json` e na página Créditos das fotos do site.

## Direitos

© Algoritmo das Milhas. Todos os direitos reservados. O código está aberto para leitura; nome, marca, textos e fotos da agência não podem ser reutilizados sem autorização.
