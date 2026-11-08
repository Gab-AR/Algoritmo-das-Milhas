"use client";

import { useRef, useState } from "react";
import { Campo, Contador, Escolha, Previa } from "@/components/form/Campos";
import { registrarClique } from "@/lib/cliques";
import { codigo, cidade, dataBR, datasTexto, reais, tipoTexto, type Promocao } from "@/lib/promocao";
import { linkWhatsApp, montarMensagem } from "@/lib/whatsapp";
import s from "./QueroPromocao.module.css";

type Props = { promocao: Promocao; internacional: boolean };

const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

/** Antes do WhatsApp: passageiros, datas (se for período), hospedagem e seguro. A mensagem se escreve sozinha. */
export default function QueroPromocao({ promocao: p, internacional }: Props) {
  const janela = useRef<HTMLDialogElement>(null);
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [ida, setIda] = useState("");
  const [volta, setVolta] = useState("");
  const [hotel, setHotel] = useState<"sim" | "nao">("nao");
  const [seguro, setSeguro] = useState<"sim" | "nao">("nao");

  const periodo = p.modoDatas === "periodo";
  const pagantes = adultos + criancas;
  const passageiros = [
    plural(adultos, "adulto", "adultos"),
    criancas && plural(criancas, "criança", "crianças"),
    bebes && plural(bebes, "bebê", "bebês"),
  ]
    .filter(Boolean)
    .join(", ");

  const datas = periodo
    ? ida
      ? `Datas desejadas: ${dataBR(ida)}${p.tipo === "idavolta" && volta ? ` a ${dataBR(volta)}` : ""}`
      : `Período da promoção: ${datasTexto(p)} (datas a combinar)`
    : `Datas: ${datasTexto(p)}`;

  const mensagem = montarMensagem([
    `Olá! Quero a promoção ${codigo(p)} do site:`,
    `${cidade(p.origem)} (${p.origem}) → ${cidade(p.destino)} (${p.destino}), ${tipoTexto(p).toLowerCase()}`,
    datas,
    `Companhia: ${p.companhia}`,
    `Preço no site: ${periodo ? "a partir de " : ""}${reais(p.preco)} por pessoa, à vista no PIX`,
    `Passageiros: ${passageiros}`,
    hotel === "sim" && "Hospedagem: quero cotar também, nas datas do voo",
    internacional && seguro === "sim" && "Seguro viagem: quero cotar também",
    "Ainda está disponível?",
  ]);

  return (
    <>
      <button type="button" className={`botao ${s.abrir}`} onClick={() => janela.current?.showModal()}>
        Quero essa promoção
      </button>
      <dialog ref={janela} className={s.janela} aria-labelledby="titulo-janela" onClick={(e) => e.target === janela.current && janela.current?.close()}>
        <div className={s.conteudo}>
          <div className={s.cabeca}>
            <h2 id="titulo-janela">Antes de ir para o WhatsApp</h2>
            <button type="button" className={s.fechar} onClick={() => janela.current?.close()} aria-label="Fechar">
              ×
            </button>
          </div>
          <p className={s.resumo}>
            {cidade(p.origem)} → {cidade(p.destino)} · {periodo ? "a partir de " : ""}
            {reais(p.preco)} por pessoa
          </p>

          <div className={s.bloco}>
            <Contador
              rotulo="Adultos"
              ajuda="12 anos ou mais"
              valor={adultos}
              min={1}
              onChange={(n) => {
                setAdultos(n);
                setBebes((b) => Math.min(b, n)); // um bebê de colo por adulto
              }}
            />
            <Contador rotulo="Crianças" ajuda="2 a 11 anos" valor={criancas} onChange={setCriancas} />
            <Contador rotulo="Bebês" ajuda="Até 2 anos, no colo" valor={bebes} max={adultos} onChange={setBebes} />
          </div>

          {periodo && (
            <div className={s.datas}>
              <Campo
                rotulo="Ida"
                type="date"
                value={ida}
                min={p.periodoInicio}
                max={p.periodoFim}
                onChange={(e) => setIda(e.target.value)}
              />
              {p.tipo === "idavolta" && (
                <Campo
                  rotulo="Volta"
                  type="date"
                  value={volta}
                  min={ida || p.periodoInicio}
                  onChange={(e) => setVolta(e.target.value)}
                />
              )}
            </div>
          )}

          <Escolha
            rotulo="Quer hospedagem também?"
            valor={hotel}
            onChange={setHotel}
            opcoes={[
              { valor: "nao", texto: "Não, só a passagem" },
              { valor: "sim", texto: "Sim, quero cotar" },
            ]}
          />
          {internacional && (
            <Escolha
              rotulo="Precisa de seguro viagem?"
              valor={seguro}
              onChange={setSeguro}
              opcoes={[
                { valor: "nao", texto: "Não" },
                { valor: "sim", texto: "Sim, quero cotar" },
              ]}
            />
          )}

          <p className={s.total}>
            <span>Total estimado para {plural(pagantes, "passageiro", "passageiros")}</span>
            <strong>
              {periodo ? "a partir de " : ""}
              {reais(p.preco * pagantes)}
            </strong>
          </p>

          <Previa mensagem={mensagem} />

          <a
            className={`botao ${s.enviar}`}
            href={linkWhatsApp(mensagem)}
            target="_blank"
            rel="noopener"
            onClick={() => registrarClique("promocao", codigo(p))}
          >
            Continuar no WhatsApp
          </a>
          <p className={s.nota}>Você só paga depois de receber a passagem.</p>
        </div>
      </dialog>
    </>
  );
}
