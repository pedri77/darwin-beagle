import {useEffect} from 'react';
import {Anos} from './components/Anos';
import {Creditos} from './components/Creditos';
import {Islas} from './components/Islas';
import {Portada} from './components/Portada';
import {Viaje} from './components/Viaje';
import {useMovimientoReducido} from './hooks/useMovimientoReducido';
import {iniciarScroll} from './lib/scroll';

/** Orden del guion: la tapa del cajón · el viaje y el cajón · Galápagos · los 23 años · fuentes. */
export default function App() {
  const reducido = useMovimientoReducido();
  useEffect(() => iniciarScroll(reducido), [reducido]);
  return (
    <main>
      <Portada />
      <Viaje />
      <Islas />
      <Anos />
      <Creditos />
    </main>
  );
}
