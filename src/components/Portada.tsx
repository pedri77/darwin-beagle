import {useEffect, useRef} from 'react';
import {L, img, portada} from '../content';
import {lerp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * Portada: la tapa de un cajón de caoba con su etiqueta y, dentro, tres láminas que asoman.
 *
 * Guion de scroll (p), sección de 160 svh:
 *   0.00 – 0.12  el aviso de scroll se apaga
 *   0.25 – 0.90  la tapa sube (el cajón se abre) y las láminas se separan un poco
 */
const ASOMAN = ['nandu', 'trifasciatus', 'lobo'];

export function Portada() {
  const raizRef = useRef<HTMLElement>(null);
  const tapaRef = useRef<HTMLDivElement>(null);
  const avisoRef = useRef<HTMLParagraphElement>(null);
  const laminasRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let pAnterior = -1;
    return enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00003) return;
      pAnterior = p;
      const a = tramo(p, 0.25, 0.9);
      tapaRef.current!.style.transform = `translate3d(0, ${lerp(0, -22, a)}svh, 0)`;
      tapaRef.current!.style.opacity = String(1 - tramo(p, 0.5, 0.9));
      avisoRef.current!.style.opacity = String(1 - tramo(p, 0.02, 0.12));
      laminasRef.current.forEach((el, i) => {
        if (!el) return;
        const r = [-7, 2, 8][i];
        el.style.transform = `translate3d(${lerp(0, (i - 1) * 6, a)}vw, ${lerp(0, -4, a)}svh, 0) rotate(${lerp(r, r * 0.4, a)}deg)`;
      });
    });
  }, []);

  return (
    <section ref={raizRef} id="inicio" aria-labelledby="titulo" className="relative bg-caoba" style={{height: '160svh'}}>
      <div className="sticky top-0 grid h-pantalla items-center overflow-hidden px-4 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-[5vw] md:px-[6vw]">
        <div ref={tapaRef} className="relative z-10">
          <div className="inline-block bg-papel px-6 py-7 shadow-[0_24px_50px_-24px_oklch(10%_0.03_50/0.8)] md:px-9 md:py-9">
            <p className="text-[0.75rem] tracking-[0.12em] text-tinta-2 uppercase">{portada.antetitulo}</p>
            <h1 id="titulo" className="mt-3 font-display text-hero text-tinta">
              {portada.titulo.map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))}
            </h1>
            <p className="etiqueta mt-3 text-[1.4rem] text-botella md:text-[1.8rem]">Ch. Darwin, naturalista</p>
          </div>
          <p className="mt-7 max-w-[34rem] text-[0.98rem] leading-relaxed text-papel/85 md:text-lead">{portada.entradilla}</p>
          <p ref={avisoRef} className="mt-6 text-[0.8rem] tracking-[0.12em] text-papel/60 uppercase">
            ↓ {portada.aviso}
          </p>
        </div>
        <div className="relative mx-auto hidden h-[64svh] w-full max-w-[30rem] md:block" aria-hidden="true">
          {ASOMAN.map((k, i) => {
            const l = L[k];
            return (
              <figure
                key={k}
                ref={(el) => {
                  laminasRef.current[i] = el;
                }}
                className="lamina absolute top-[8%] w-[56%] bg-papel p-1.5"
                style={{left: `${i * 22}%`, transform: `rotate(${[-7, 2, 8][i]}deg)`, zIndex: i === 1 ? 3 : 1}}
              >
                <img src={img(k)} alt="" width={l.w} height={l.h} className="block h-auto w-full" />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
