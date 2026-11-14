"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import CampoCidade from "@/components/form/CampoCidade";
import CampoData from "@/components/form/CampoData";
import { Campo, Contador, Escolha, Previa, Texto } from "@/components/form/Campos";
import { AEROPORTOS } from "@/data/aeroportos";
import { registrarClique } from "@/lib/cliques";
import { dataBR } from "@/lib/promocao";
import { useHoje } from "@/lib/relogio";
import { linkWhatsApp, montarMensagem } from "@/lib/whatsapp";
import s from "./Orcamento.module.css";

type Tipo = "passagem" | "onibus" | "hotel" | "pacote" | "seguro";

const ABAS: { tipo: Tipo; texto: string }[] = [
  { tipo: "passagem", texto: "Aéreo" },
  { tipo: "onibus", texto: "Ônibus" },
  { tipo: "hotel", texto: "Hotel" },
  { tipo: "pacote", texto: "Pacote" },
  { tipo: "seguro", texto: "Seguro viagem" },
];

const INCLUIR = ["Passagem aérea", "Hotel", "Passeios", "Transfer"];

const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;
/** "THE" vira "Teresina (THE)"; texto livre fica como veio. */
function nomeCidade(c: string | null): string {
  if (!c) return "";
  const a = AEROPORTOS.find((x) => x.codigo === c.toUpperCase());
  return a ? `${a.cidade} (${a.codigo})` : c;
}

const intervalo = (a: string, b: string) => (a ? `${dataBR(a)}${b ? ` a ${dataBR(b)}` : ""}` : "");

/** Pedido de orçamento em cinco abas. Nada é guardado: o formulário só escreve a mensagem do WhatsApp. */
export default function Orcamento() {
  // Aba e rota podem chegar pelo endereço, ex.: /orcamento/?tipo=hotel ou vindo de uma promoção encerrada.
  const q = useSearchParams();
  const [tipo, setTipo] = useState<Tipo>(() => {
    const t = q.get("tipo");
    return ABAS.find((a) => a.tipo === t)?.tipo ?? "passagem";
  });
  const [origem, setOrigem] = useState(() => nomeCidade(q.get("origem")));
  const [destino, setDestino] = useState(() => nomeCidade(q.get("destino")));
  const [ida, setIda] = useState("");
  const [volta, setVolta] = useState("");
  const [trajeto, setTrajeto] = useState<"idavolta" | "ida">("idavolta");
  const [flexivel, setFlexivel] = useState<"sim" | "nao">("nao");
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [idadesCriancas, setIdadesCriancas] = useState("");
  const [quartos, setQuartos] = useState(1);
  const [cafe, setCafe] = useState<"sim" | "nao" | "tanto">("tanto");
  const [estrelas, setEstrelas] = useState<"tanto" | "3" | "4" | "5">("tanto");
  const [incluir, setIncluir] = useState<string[]>(["Passagem aérea", "Hotel"]);
  const [idades, setIdades] = useState("");
  const [obs, setObs] = useState("");
  const hoje = useHoje();

  // A volta (ou a saída do hotel, ou o fim do seguro) nunca fica antes da ida: se a ida passar dela, ela é apagada.
  function mudarIda(v: string) {
    setIda(v);
    if (v && volta && volta < v) setVolta("");
  }


  function trocarAba(t: Tipo) {
    setTipo(t);
    const url = new URL(window.location.href);
    url.searchParams.set("tipo", t);
    window.history.replaceState(null, "", url);
  }

  const pessoas = [
    plural(adultos, "adulto", "adultos"),
    criancas && plural(criancas, "criança", "crianças"),
    bebes && plural(bebes, "bebê", "bebês"),
  ]
    .filter(Boolean)
    .join(", ");

  const mensagem = (() => {
    const fim = [obs.trim() && `Observações: ${obs.trim()}`];
    if (tipo === "passagem")
      return montarMensagem([
        "Olá! Quero um orçamento de passagem aérea:",
        `De: ${origem || "—"}`,
        `Para: ${destino || "—"}`,
        trajeto === "ida" ? `Ida: ${ida ? dataBR(ida) : "—"} (só ida)` : `Datas: ${intervalo(ida, volta) || "—"}`,
        flexivel === "sim" && "Datas flexíveis: sim",
        `Passageiros: ${pessoas}`,
        ...fim,
      ]);
    if (tipo === "onibus")
      return montarMensagem([
        "Olá! Quero um orçamento de passagem de ônibus:",
        `De: ${origem || "—"}`,
        `Para: ${destino || "—"}`,
        trajeto === "ida" ? `Ida: ${ida ? dataBR(ida) : "—"} (só ida)` : `Datas: ${intervalo(ida, volta) || "—"}`,
        flexivel === "sim" && "Datas flexíveis: sim",
        `Passageiros: ${pessoas}`,
        ...fim,
      ]);
    if (tipo === "hotel")
      return montarMensagem([
        "Olá! Quero um orçamento de hotel:",
        `Destino: ${destino || "—"}`,
        `Entrada e saída: ${intervalo(ida, volta) || "—"}`,
        `Hóspedes: ${plural(adultos, "adulto", "adultos")}${criancas ? `, ${plural(criancas, "criança", "crianças")}${idadesCriancas.trim() ? ` (${idadesCriancas.trim()})` : ""}` : ""}`,
        `Quartos: ${quartos}`,
        `Café da manhã: ${cafe === "sim" ? "sim" : cafe === "nao" ? "não precisa" : "tanto faz"}`,
        estrelas !== "tanto" && `Estrelas: ${estrelas} ou mais`,
        ...fim,
      ]);
    if (tipo === "pacote")
      return montarMensagem([
        "Olá! Quero um orçamento de pacote:",
        `Destino: ${destino || "—"}`,
        origem && `Saindo de: ${origem}`,
        `Datas: ${intervalo(ida, volta) || "—"}`,
        `Pessoas: ${pessoas}`,
        `Incluir: ${incluir.length ? incluir.join(", ").toLowerCase() : "a definir"}`,
        ...fim,
      ]);
    return montarMensagem([
      "Olá! Quero um orçamento de seguro viagem:",
      `Destino: ${destino || "—"}`,
      `Período: ${intervalo(ida, volta) || "—"}`,
      `Idade dos viajantes: ${idades.trim() || "—"}`,
      ...fim,
    ]);
  })();

  function enviar(e: FormEvent) {
    e.preventDefault();
    registrarClique("orcamento", tipo);
    window.open(linkWhatsApp(mensagem), "_blank", "noopener");
  }

  // Passagem aérea e de ônibus podem ser só de ida; os outros pedidos sempre têm início e fim.
  const ehViagem = tipo === "passagem" || tipo === "onibus";
  const comVolta = !ehViagem || trajeto === "idavolta";
  const rotulos =
    tipo === "hotel" ? ["Entrada", "Saída"] : tipo === "seguro" ? ["Início da viagem", "Fim da viagem"] : ["Ida", "Volta"];
  const avisoVolta =
    tipo === "hotel"
      ? "A saída não pode ser antes da entrada."
      : tipo === "seguro"
        ? "O fim da viagem não pode ser antes do início."
        : "A volta não pode ser antes da ida.";

  return (
    <div className={s.orcamento}>
      <div className={s.abas} role="tablist" aria-label="Tipo de orçamento">
        {ABAS.map((a) => (
          <button
            key={a.tipo}
            type="button"
            role="tab"
            id={`aba-${a.tipo}`}
            aria-selected={tipo === a.tipo}
            aria-controls="painel-orcamento"
            className={s.aba}
            onClick={() => trocarAba(a.tipo)}
          >
            {a.texto}
          </button>
        ))}
      </div>

      <form id="painel-orcamento" role="tabpanel" aria-labelledby={`aba-${tipo}`} className={s.form} onSubmit={enviar}>
        {ehViagem && (
          <Escolha
            rotulo="Viagem"
            valor={trajeto}
            onChange={setTrajeto}
            opcoes={[
              { valor: "idavolta", texto: "Ida e volta" },
              { valor: "ida", texto: "Só ida" },
            ]}
          />
        )}

        <div className={s.duas}>
          {(ehViagem || tipo === "pacote") && (
            <CampoCidade
              rotulo="Saindo de"
              ajuda={tipo === "pacote" ? "(opcional)" : undefined}
              valor={origem}
              onChange={setOrigem}
              placeholder={tipo === "onibus" ? "Cidade" : "Cidade ou aeroporto"}
              required={ehViagem}
              semSugestoes={tipo === "onibus"}
            />
          )}
          <CampoCidade
            rotulo={ehViagem ? "Indo para" : "Destino"}
            valor={destino}
            onChange={setDestino}
            placeholder={tipo === "onibus" ? "Cidade" : "Cidade, país ou aeroporto"}
            required
            semSugestoes={tipo === "onibus"}
          />
        </div>

        <div className={s.duas}>
          <CampoData rotulo={rotulos[0]} valor={ida} outra={comVolta ? volta : undefined} onChange={mudarIda} min={hoje} avisoMin="Escolha uma data a partir de hoje." required />
          {comVolta && (
            <CampoData
              rotulo={rotulos[1]}
              valor={volta}
              outra={ida}
              onChange={setVolta}
              min={ida || hoje}
              avisoMin={ida ? avisoVolta : "Escolha uma data a partir de hoje."}
              required={!ehViagem}
            />
          )}
        </div>

        {ehViagem && (
          <Escolha
            rotulo="As datas são flexíveis?"
            valor={flexivel}
            onChange={setFlexivel}
            opcoes={[
              { valor: "nao", texto: "Não" },
              { valor: "sim", texto: "Sim, posso mudar uns dias" },
            ]}
          />
        )}

        {tipo !== "seguro" && (
          <div className={s.grupo}>
            <Contador
              rotulo="Adultos"
              ajuda="12 anos ou mais"
              valor={adultos}
              min={1}
              onChange={(n) => {
                setAdultos(n);
                setBebes((b) => Math.min(b, n));
              }}
            />
            <Contador rotulo="Crianças" ajuda="2 a 11 anos" valor={criancas} onChange={setCriancas} />
            {tipo !== "hotel" && (
              <Contador rotulo="Bebês" ajuda="Até 2 anos" valor={bebes} max={adultos} onChange={setBebes} />
            )}
          </div>
        )}

        {tipo === "hotel" && (
          <>
            {criancas > 0 && (
              <Campo
                rotulo="Idade das crianças"
                value={idadesCriancas}
                onChange={(e) => setIdadesCriancas(e.target.value)}
                placeholder="Ex.: 4 e 9 anos"
              />
            )}
            <Contador rotulo="Quartos" valor={quartos} min={1} max={6} onChange={setQuartos} />
            <Escolha
              rotulo="Café da manhã"
              valor={cafe}
              onChange={setCafe}
              opcoes={[
                { valor: "sim", texto: "Com café" },
                { valor: "nao", texto: "Sem café" },
                { valor: "tanto", texto: "Tanto faz" },
              ]}
            />
            <Escolha
              rotulo="Estrelas do hotel (opcional)"
              valor={estrelas}
              onChange={setEstrelas}
              opcoes={[
                { valor: "tanto", texto: "Tanto faz" },
                { valor: "3", texto: "3 ou mais" },
                { valor: "4", texto: "4 ou mais" },
                { valor: "5", texto: "5" },
              ]}
            />
          </>
        )}

        {tipo === "pacote" && (
          <fieldset className={s.incluir}>
            <legend>O que incluir</legend>
            <div>
              {INCLUIR.map((item) => (
                <label key={item} data-marcado={incluir.includes(item)}>
                  <input
                    type="checkbox"
                    checked={incluir.includes(item)}
                    onChange={(e) =>
                      setIncluir((atual) => (e.target.checked ? [...atual, item] : atual.filter((x) => x !== item)))
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {tipo === "seguro" && (
          <Campo
            rotulo="Idade de cada viajante"
            value={idades}
            onChange={(e) => setIdades(e.target.value)}
            placeholder="Ex.: 34, 36 e 8 anos"
            required
          />
        )}

        <Texto
          rotulo="Observações (opcional)"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          placeholder="Algo mais que a gente precisa saber?"
        />

        <Previa mensagem={mensagem} />

        <button type="submit" className={`botao ${s.enviar}`}>
          Enviar pelo WhatsApp
        </button>
      </form>
    </div>
  );
}
