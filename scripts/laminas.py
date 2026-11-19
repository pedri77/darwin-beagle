# /// script
# dependencies = ["pillow"]
# ///
"""Convierte las láminas de The Zoology of the Voyage of H.M.S. Beagle (datos-crudos/raw) a WebP y escribe src/datos/laminas.json."""
import json
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
meta = json.loads((RAIZ / "datos-crudos/meta.json").read_text())
# Recorte en fracción (izq, arriba, der, abajo) para quitar el lomo del libro o los márgenes vacíos.
RECORTE = {"melanotis": (0.04, 0, 1, 1), "parvulus": (0.03, 0, 1, 1), "trifasciatus": (0.02, 0, 1, 1), "lobo": (0, 0.02, 1, 0.9), "rata": (0, 0, 1, 0.92)}
salida = {}
for k, m in meta.items():
    im = Image.open(RAIZ / f"datos-crudos/raw/{k}.jpg").convert("RGB")
    a, b, c, d = RECORTE.get(k, (0, 0, 1, 1))
    im = im.crop((int(a * im.width), int(b * im.height), int(c * im.width), int(d * im.height)))
    im.thumbnail((760, 1000), Image.LANCZOS)
    im.save(RAIZ / f"public/img/{k}.webp", "WEBP", quality=64, method=6)
    salida[k] = {"w": im.width, "h": im.height, "fichero": m["fichero"], "licencia": m["licencia"]}
(RAIZ / "src/datos/laminas.json").write_text(json.dumps(salida, ensure_ascii=False, indent=1))
print(len(salida))
