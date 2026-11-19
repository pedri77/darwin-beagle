import {anos} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/**
 * Veintitrés años de cajón: una regla vertical por años, de 1836 a 1860.
 * Los hitos se colocan a su altura real; donde se amontonan se separan un poco para que se lean.
 */
const INICIO = 1836.5;
const FIN = 1860;
/**
 * Altura (svh) de cada año en escritorio, lineal, y en móvil, donde los primeros años (1836–1840, con seis hitos
 * seguidos) se estiran para que el texto quepa sin descolocarse de su año. Separación mínima entre hitos aparte.
 */
const yD = (a: number) => (a - INICIO) * 9;
const yM = (a: number) => (a < 1840 ? (a - INICIO) * 40 : 3.5 * 40 + (a - 1840) * 13);
const HUECO = {m: 13, d: 7};

export function Anos() {
  const ref = useAparecer<HTMLElement>();
  const colocar = (y0: (a: number) => number, hueco: number) => {
    let ultimo = -Infinity;
    return anos.hitos.map((h) => {
      const y = Math.max(y0(h.año), ultimo + hueco);
      ultimo = y;
      return y;
    });
  };
  const pm = colocar(yM, HUECO.m);
  const pd = colocar(yD, HUECO.d);
  const vars = (m: number, d: number) => ({'--ym': `${m}svh`, '--yd': `${d}svh`}) as React.CSSProperties;
  const años = Array.from({length: FIN - 1837 + 1}, (_, i) => 1837 + i);

  return (
    <section ref={ref} aria-labelledby="anos-titulo" className="bg-caoba px-4 py-[14svh] text-papel sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[76rem]">
        <p data-aparece className="text-[0.8rem] tracking-[0.12em] text-papel/60 uppercase">
          {anos.antetitulo}
        </p>
        <h2 id="anos-titulo" data-aparece className="mt-3 font-display text-display" style={{'--i': 1} as React.CSSProperties}>
          {anos.titulo}
        </h2>
        <p data-aparece className="mt-5 max-w-[42rem] text-lead text-papel/80" style={{'--i': 2} as React.CSSProperties}>
          {anos.intro}
        </p>

        <div className="relative mt-14 h-(--ym) md:h-(--yd)" style={vars(yM(FIN) + 6, yD(FIN) + 6)}>
          <div className="absolute top-0 bottom-0 left-[3.2rem] w-px bg-papel/25 md:left-[4.5rem]" />
          {años.map((a) => (
            <span key={a} className="absolute top-(--ym) left-0 w-[2.6rem] -translate-y-1/2 text-right text-[0.75rem] text-papel/35 tabular-nums md:top-(--yd) md:w-[3.8rem] md:text-[0.85rem]" style={vars(yM(a), yD(a))}>
              {a}
            </span>
          ))}
          <ol>
            {anos.hitos.map((h, i) => (
              <li key={h.fecha} data-aparece className="absolute top-(--ym) right-0 left-[3.2rem] flex items-start gap-3 pl-4 md:top-(--yd) md:left-[4.5rem] md:pl-8" style={vars(pm[i], pd[i])}>
                <span className={`absolute top-[0.45em] -left-[5px] size-[11px] rounded-full ${h.clave ? 'bg-ocre' : 'bg-papel/60'}`} />
                <div className="max-w-[36rem]">
                  <p className={`etiqueta text-[1.05rem] md:text-[1.3rem] ${h.clave ? 'text-ocre' : 'text-papel/70'}`}>{h.fecha}</p>
                  <p className={`text-[0.92rem] leading-snug md:text-body ${h.clave ? 'text-papel' : 'text-papel/75'}`}>{h.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p data-aparece className="absolute top-(--ym) right-0 left-[3.2rem] pl-4 text-[0.95rem] text-papel/60 italic md:top-(--yd) md:left-[4.5rem] md:max-w-[34rem] md:pl-8" style={vars(yM(1851), yD(1851))}>
            {anos.cierre}
          </p>
        </div>
      </div>
    </section>
  );
}
