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

Primero ejecuta el chequeo estático, y luego coordina con implementation para
que no haya otro build corriendo:

```bash
QA_OUTPUT_DIR=/private/tmp/mariana-qa/evidence \
  QA_TOOLING_DIR=/private/tmp/mariana-qa \
  node scripts/qa-static.mjs

npm run typecheck
npm run lint
npm run build
```

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
canonical y Open Graph cuando se proporciona `QA_EXPECT_SITE_URL`, JSON-LD y
FAQ visible, teléfono, correo, WhatsApp, Facebook y TikTok. En el formulario de
consulta prueba el estado vacío, prepara un href de WhatsApp en memoria con
nombre, uso y detalle, y comprueba que editar un campo reinicia ese estado. No
hace clic en el enlace final de WhatsApp ni abre un compositor externo.

Para probar el fallback sin dominio, ejecuta la build sin `SITE_URL` ni
`NEXT_PUBLIC_SITE_URL` y deja `QA_EXPECT_SITE_URL` vacío. El HTML debe omitir
canonical y `og:url`, nunca sustituirlos por localhost. Para probar el helper
con un dominio reservado, haz una build temporal con
`NEXT_PUBLIC_SITE_URL=https://example.com`, ejecuta el runtime con
`QA_EXPECT_SITE_URL=https://example.com`, y no dejes esa variable en la
configuración de publicación.

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
