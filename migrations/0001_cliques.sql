-- Contagem de cliques nos botões de compra e de orçamento, por dia. Sem dados de visitantes.
CREATE TABLE IF NOT EXISTS cliques (
  dia TEXT NOT NULL,
  tipo TEXT NOT NULL,
  codigo TEXT NOT NULL,
  total INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (dia, tipo, codigo)
);
