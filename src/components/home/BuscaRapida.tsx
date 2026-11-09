"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import CampoCidade from "@/components/form/CampoCidade";
import { Campo } from "@/components/form/Campos";
import { registrarClique } from "@/lib/cliques";
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

  function enviar(e: FormEvent) {
    e.preventDefault();
    const mensagem = montarMensagem([
      "Olá! Quero uma cotação de passagem:",
      `De: ${origem || "—"}`,
      `Para: ${destino || "—"}`,
      volta ? `Datas: ${dataBR(ida)} a ${dataBR(volta)}` : `Ida: ${dataBR(ida)} (só ida)`,
      `Passageiros: ${pessoas}`,
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
        <Campo rotulo="Ida" type="date" value={ida} onChange={(e) => setIda(e.target.value)} required />
        <Campo
          rotulo="Volta"
          ajuda="(opcional)"
          type="date"
          value={volta}
          min={ida || undefined}
          onChange={(e) => setVolta(e.target.value)}
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
      <p className={s.mais}>
        Precisa de hotel, pacote ou seguro viagem? <Link href="/orcamento/">Veja todos os orçamentos</Link>
      </p>
    </form>
  );
}
