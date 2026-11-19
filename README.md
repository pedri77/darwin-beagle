# El cajón del Beagle

Scroll-driven site about HMS Beagle's voyage (1831–1836). A flat paper map follows the ship stop by stop while a natural-history drawer at the bottom fills with what Darwin collected, using the hand-coloured plates of *The Zoology of the Voyage of H.M.S. Beagle* (1838–1843).

- **The voyage**: 17 stops from Plymouth to Falmouth. The map is drawn twice side by side so the westward route around the world is one continuous line (d3-geo equirectangular, Natural Earth coastlines). Eight specimens drop into the drawer at their stop: the Iago sparrow, the Falkland Islands wolf, the Toxodon skull bought for eighteen pence, Darwin's rhea, the Galápagos hawk and rice rat, the Floreana mockingbird and the large ground finch.
- **Islands in sight of each other**: three Galápagos mockingbirds and the 1836 *Ornithological Notes* passage, then four finches Darwin did not label by island.
- **Twenty-three years in a drawer**: a vertical ruler from 1836 to 1859 where each year has the same height (stretched on mobile for the crowded first years).

Plates are public domain (Wikimedia Commons). Facts are checked against Wikipedia and Cambridge University Library.

## Run

```bash
npm install
npm run dev     # http://localhost:3027
npm run build
```

## Data scripts

```bash
uv run scripts/laminas.py   # plates in datos-crudos/raw → public/img, src/datos/laminas.json
```

`datos-crudos/` is not committed: it holds the Commons downloads used by the script.

## Credits

Scroll engine (Lenis + a single rAF loop writing styles to the DOM) from the `web-cinematica` skill. Text written with AI assistance and checked against the sources listed on the page.
