import {geoEquirectangular, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {Topology} from 'topojson-specification';
import {useEffect, useRef} from 'react';
import tierra from 'world-atlas/land-110m.json';
import {L, img, intermedios, paradas} from '../content';
import {clamp, easeInOutSine, lerp, progresoFijado, tramo} from '../lib/math';
import {enCadaFotograma} from '../lib/scroll';

/**
 * El viaje: un mapa plano en papel avanza con el scroll siguiendo al Beagle, y abajo un cajón de museo se llena
 * con las láminas de lo que Darwin recogió en cada parada.
 *
 * Guion de scroll (p), sección de N × 70 + 60 svh:
 *   0.03 – 0.96  pos = tramo × (N − 1). Dentro de cada paso i → i + 1 (f = parte decimal):
 *                  0.00 – 0.35  parado en la parada i, con su ficha
 *                  0.35 – 1.00  navega hasta la i + 1 (suavizado); la ficha i se va en 0.35 – 0.45 y la
 *                               i + 1 entra en 0.85 – 1.00
 *   Cada espécimen cae al cajón en pos ∈ [j − 0.05, j + 0.15] (j = su parada), escalonado si hay varios.
 *   La cámara sigue al barco en los dos ejes; el mundo se dibuja dos veces porque la ruta da la vuelta entera.
 */

const TIERRA = feature(tierra as unknown as Topology, (tierra as unknown as Topology).objects.land);
const N = paradas.length;
/** Ruta completa en grados desenrollados, con el índice del punto donde está cada parada. */
const RUTA: [number, number][] = [];
const EN_RUTA: number[] = [];
paradas.forEach((p, i) => {
  if (i > 0) (intermedios[i] ?? []).forEach((q) => RUTA.push(q));
  EN_RUTA.push(RUTA.length);
  RUTA.push([p.lon, p.lat]);
});
const ESPECIMENES = paradas.flatMap((p, j) => (p.especimenes ?? []).map((e, n) => ({...e, j, n, lugar: p.lugar})));
const DESPLAZA = 400;

export function Viaje() {
  const raizRef = useRef<HTMLElement>(null);
  const marcoRef = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<SVGGElement>(null);
  const tierraARef = useRef<SVGPathElement>(null);
  const tierraBRef = useRef<SVGPathElement>(null);
  const rutaRef = useRef<SVGPolylineElement>(null);
  const hechaRef = useRef<SVGPolylineElement>(null);
  const barcoRef = useRef<SVGGElement>(null);
  const puntosRef = useRef<(SVGCircleElement | null)[]>([]);
  const fichasRef = useRef<(HTMLElement | null)[]>([]);
  const celdasRef = useRef<(HTMLElement | null)[]>([]);
  const cuentaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let k = 1;
    let w = 0;
    let h = 0;
    let px: [number, number][] = [];
    let acum: number[] = [];
    let total = 1;
    let pAnterior = -1;

    const medir = () => {
      const r = marcoRef.current!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      k = Math.max(4, h / 70);
      const proy = geoEquirectangular()
        .scale((k * 180) / Math.PI)
        .translate([DESPLAZA * k, 90 * k]);
      const d = geoPath(proy)(TIERRA) ?? '';
      tierraARef.current!.setAttribute('d', d);
      tierraBRef.current!.setAttribute('d', d);
      tierraBRef.current!.setAttribute('transform', `translate(${-360 * k} 0)`);
      px = RUTA.map(([lon, lat]) => [(lon + DESPLAZA) * k, (90 - lat) * k]);
      acum = [0];
      for (let i = 1; i < px.length; i++) acum.push(acum[i - 1] + Math.hypot(px[i][0] - px[i - 1][0], px[i][1] - px[i - 1][1]));
      total = acum[acum.length - 1];
      const pts = px.map((p) => p.join(',')).join(' ');
      rutaRef.current!.setAttribute('points', pts);
      hechaRef.current!.setAttribute('points', pts);
      hechaRef.current!.style.strokeDasharray = `0 ${total + 10}`;
      EN_RUTA.forEach((ix, i) => {
        const c = puntosRef.current[i];
        if (!c) return;
        c.setAttribute('cx', String(px[ix][0]));
        c.setAttribute('cy', String(px[ix][1]));
      });
      pAnterior = -1;
    };

    /** Punto de la ruta a una distancia dada (en px a lo largo de la línea). */
    const enDistancia = (d: number): [number, number] => {
      let i = 1;
      while (i < acum.length - 1 && acum[i] < d) i++;
      const u = clamp((d - acum[i - 1]) / Math.max(1e-6, acum[i] - acum[i - 1]));
      return [lerp(px[i - 1][0], px[i][0], u), lerp(px[i - 1][1], px[i][1], u)];
    };

    const ro = new ResizeObserver(medir);
    ro.observe(marcoRef.current!);
    medir();

    const quitar = enCadaFotograma(() => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const {p, visible} = progresoFijado(raiz);
      if (!visible || Math.abs(p - pAnterior) < 0.00002) return;
      pAnterior = p;

      const pos = tramo(p, 0.03, 0.96) * (N - 1);
      const i = Math.min(N - 2, Math.floor(pos));
      const f = pos - i;
      const fin = pos >= N - 1;
      const viaje = fin ? 1 : easeInOutSine(tramo(f, 0.35, 1));
      const d0 = acum[EN_RUTA[i]];
      const d1 = acum[EN_RUTA[fin ? N - 1 : i + 1]];
      const d = fin ? total : lerp(d0, d1, viaje);
      const [x, y] = enDistancia(d);
      const ahead = enDistancia(Math.min(total, d + 4));
      const hacia = ahead[0] < x - 0.01 ? -1 : 1;

      hechaRef.current!.style.strokeDasharray = `${d} ${total + 10}`;
      barcoRef.current!.setAttribute('transform', `translate(${x} ${y}) scale(${hacia * 1.7} 1.7)`);
      const ancla = w < 768 ? 0.5 : 0.62;
      const cx = w * ancla - x;
      const cy = h * 0.5 - y;
      mapaRef.current!.setAttribute('transform', `translate(${cx} ${cy})`);
      EN_RUTA.forEach((_, j) => {
        const c = puntosRef.current[j];
        if (c) c.style.opacity = j <= pos + 0.001 ? '1' : '0.35';
      });

      fichasRef.current.forEach((el, n) => {
        if (!el) return;
        const j = n % N;
        let o = 0;
        if (fin) o = j === N - 1 ? 1 : 0;
        else if (j === i) o = 1 - tramo(f, 0.35, 0.45);
        else if (j === i + 1) o = tramo(f, 0.85, 1);
        el.style.opacity = String(o);
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      });

      let llenas = 0;
      ESPECIMENES.forEach((e, n) => {
        const el = celdasRef.current[n];
        if (!el) return;
        const a = tramo(pos, e.j - 0.05 + e.n * 0.08, e.j + 0.15 + e.n * 0.08);
        if (a > 0.5) llenas++;
        const lam = el.querySelector<HTMLElement>('[data-lamina]')!;
        const eti = el.querySelector<HTMLElement>('[data-etiqueta]')!;
        lam.style.opacity = String(a);
        lam.style.transform = `translate3d(0, ${lerp(-40, 0, a)}px, 0) rotate(${lerp(-8, 0, a)}deg)`;
        eti.style.opacity = String(tramo(a, 0.6, 1));
      });
      cuentaRef.current!.textContent = String(llenas);
    });
    return () => {
      quitar();
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={raizRef} id="viaje" aria-labelledby="viaje-titulo" className="relative bg-caoba" style={{height: `${N * 70 + 60}svh`}}>
      <h2 id="viaje-titulo" className="sr-only">
        El viaje del Beagle y el cajón de especímenes
      </h2>
      <div className="sticky top-0 grid h-pantalla grid-rows-[minmax(0,1fr)_auto_auto] overflow-hidden md:grid-rows-[minmax(0,1fr)_auto]">
        <div ref={marcoRef} className="relative min-h-0 overflow-hidden bg-mar">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <g ref={mapaRef}>
              <path ref={tierraARef} className="fill-papel stroke-tinta/40" strokeWidth={0.8} />
              <path ref={tierraBRef} className="fill-papel stroke-tinta/40" strokeWidth={0.8} />
              <polyline ref={rutaRef} fill="none" className="stroke-tinta/35" strokeWidth={1.2} strokeDasharray="3 5" />
              <polyline ref={hechaRef} fill="none" className="stroke-ocre" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
              {paradas.map((_, j) => (
                <circle
                  key={j}
                  ref={(el) => {
                    puntosRef.current[j] = el;
                  }}
                  r={4}
                  className="fill-papel stroke-tinta"
                  strokeWidth={1.4}
                />
              ))}
              <g ref={barcoRef}>
                <path d="M-11 0 L11 0 L7 5 L-8 5 Z" className="fill-tinta" />
                <path d="M-1 -1 L-1 -16 L8 -3 Z M-3 -1 L-3 -12 L-10 -2 Z" className="fill-papel stroke-tinta" strokeWidth={0.8} />
              </g>
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(29%_0.035_50/0.35))]" />
          <div className="absolute top-0 left-0 hidden h-full w-full md:block">
            {paradas.map((pa, j) => (
              <article
                key={j}
                ref={(el) => {
                  fichasRef.current[j] = el;
                }}
                className="absolute top-[5svh] left-[4vw] w-[min(26rem,34vw)] bg-papel/95 p-5 shadow-[0_16px_40px_-20px_oklch(20%_0.03_50/0.6)]"
                style={{opacity: j === 0 ? 1 : 0, visibility: j === 0 ? 'visible' : 'hidden'}}
              >
                <p className="text-[0.8rem] tracking-wide text-tinta-2 uppercase">{pa.fecha}</p>
                <h3 className="mt-1 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight">
                  {pa.lugar} <span className="text-tinta-2 italic">· {pa.titulo}</span>
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-tinta-2">{pa.texto}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative h-[24svh] bg-papel md:hidden">
          {paradas.map((pa, j) => (
            <article
              key={j}
              aria-hidden="true"
              ref={(el) => {
                fichasRef.current[N + j] = el;
              }}
              className="absolute inset-0 px-4 py-3"
              style={{opacity: j === 0 ? 1 : 0, visibility: j === 0 ? 'visible' : 'hidden'}}
            >
              <p className="text-[0.72rem] tracking-wide text-tinta-2 uppercase">{pa.fecha}</p>
              <h3 className="font-display text-[1.35rem] leading-tight">
                {pa.lugar} <span className="text-tinta-2 italic">· {pa.titulo}</span>
              </h3>
              <p className="mt-1 text-[0.8rem] leading-snug text-tinta-2">{pa.texto}</p>
            </article>
          ))}
        </div>

        <div className="border-t-[6px] border-caoba-3 bg-caoba-2 px-3 pt-2 pb-3 sm:px-6 md:px-[4vw] md:pt-3 md:pb-4">
          <p className="mb-2 flex justify-between text-[0.75rem] tracking-wide text-papel/70 uppercase">
            <span>Cajón n.º 1 · HMS Beagle</span>
            <span>
              <span ref={cuentaRef}>0</span> de {ESPECIMENES.length} especímenes
            </span>
          </p>
          <ol className="grid grid-cols-4 gap-1.5 md:grid-cols-8 md:gap-3">
            {ESPECIMENES.map((e, n) => {
              const l = L[e.k];
              return (
                <li
                  key={e.k}
                  ref={(el) => {
                    celdasRef.current[n] = el;
                  }}
                  className="relative flex h-[13svh] flex-col items-center justify-end overflow-hidden rounded-[2px] bg-caoba px-1 pt-1 pb-1 shadow-[inset_0_2px_6px_oklch(10%_0.02_50/0.7)] md:h-[22svh] md:px-2 md:pb-2"
                >
                  <span className="absolute top-1 left-1.5 text-[0.65rem] text-papel/30">{n + 1}</span>
                  <img
                    data-lamina
                    src={img(e.k)}
                    alt={`${e.nombre} (${e.latin}), lámina de The Zoology of the Voyage of H.M.S. Beagle.`}
                    width={l.w}
                    height={l.h}
                    loading="lazy"
                    decoding="async"
                    className="lamina min-h-0 w-auto max-w-full flex-1 object-contain"
                    style={{opacity: 0}}
                  />
                  <p data-etiqueta className="mt-1 w-full bg-papel px-1 py-0.5 text-center leading-tight text-tinta" style={{opacity: 0}}>
                    <span className="etiqueta block truncate text-[0.7rem] md:text-[0.95rem]">{e.latin}</span>
                    <span className="hidden truncate text-[0.62rem] text-tinta-2 md:block">{e.etiqueta}</span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
