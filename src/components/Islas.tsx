import {L, img, islas} from '../content';
import {useAparecer} from '../hooks/useAparecer';

/** Galápagos: tres sinsontes de tres islas, la frase de 1836 y los pinzones que nadie etiquetó por isla. */
export function Islas() {
  const ref = useAparecer<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="islas-titulo" className="bg-papel px-4 py-[14svh] sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[76rem]">
        <p data-aparece className="text-[0.8rem] tracking-[0.12em] text-botella uppercase">
          {islas.antetitulo}
        </p>
        <h2 id="islas-titulo" data-aparece className="mt-3 font-display text-display" style={{'--i': 1} as React.CSSProperties}>
          {islas.titulo}
        </h2>
        <p data-aparece className="mt-5 max-w-[46rem] text-lead text-tinta-2" style={{'--i': 2} as React.CSSProperties}>
          {islas.intro}
        </p>

        <ul className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
          {islas.sinsontes.map((s, i) => {
            const l = L[s.k];
            return (
              <li key={s.k} data-aparece style={{'--i': i} as React.CSSProperties}>
                <figure className="lamina bg-papel-2 p-1.5 md:p-2">
                  <img src={img(s.k)} alt={`${s.nombre} (${s.latin}), lámina de John Gould.`} width={l.w} height={l.h} loading="lazy" decoding="async" className="block h-auto w-full" />
                </figure>
                <p className="etiqueta mt-3 text-[1rem] text-tinta md:text-[1.35rem]">{s.latin}</p>
                <p className="text-[0.78rem] text-tinta-2 md:text-[0.9rem]">{s.isla}</p>
              </li>
            );
          })}
        </ul>

        <blockquote data-aparece className="mt-14 max-w-[54rem] border-l-2 border-botella pl-5 md:pl-7">
          <p className="font-display text-[clamp(1.3rem,2.3vw,2rem)] leading-snug italic">{islas.cita}</p>
          <footer className="mt-3 text-[0.9rem] text-tinta-2">{islas.fuente}</footer>
        </blockquote>

        <h3 data-aparece className="mt-20 font-display text-[clamp(1.6rem,3vw,2.6rem)]">
          {islas.pinzonesTitulo}
        </h3>
        <p data-aparece className="mt-4 max-w-[46rem] text-body text-tinta-2" style={{'--i': 1} as React.CSSProperties}>
          {islas.pinzonesTexto}
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
          {islas.pinzones.map((s, i) => {
            const l = L[s.k];
            return (
              <li key={s.k} data-aparece style={{'--i': i} as React.CSSProperties}>
                <figure className="lamina aspect-[4/5] overflow-hidden bg-papel-2 p-1.5">
                  <img src={img(s.k)} alt={`${s.nombre} (${s.latin}), lámina de John Gould.`} width={l.w} height={l.h} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
                </figure>
                <p className="etiqueta mt-3 text-[1rem] md:text-[1.2rem]">{s.latin}</p>
                <p className="text-[0.85rem] text-tinta-2">{s.pico}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
