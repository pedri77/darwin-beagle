import {L, commons, creditos} from '../content';
import {useAparecer} from '../hooks/useAparecer';
import {irA} from '../lib/scroll';

/** Fuentes, cada lámina con su enlace a Commons, y método. */
export function Creditos() {
  const ref = useAparecer<HTMLElement>();
  const lic = (s: string) => (s === 'Public domain' ? 'Dominio público' : s);
  return (
    <footer ref={ref} aria-labelledby="creditos-titulo" className="bg-papel-2 px-4 pt-[12svh] pb-10 sm:px-6 md:px-[6vw]">
      <div className="mx-auto max-w-[76rem]">
        <h2 id="creditos-titulo" data-aparece className="font-display text-display">
          {creditos.titulo}
        </h2>
        <ul className="mt-6 grid gap-2.5 text-body md:grid-cols-2">
          {creditos.fuentes.map((f) => (
            <li key={f.url}>
              <a href={f.url} target="_blank" rel="noreferrer" className="underline decoration-tinta/30 underline-offset-4 hover:decoration-ocre">
                {f.nombre} ↗
              </a>
            </li>
          ))}
        </ul>
        <h3 className="mt-12 text-[0.8rem] tracking-[0.12em] text-tinta-2 uppercase">Láminas</h3>
        <p className="mt-3 max-w-[52rem] text-[0.9375rem] text-tinta-2">{creditos.laminas}</p>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-[0.9375rem] text-tinta-2 md:grid-cols-2">
          {Object.entries(L).map(([k, l]) => (
            <li key={k} className="border-b border-tinta/12 pb-1.5">
              <a href={commons(l.fichero)} target="_blank" rel="noreferrer" className="text-tinta underline decoration-tinta/25 underline-offset-4 hover:decoration-ocre">
                {l.fichero.replace(/\.(jpe?g|png)$/i, '')}
              </a>
              . {lic(l.licencia)}.
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[52rem] text-[0.9375rem] text-tinta-2">{creditos.metodo}</p>
        <button type="button" onClick={() => irA('#inicio')} className="mt-8 rounded-full border border-tinta/50 px-5 py-2.5 text-[0.8rem] tracking-[0.12em] uppercase transition-colors hover:border-botella hover:bg-botella hover:text-papel">
          ↑ Volver a Plymouth
        </button>
        <p className="etiqueta mt-10 text-[1.8rem] text-botella">{creditos.firma}</p>
      </div>
    </footer>
  );
}
