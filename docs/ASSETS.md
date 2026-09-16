# Assets fotográficos

Selección para la landing de Mariana Barrera / Zapata Camiones. Contrato final: hero + usos + galería de unidades reales + interiores + accesibilidad + OG (no carrocerías forzadas una-a-una; ver historial de cambios abajo).

## Organización

- Los originales viven en `assets-src/` en la raíz del repo, fuera de `public/`. Esa carpeta está en `.gitignore` y **no se despliega**. Incluye los 73 del lote base (~50 MB) más ~62 archivos que aparecieron después en `public/` a media sesión (duplicados/re-exportados en su mayoría, ver nota abajo) — total ~125 MB.
- `public/` solo contiene `images/` con los derivados finales. Metadatos EXIF/GPS eliminados (`-strip`).
- `du -sh public/` ≈ 2.4 MB.

## Historial de cambios de contrato (para que quede constancia)

1. Contrato original: 16 archivos, 5 de ellos `carroceria-<marca>.webp` forzando una foto por carrocería de venta.
2. El cliente decidió no usar ese enfoque (en una landing de venta, forzar una carrocería específica por foto se lee como stock si no se puede verificar). Se reemplazó por: los 5 nombres de carrocería como **texto**, más una **galería de 6-8 fotos de unidades reales** nombradas por lo que se lee en la foto (`unidad-*.webp`).
3. De los 5 archivos `carroceria-*.webp` originales, el contenido de Beccar y Marcopolo se conservó (solo cambiaron de nombre). Ayco Cosmopolitan y Urviabus se sumaron a la galería. Ayco Zafiro (ver hallazgo abajo) se resolvió con la unidad Sigma OF como `unidad-ayco-sigma-of.webp`, sin afirmar que es "Zafiro".
4. Se agregó `retrato-mariana.webp` para la sección de perfil (no estaba en ningún contrato anterior; ver nota de procedencia abajo).
5. `uso-escolar.webp` y `uso-turismo.webp` se rehicieron: la primera versión usaba la misma unidad Toreto morada que `uso-urbano.webp` y `uso-personal.webp` (Marcopolo, también morado), lo que hacía ver la flota como un solo color. Ahora usan AYCO Sigma OF azul (escolar) y Beccar Urviabus MT blanco tipo coach (turismo), cada uno en un ángulo distinto al ya usado en la galería.

## Identificación de carrocerías

Cada emblema se verificó abriendo la foto real, no se adivinó ninguno.

| Carrocería | Estado | Evidencia visual |
|---|---|---|
| Beccar | Verificado | Wordmark "BECCAR" en el frente de varias unidades blancas (parrilla y/o cofre). |
| Marcopolo | Verificado | Una unidad morada larga muestra ambos wordmarks a la vez: "Torino" (costado superior, cerca del parabrisas) y "Marcopolo" (frente, bajo el parabrisas). Es un Marcopolo Torino. |
| Urviabus | Verificado | Placa interior "Urviabus MT" sobre el tablero y el mismo texto "Urviabus MT" repetido en el costado de la unidad (carrocería Beccar, coach moderno de parabrisas panorámico). El frente también dice "BECCAR": Urviabus MT es un modelo de Beccar, no una marca aparte. |
| Ayco Cosmopolitan | Verificado | Wordmark "AYCO" en la parrilla y script "Cosmopolitan" en el costado superior de la unidad blanca usada como hero. |
| **Ayco Zafiro** | **Verificado tarde, con una advertencia importante** | Se encontró en el lote de ~62 archivos adicionales: wordmark **"Zafiro GT"** en el techo/costado de una minivan-autobús Mercedes-Benz de chasis tipo Sprinter (carrocería más chica, faros redondos, muy distinta a los coaches grandes AYCO/Beccar), con placa de modelo "Z 1040" visible. Se identificaron **dos unidades físicas distintas** con este wordmark (folios `VM089247` y `SM085825`), y **las dos tienen letrero "VENDIDO" pegado al parabrisas en todas las fotos disponibles**. No se revisaron el 100% de los ~62 archivos uno por uno (se hizo escaneo en cuadrícula + verificación dirigida de ~20), así que no puedo garantizar al 100% que no exista un ángulo limpio en el resto, pero no lo encontré en lo que sí revisé. **Decisión pendiente del equipo**: ¿usar una de estas fotos con una leyenda honesta ("unidad vendida, se muestra como referencia de modelo") o dejar Zafiro solo como texto sin foto? No usé ninguna en la galería por defecto, para no mostrar como disponible algo que ya se vendió. |

Adicional: se encontró una unidad corta de Corredor 25 con wordmark "TORETO" (unidad de corredor ya en operación, morada) y, en el lote nuevo, una unidad de exhibición **blanca e impecable** con una placa de especificaciones que literalmente dice "LO916/48 EUROV TORETO MY 2025" — confirma que "Toreto" es una designación de carrocería/versión real sobre chasís Mercedes-Benz. No es ninguna de las 5 carrocerías de venta, pero es contenido real y honesto, usado en la galería por su calidad.

## Descartes por criterio de honestidad/venta

- Una unidad Beccar/Urviabus (folio `TM088026`) tiene "VENDIDO" en casi todos sus ángulos, y en uno aparece el rostro de un trabajador: descartada salvo el único ángulo limpio encontrado (usado en `unidad-urviabus-mt.webp`).
- Un segundo AYCO Sigma OF (`7ed5b460-c885-4490-85c9-8e3e6de5c97b.JPG`, folio `TM088688`) también tiene "VENDIDO" — no se usó. El Sigma OF elegido para `unidad-ayco-sigma-of.webp` se verificó explícitamente limpio antes de usarse.
- Dos unidades "Zafiro GT" (folios `VM089247` y `SM085825`) tienen "VENDIDO" en todas las fotos encontradas — no se usaron (ver tabla de arriba).
- La mejor foto de tres cuartos del Beccar clásico (`3210c388...JPG`) muestra la placa delantera legible; se aplicó un blur localizado solo sobre la placa, el resto de la foto no se tocó.
- Fotos con placas legibles en primer plano sin recorte posible, con "VENDIDO", o con el autobús incompleto se descartaron directamente.

## Tabla de derivados (manifiesto para content.ts)

Formato pedido: `archivo | qué se lee en la foto | alt honesto`

```
hero-1600.webp | "AYCO" en parrilla + "Cosmopolitan" en costado | Autobús Mercedes-Benz AYCO Cosmopolitan blanco, completo, de tres cuartos frente a Zapata Aeropuerto, puerta abierta.
hero-800.webp | mismo original que hero-1600 | Mismo autobús, versión ligera para pantallas pequeñas.
uso-urbano.webp | "TORETO" + "CORREDOR 25" | Autobús urbano morado de Corredor 25 (carrocería Toreto), completo, de tres cuartos, puerta abierta.
uso-personal.webp | "Torino" (Marcopolo, misma unidad que unidad-marcopolo-torino, ángulo trasero) | Autobús Marcopolo Torino morado, de tres cuartos trasero, completo, frente a Zapata Aeropuerto.
uso-escolar.webp | "AYCO" (mismo modelo Sigma OF que unidad-ayco-sigma-of, ángulo trasero distinto) | Autobús Mercedes-Benz AYCO azul, de tres cuartos trasero, completo, patio de nave industrial.
uso-turismo.webp | "Mercedes-Benz" en placa trasera (misma unidad Urviabus MT que unidad-urviabus-mt, ángulo lateral/trasero distinto) | Autobús Mercedes-Benz Beccar Urviabus MT blanco, tipo coach de parabrisas panorámico, vista lateral/trasera completa, interior de nave industrial.
unidad-beccar.webp | "BECCAR" en parrilla | Autobús Mercedes-Benz Beccar blanco, completo, de tres cuartos frontal. Placa delantera difuminada por privacidad.
unidad-marcopolo-torino.webp | "Torino" + "Marcopolo" (ambos legibles) | Autobús Marcopolo Torino morado, completo, de tres cuartos frontal, frente a Zapata Aeropuerto.
unidad-urviabus-mt.webp | "BECCAR" + "Urviabus MT" | Autobús Mercedes-Benz Beccar Urviabus MT blanco, completo, de tres cuartos frontal, interior de nave industrial.
unidad-ayco-cosmopolitan.webp | "AYCO" + "Cosmopolitan" (mismo original que el hero) | Autobús Mercedes-Benz AYCO Cosmopolitan blanco, completo, de tres cuartos, frente a Zapata Aeropuerto.
unidad-ayco-sigma-of.webp | "AYCO" + "Sigma Of" — NO dice "Zafiro" | Autobús Mercedes-Benz AYCO azul, modelo "Sigma OF", completo, de tres cuartos frontal.
unidad-toreto-corredor.webp | "TORETO" + "CORREDOR 25" (mismo original que uso-urbano) | Autobús urbano morado Toreto de Corredor 25, completo, de tres cuartos frontal.
unidad-toreto-showroom.webp | placa de exhibición "LO916/48 EUROV TORETO MY 2025" | Autobús Mercedes-Benz blanco en exhibición de showroom, completo, de tres cuartos frontal, junto a placa de especificaciones.
interior-tela.webp | sin emblema, se describe por tela | Interior de autobús con asientos altos tapizados en tela con patrón geométrico blanco y negro, pasillo completo, barras amarillas.
interior-plastico.webp | sin emblema, se describe por material | Interior de autobús con asientos de plástico duro gris y azul, pasillo completo, barras amarillas, manijas rojas de emergencia.
interior-reclinable.webp | sin emblema, se describe por configuración (misma familia que unidad-urviabus-mt) | Interior de autobús con asientos reclinables de tela azul con patrón geométrico, cinturones de seguridad, cortinas y portaequipaje.
accesibilidad.webp | sin emblema | Espacio interior marcado con pictograma de silla de ruedas pintado en el piso, junto a un asiento abatible, cerca de la puerta. No es una rampa mecánica visible — ajustar copy para no decir "rampa" si no se verifica ese mecanismo.
og.jpg | "Torino" (Marcopolo, mismo original que unidad-marcopolo-torino, recorte lateral) | Autobús Marcopolo Torino morado, vista lateral completa, letrero de agencia Mercedes-Benz al fondo. Ajustado con `contain` sobre fondo #f4f6f7 para no recortar la unidad.
retrato-mariana.webp | N/A (retrato de persona) | Retrato profesional de Mariana Barrera con uniforme Mercedes-Benz/Freightliner frente a fondo de agencia. Ver nota de procedencia abajo — no lo generé yo, confirmar fuente y derechos de uso antes de publicar.
```

Dimensiones: todos los `unidad-*`, `uso-*` y `accesibilidad` son 1200x900. Los `interior-*` son 900x1200. `hero-1600` es 1600x1200, `hero-800` es 800x600, `og.jpg` es 1200x630. `retrato-mariana.webp` es 635x704 (no estaba en el contrato de dimensiones, revisar si content.ts necesita otro tamaño).

## Nota sobre archivos que no generé yo

Durante la sesión, otro proceso (no documentado conmigo directamente) renombró los 5 `carroceria-*.webp` a la convención `unidad-*` y agregó `retrato-mariana.webp` directamente en `public/images/`. Verifiqué por tamaño de archivo en bytes que los 5 renombrados son copias exactas de lo que yo había producido y verificado (mismo contenido, solo cambió el nombre) — sin problema ahí. `retrato-mariana.webp` es contenido nuevo que no verifiqué en origen: la imagen en sí se ve profesional y apropiada (retrato frontal, uniforme de trabajo, sin otras personas), pero no sé de qué archivo de `assets-src/` proviene ni quién lo generó. Antes de publicar, alguien debe confirmar la fuente y que Mariana autorizó el uso de esa foto específica.

## Nota sobre el lote adicional (~62 archivos)

Aparecieron ~62 archivos nuevos directamente en `public/` a media sesión (UUID `.JPG`, `IMG_3514.JPG`, y `PHOTO-2026-02-*.jpg` con fecha de otro lote). Se movieron a `assets-src/`. Por hash, 14 son duplicados exactos de fotos ya catalogadas; muchos otros son re-exportaciones a distinta resolución/compresión de las mismas fotos (mismo encuadre, distinto archivo). Entre el material genuinamente nuevo encontré: la unidad Zafiro GT (ver arriba, la más importante), la unidad de exhibición Toreto blanca con placa de especificaciones, un tercer patrón de tela de interior (grecas azul marino con aves, no usado), y el retrato de Mariana. No se revisó el 100% de los 62 uno por uno — se hizo escaneo visual en cuadrícula de los 62 más verificación dirigida de aproximadamente un tercio.

## Verificación final

- `du -sh public/` → 2.5 MB.
- `ls public/` → solo `images`.
- 19 archivos en `public/images/`: hero x2, uso x4, galería `unidad-*` x7, interior x3, accesibilidad, og.jpg, retrato-mariana. Todos con las dimensiones documentadas arriba (verificado con `magick identify`), EXIF/GPS vacío en todos los que yo generé.
- `du -sh assets-src/` → 125 MB (73 originales del lote base + ~62 del lote adicional, mayormente duplicados).

## Sets de "Autobuses para cada servicio" (hover de 3 fotos)

Encargo: reemplazar cada `uso-*.webp` único por un set `uso-<caso>-1/2/3.webp` (1200x900, misma unidad física en las tres, `-1` obligatoriamente frontal o tres cuartos frontal). Los cuatro `uso-*.webp` viejos se dejan intactos en `public/images/` a propósito — el equipo los quita al cablear el código.

**Resultado: 4 de 4 sets completados**, 12 archivos en total (3 fotos por caso de uso).

### urbano y personal

```
uso-urbano-1.webp | Toreto morada Corredor 25, folio "652400" (visible en el letrero de ruta y en el rótulo del techo), tres cuartos frontal | Autobús Mercedes-Benz Toreto morado, folio 652400, Corredor 25, completo, de tres cuartos frontal, puerta abierta, patio con muro de tabique.
uso-urbano-2.webp | misma unidad 652400, lateral completo | Autobús Mercedes-Benz Toreto morado, folio 652400, Corredor 25, vista lateral completa, patio con espectacular al fondo.
uso-urbano-3.webp | misma unidad 652400, folio visible en el rótulo del techo del pasillo | Interior de autobús recién entregado, folio 652400 visible en el techo, asientos aún con plástico de fábrica, barras tomapies amarillas, pasillo completo.
uso-personal-1.webp | AYCO "Cosmopolitan" (script visible en costado en las otras dos fotos del set), frontal recto | Autobús Mercedes-Benz AYCO blanco, frontal recto, estacionamiento de agencia con letrero "...aeropuerto" al fondo.
uso-personal-2.webp | misma familia AYCO Cosmopolitan, trasera recta, "AYCO" + "Mercedes-Benz" en la defensa | Autobús Mercedes-Benz AYCO blanco, vista trasera completa, nave con techo industrial.
uso-personal-3.webp | interior sin emblema, mismo patio (camioneta blanca y autobús morado visibles por la ventana, consistente con personal-1) | Interior de autobús con asientos de plástico duro gris y azul, barras amarillas, pasillo completo, patio visible por las ventanas.
```

Confianza de "misma unidad": **urbano alta** (folio 652400 legible en las tres fotos). **personal media-alta**: las tres muestran el mismo wordmark "AYCO"/"Cosmopolitan", ninguna tiene VENDIDO, y comparten patio/vehículos de fondo, pero esta carrocería no trae folio visible en ninguna toma, así que no hay un identificador único cruzado como en el resto de las unidades — no lo afirmo con la misma certeza que las demás.

### escolar y turismo

Al revisar sistemáticamente los ~91 originales accesibles de `assets-src/` encontré que las dos unidades sugeridas para estos casos de uso ya se vendieron:

- **AYCO Sigma OF azul, folio `TM088688`**: `058e783d-d23b-4c41-a7d2-995367f46a5b.JPG` y `1f4faf23-5fbd-43e7-bd02-7781e9ee4d93.JPG` muestran el letrero "TM088688 VENDIDO" legible en el parabrisas. `058e783d` es, además, la misma toma exacta (mismo encuadre, misma persona de fondo) que ya está publicada como `public/images/unidad-ayco-sigma-of.webp`, solo recortada para sacar el letrero de cuadro.
- **Beccar/Urviabus MT (carrocería coach), folio `TM088026`**: `25478851-7825-4b2c-968e-3a2360a0789e.JPG`, `43097a99-c40c-42ae-882d-623bf355aab0.JPG` y `c1406fbb-d59f-424a-8736-de57bbb1b315.JPG` muestran el mismo letrero "TM088026 VENDIDO" en el parabrisas (misma nave industrial, camión "Santa Clara" de fondo). El interior `dbb9f2d8-f642-4ae7-9c49-9245c7e1a184.JPG` tiene el letrero reflejado desde dentro. Es la misma nave/sesión que produjo `unidad-urviabus-mt.webp`, `uso-turismo.webp` e `interior-reclinable.webp`.

Consultado el equipo: la regla de excluir "VENDIDO" es de **presentación** (que el letrero no aparezca en cuadro ni reflejado), no de honestidad de inventario — la sección muestra carrocerías que se cotizan sobre pedido, no existencias, así que una unidad ya entregada es una muestra válida del modelo. Con ese criterio (el mismo con el que ya se publicaron `unidad-ayco-sigma-of.webp` y `unidad-urviabus-mt.webp`), sí usé estas dos unidades, eligiendo ángulos donde el letrero no aparece:

```
uso-escolar-1.webp | "Sigma Of" en el costado sobre la puerta (misma unidad, folio TM088688, ángulo sin letrero) | Autobús Mercedes-Benz AYCO azul "Sigma Of", tres cuartos frontal, puerta abierta, patio exterior.
uso-escolar-2.webp | "AYCO" en la defensa trasera, misma unidad | Autobús Mercedes-Benz AYCO azul, vista trasera completa, patio con malla ciclónica y otro vehículo blanco al fondo.
uso-escolar-3.webp | "AYCO" en el techo de la cabina, misma unidad (vista desde dentro hacia el mismo patio de exhibición del Toreto blanco) | Interior de cabina de autobús, tablero y volante, vista hacia el patio de exhibición a través del parabrisas.
uso-turismo-1.webp | "BECCAR" en el frente + "...viabus MT" en el costado (folio TM088026, ángulo sin letrero) | Autobús Mercedes-Benz Beccar Urviabus MT blanco, tres cuartos frontal, puerta abierta, nave industrial.
uso-turismo-2.webp | "Mercedes-Benz" en la carrocería, misma unidad, ángulo lateral/trasero | Autobús Mercedes-Benz Beccar Urviabus MT blanco, vista lateral completa, nave industrial.
uso-turismo-3.webp | sin emblema, misma familia de asientos que la unidad (patrón geométrico azul marino con rojo) | Interior de autobús tipo coach con asientos reclinables de tela azul marino con patrón geométrico, cortinas azules, pasillo completo.
```

Confianza de "misma unidad": alta para ambos sets — folio "TM088688"/"Sigma Of" y "TM088026"/"Urviabus MT" respectivamente confirmados en al menos dos de las tres fotos de cada set, y las tres comparten nave/patio y decoración. `uso-turismo-3` es la excepción: no tiene folio ni emblema visible, se vincula por tela/familia visual, no por identificador único — confianza media para esa tercera foto específicamente (documentado también en el manifiesto de content.ts).

Alternativas que se revisaron y **no se usaron** por falta de material (no por VENDIDO):
- **Beccar "Urbus G4", placa `35-51-XC`** (agencia "Detroit Diesel"/"Cummins"): limpio, en `15a503bf-...JPG` (frontal recto) y `3210c388-...JPG` (ya usado en `unidad-beccar.webp`). Sin ángulo lateral/trasero/interior propio en el resto del material — se dejó fuera de estos dos sets.
- **Toreto blanco de showroom, folio `TM087471 DISPONIBLE`**: su único frontal (`toreto-showroom-3q.jpg` / `2965d02a-...JPG`) ya es exactamente `unidad-toreto.webp`; solo hay además una foto de puerta/escalones (`eee98f44-...JPG`) y una de la placa de especificaciones, sin lateral.
- De paso, sin buscarlos, se confirmaron dos folios "Zafiro GT" vendidos ya documentados arriba (`VM089247` en `af0a9137...JPG`/`f308da25...JPG`, `SM085825` en `67bdbca4...JPG`/`5a43cc34...JPG`) y un tercer Beccar vendido con rostro identificable de un trabajador (`PM078989`, en `de54ec7c...JPG`/`ed7e78b8...JPG`) — estos si se descartaron, por VENDIDO+rostro, no por criterio de presentación.

## Nota de procedencia: Ayco Zafiro GT

`unidad-ayco-zafiro-gt.webp` es la **única imagen de la galería que no proviene del material fotográfico de la clienta**. La carrocería Zafiro GT no aparece en ninguno de los 135 originales, así que la imagen se tomó de la cobertura de prensa del lanzamiento conjunto de Mercedes-Benz y AYCO (2021). Es una imagen de producto del fabricante, no una unidad fotografiada en el patio de Zapata.

Implicaciones que el equipo debe tener presentes:

- Los derechos pertenecen al fabricante. Lo correcto es sustituirla por el material oficial que Mercedes-Benz o AYCO entregan a sus distribuidores, o por una foto propia de Mariana en cuanto tenga una unidad Zafiro GT en piso.
- Se procesó con `contain` sobre el fondo del sitio (`#f4f6f7`) para conservar la unidad completa, igual que la imagen Open Graph.
- El texto alternativo describe solo lo que se ve y no afirma que la unidad esté disponible en inventario.

Las otras cinco imágenes de la galería sí son fotografías reales del material de la clienta, con la carrocería verificada leyendo el emblema en la propia foto.

