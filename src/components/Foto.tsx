/* eslint-disable @next/next/no-img-element -- site estático: as versões menores já existem em /fotos/site */

type Props = {
  nome: string;
  alt: string;
  className?: string;
  prioridade?: boolean;
  tamanhos?: string;
  largura?: number;
  altura?: number;
};

/** Foto da pasta /fotos/site, com a versão de 800 px para celular. */
export default function Foto({ nome, alt, className, prioridade, tamanhos = "100vw", largura = 1600, altura = 1067 }: Props) {
  return (
    <img
      src={`/fotos/site/${nome}.jpg`}
      srcSet={`/fotos/site/${nome}-800.jpg 800w, /fotos/site/${nome}.jpg 1600w`}
      sizes={tamanhos}
      width={largura}
      height={altura}
      alt={alt}
      className={className}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : undefined}
      decoding="async"
    />
  );
}
