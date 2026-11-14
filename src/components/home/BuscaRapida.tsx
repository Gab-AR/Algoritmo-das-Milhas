"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import CampoCidade from "@/components/form/CampoCidade";
import CampoData from "@/components/form/CampoData";
import { AEROPORTOS } from "@/data/aeroportos";
import { registrarClique } from "@/lib/cliques";
import { useHoje } from "@/lib/relogio";
import { dataBR } from "@/lib/promocao";
import { linkWhatsApp, montarMensagem } from "@/lib/whatsapp";
import s from "./BuscaRapida.module.css";

/** Busca da primeira tela: de onde, para onde, quando e quantos. Vai direto para o WhatsApp. */
export default function BuscaRapida() {
  const [origem, setOrigem] = useState("Teresina (THE)");
  const [destino, setDestino] = useState("");
  const [ida, setIda] = useState("");
  const [volta, setVolta] = useState("");
  const [pessoas, setPessoas] = useState("1");
  const hoje = useHoje();
  const [hotel, setHotel] = useState(false);
  const [seguro, setSeguro] = useState(false);
  // Internacional: origem ou destino da lista fora do Brasil.
  const internacional = [origem, destino].some((c) => {
    const a = AEROPORTOS.find((x) => c.toUpperCase().includes(`(${x.codigo})`));
    return !!a && a.pais !== "Brasil";
  });

  // A volta nunca fica antes da ida: se a ida passar dela, a volta é apagada.
  function mudarIda(v: string) {
    setIda(v);
    if (v && volta && volta < v) setVolta("");
  }

  function enviar(e: FormEvent) {
    e.preventDefault();
    const mensagem = montarMensagem([
      "Olá! Quero uma cotação de passagem:",
      `De: ${origem || "—"}`,
      `Para: ${destino || "—"}`,
      volta ? `Datas: ${dataBR(ida)} a ${dataBR(volta)}` : `Ida: ${dataBR(ida)} (só ida)`,
      `Passageiros: ${pessoas}`,
      hotel && "Hospedagem: quero cotar também, nas datas da viagem",
      internacional && seguro && "Seguro viagem: quero cotar também",
    ]);
    registrarClique("orcamento", "busca");
    window.open(linkWhatsApp(mensagem), "_blank", "noopener");
  }

  return (
    <form className={s.busca} onSubmit={enviar} aria-labelledby="titulo-busca">
      <p id="titulo-busca" className={s.titulo}>
        Para onde você quer ir?
      </p>
      <div className={s.campos}>
        <CampoCidade rotulo="Saindo de" valor={origem} onChange={setOrigem} placeholder="Cidade ou aeroporto" required />
        <CampoCidade rotulo="Indo para" valor={destino} onChange={setDestino} placeholder="Cidade, país ou aeroporto" required />
        <CampoData rotulo="Ida" valor={ida} outra={volta} onChange={mudarIda} min={hoje} avisoMin="Escolha uma data a partir de hoje." required />
        <CampoData
          rotulo="Volta"
          ajuda="(opcional)"
          valor={volta}
          outra={ida}
          onChange={setVolta}
          min={ida || hoje}
          avisoMin={ida ? "A volta não pode ser antes da ida." : "Escolha uma data a partir de hoje."}
        />
        <div className={s.pessoas}>
          <label htmlFor="busca-pessoas">Passageiros</label>
          <select id="busca-pessoas" value={pessoas} onChange={(e) => setPessoas(e.target.value)}>
            {Array.from({ length: 9 }, (_, i) => String(i + 1)).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={`botao ${s.enviar}`}>
          Cotar no WhatsApp
        </button>
      </div>
      <div className={s.extras}>
        <label>
          <input type="checkbox" checked={hotel} onChange={(e) => setHotel(e.target.checked)} /> Cotar hospedagem também
        </label>
        {internacional && (
          <label>
            <input type="checkbox" checked={seguro} onChange={(e) => setSeguro(e.target.checked)} /> Cotar seguro viagem
          </label>
        )}
      </div>
      <p className={s.mais}>
        Precisa de hotel, pacote ou seguro viagem? <Link href="/orcamento/">Veja todos os orçamentos</Link>
      </p>
    </form>
  );
}
