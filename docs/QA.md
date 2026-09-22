# QA de la landing

La verificación visual y funcional se ejecuta sobre la exportación estática. No
se agregan Playwright, Lighthouse ni axe a `package.json` de producción.

## Preparar tooling temporal

Con Node y npm disponibles, instala las herramientas fuera del repositorio:

```bash
QA_DIR=/private/tmp/mariana-qa
mkdir -p "$QA_DIR"
npm install --prefix "$QA_DIR" --cache /tmp/mariana-qa-npm-cache \
  playwright lighthouse chrome-launcher
```

Chrome usado por defecto:

```text
/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

Se puede cambiar con `QA_CHROME_EXECUTABLE`. Si Playwright necesita una ruta
distinta, se puede cambiar con `QA_TOOLING_DIR`; no se escribe en este proyecto.

## Ejecutar comprobaciones fuente y build

Ejecuta las revisiones de código y genera la exportación. El build ejecuta
automáticamente `seo:check` sobre el HTML y los assets finales:

```bash
npm run typecheck
npm run lint
QA_OUTPUT_DIR=/private/tmp/mariana-qa/evidence npm run build
```

`npm run seo:check` permite repetir la revisión sobre `out/` sin reconstruir.
No instala herramientas ni usa la red. Comprueba canonical, rastreabilidad,
metadatos, identidad, enlaces internos, JSON-LD, coherencia de FAQ, imágenes,
sitemap, 404 y el archivo de headers de Cloudflare.

Este proyecto usa `output: "export"`. La salida que debe medirse es `out/`.
`next start` no sirve la exportación estática; sirve `out/` con un servidor
estático, por ejemplo:

```bash
python3 -m http.server 4173 --directory out
```

## Playwright: viewports, estados y evidencia

En otra terminal, con el servidor estático activo:

```bash
QA_BASE_URL=http://127.0.0.1:4173 \
QA_OUTPUT_DIR=/private/tmp/mariana-qa/evidence \
QA_TOOLING_DIR=/private/tmp/mariana-qa \
node scripts/qa-runtime.mjs
```

El script visita la home en 1440, 1024, 390, 320 y 768 px; toma hero y página
completa en claro, oscuro y `prefers-reduced-motion`; y escribe:

- `runtime-report.json`
- PNG de primera vista y full page por viewport y modo

También comprueba overflow horizontal, imágenes completas y `alt`, fuente
cargada, title/description/H1, ausencia de em dash, no URLs localhost,
canonical y Open Graph del dominio de producción, JSON-LD y
FAQ visible, teléfono, correo, WhatsApp, Facebook y TikTok. En el formulario de
consulta prueba el estado vacío; con nombre, uso y detalle comprueba que el envío
abre WhatsApp en el mismo clic (el script reemplaza `window.open` para registrar la
URL sin salir a un compositor externo), que queda un enlace de respaldo por si el
navegador bloquea la pestaña, y que editar un campo reinicia ese estado.

La identidad canónica permanece en `https://marianabarrera.com/` incluso si
el entorno contiene `SITE_URL` o `NEXT_PUBLIC_SITE_URL` de un preview. Para
comprobar esta protección se puede ejecutar:

```bash
NEXT_PUBLIC_SITE_URL=https://preview.example.invalid \
SITE_URL=http://localhost:3000 npm run build
```

El navegador recorre la página para activar las imágenes diferidas y vuelve
al inicio antes de capturar. También visita sin JavaScript y comprueba que
el contenido no quede oculto por las animaciones. Un `alt=""` es válido para
imágenes decorativas como el logo que está dentro de un enlace con nombre accesible.
El servidor Python no aplica `_headers`: esa configuración se verifica con el
runtime de Cloudflare o después de publicar, sin confundirla con QA de HTML.

## Lighthouse móvil

Lighthouse solo se ejecuta contra `out/` servido estáticamente, nunca contra
`next dev`:

```bash
QA_BASE_URL=http://127.0.0.1:4173 \
QA_OUTPUT_DIR=/private/tmp/mariana-qa/evidence \
QA_TOOLING_DIR=/private/tmp/mariana-qa \
node scripts/qa-lighthouse.mjs
```

El JSON conserva las categorías Performance, Accessibility, Best Practices y
SEO, las métricas FCP/LCP/TBT/CLS/SI/TTI y los audits que requieran atención.

## Criterios de aceptación

- La landing compila con `typecheck`, `lint` y `build` limpios.
- No hay overflow horizontal en ninguno de los cinco viewports, claro/oscuro,
  ni movimiento obligatorio para leer o accionar la página.
- El hero desktop cabe en la primera vista, con un solo H1 y hasta dos líneas;
  los botones caben en una línea y mantienen contraste.
- Todas las imágenes cargan, tienen `alt` verdadero y las nuevas fotos no
  rompen el layout.
- El menú móvil abre, sus enlaces tienen destino, y `Escape` lo cierra.
- Las preguntas frecuentes operan con Enter y Space.
- WhatsApp usa `https://wa.me/525550071752` y el mensaje prellenado de
  `site.defaultWhatsAppMessage`; teléfono, correo y ambas redes usan los datos
  confirmados.
- Solo existe un JSON-LD, el FAQ coincide con preguntas y respuestas visibles,
  y los datos no inventan precios, stock, cobertura logística, ratings o
  especificaciones.
- Lighthouse se reporta desde el servidor estático de `out/`; los scores de
  desarrollo no cuentan como evidencia de producción.

## Reporte

Conservar los JSON y PNG de `/private/tmp/mariana-qa/evidence` para revisión
visual. Un reporte parcial debe indicar exactamente qué viewport, modo,
interacción o métrica no se ejecutó. “Verde” solo significa que esa parte fue
probada.
