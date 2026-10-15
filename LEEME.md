# Libro Casa Viera Ollarves — puesta en marcha

Esta app funciona por su cuenta: la página vive en GitHub Pages y los datos en tu propio proyecto de Firebase (plan gratuito). No depende de Claude.

Archivos de esta carpeta:

- `index.html` — la app (no hace falta tocarla)
- `firebase-config.js` — acá pegás los datos de tu proyecto de Firebase (paso 4)
- `firestore.rules` — las reglas de seguridad para pegar en Firebase (paso 3)
- `LEEME.md` — este archivo

IMPORTANTE: el archivo `datos-iniciales-septiembre-2026.json` tiene tus montos. Es solo para importar en la app (paso 7). NO lo subas nunca a GitHub.

## Varias familias, un solo Firebase

La app ahora soporta varias familias a la vez, cada una con sus datos
completamente separados ("hogares" de hasta 2 personas cada uno). No hace
falta crear un Firebase nuevo por familia: todos usan el mismo proyecto
(`libro-casa-30df2`) y el mismo link, como si bajaran una app.

**Cómo entra una familia nueva:**
1. Vos le das un código de invitación (ver abajo).
2. Esa persona entra al link de siempre, toca "¿No tenés cuenta? Creá una",
   pone correo, clave y ese código → se crea su hogar, aislado del resto.
3. La app le muestra un código de hogar (distinto) en Resumen → "Tu hogar".
   Si tiene pareja, ella se crea SU cuenta usando ESE código y queda en el
   mismo hogar, viendo los mismos datos.

**Cómo creás un código de invitación para una familia nueva** (consola de
Firebase → tu proyecto → Firestore Database → pestaña "Datos"):
1. Si todavía no existe, creá una colección llamada `invites`.
2. "Agregar documento" → en "ID del documento" escribí el código que le vas
   a dar (ej: `FAMILIA-PEREZ`, en mayúsculas, sin espacios).
3. Agregá un campo: nombre `usado`, tipo **boolean**, valor `false`.
4. Guardar. Ese código ya sirve una sola vez, para crear un hogar nuevo.

**Tu propio libro (el que ya tenías):** como vos ya tenías datos cargados
antes de este cambio, cuando entres de nuevo la app va a decir "Falta
vincular tu cuenta" con un botón **"Migrar mi libro anterior"**. Tocalo una
vez y tus meses pasan solos al nuevo sistema, sin que tengas que cargar
nada de nuevo. Después de migrar, en `firestore.rules` podés borrar el
bloque "Libro anterior" (está marcado con un comentario), aunque dejarlo no
hace daño: solo te sigue dando acceso a vos a esos datos viejos.

## Paso 1 — Crear el proyecto en Firebase

1. Entrá a https://console.firebase.google.com con una cuenta de Google.
2. "Crear un proyecto" → nombre: `libro-casa` → desactivá Google Analytics → Crear.

## Paso 2 — Activar el ingreso con correo y clave

1. Menú "Compilación" → Authentication → "Comenzar".
2. Pestaña "Método de acceso" → "Correo electrónico/contraseña" → activar la primera opción → Guardar.
3. Pestaña "Usuarios" → "Agregar usuario": tu correo y la clave que quieras. Si querés que Josse también entre, agregala igual.
4. En la lista de usuarios aparece una columna "UID de usuario". Copiá el tuyo (y el de Josse) para el paso siguiente.
5. Dejá **habilitada** la opción "Habilitar la creación (registro)" en Authentication → Configuración → "Acciones del usuario". Ahora la usa la propia app para que cada familia nueva se cree su cuenta (ver la sección "Varias familias" más abajo) — no la desactives.

## Paso 3 — Crear la base de datos y las reglas

1. Menú "Compilación" → Firestore Database → "Crear base de datos".
2. Ubicación: `southamerica-east1` (São Paulo). Modo: "producción". Crear.
3. Pestaña "Reglas": borrá lo que hay y pegá el contenido de `firestore.rules` tal cual está (ya no hace falta reemplazar ningún UID a mano: las reglas nuevas separan a cada familia sola, por "hogar").
4. "Publicar".

## Paso 4 — Copiar la configuración

1. Engranaje (arriba a la izquierda) → "Configuración del proyecto".
2. En "Tus apps" tocá el ícono `</>` (Web) → poné un apodo → "Registrar app" (sin Firebase Hosting).
3. Te muestra un bloque `firebaseConfig`. Copiá `apiKey`, `authDomain`, `projectId` y `appId`.
4. Abrí `firebase-config.js` con el Bloc de notas y pegá esos cuatro valores, entre comillas, en lugar de `PEGAR_AQUI`. Guardá.

Esos valores no son secretos. Lo que protege tus datos son las reglas del paso 3.

## Paso 5 — Subir a GitHub

1. En tu cuenta de GitHub → "New repository" → nombre: `libro-casa` → Public → Create.
   (Tiene que ser Public para usar GitHub Pages gratis. No pasa nada: el repositorio no tiene ningún dato tuyo.)
2. "uploading an existing file" → arrastrá `index.html`, `firebase-config.js` y `LEEME.md` (podés dejar afuera `firestore.rules`) → "Commit changes".
3. Settings → Pages → "Deploy from a branch" → Branch: `main` / carpeta `/ (root)` → Save.
4. Esperá uno o dos minutos. La dirección queda: https://TU-USUARIO.github.io/libro-casa/

## Paso 6 — Primer ingreso

Abrí la dirección, entrá con tu correo y tu clave. Si aparece "dominio no autorizado": Firebase → Authentication → Configuración → "Dominios autorizados" → agregá `TU-USUARIO.github.io`.

Como ya tenías datos cargados de antes, te va a aparecer "Falta vincular tu
cuenta" con el botón "Migrar mi libro anterior" (ver la sección "Varias
familias" más arriba) — tocalo una vez y listo.

## Paso 7 — Restaurar un respaldo (opcional)

Si en algún momento tenés un archivo de respaldo `.json` (bajado desde
Resumen → Herramientas), lo volvés a subir desde "Importar respaldo (.json)"
— sirve para restaurar o para pasar datos entre hogares.

## Uso diario

- Resumen → Herramientas → "Descargar respaldo": hacelo de vez en cuando y guardalo en un lugar seguro.
- Podés agregar la app a la pantalla de inicio del celular desde el menú del navegador, o instalarla como app (botón "⬇ Instalar app" en Chrome/Edge, Windows o Android).
- Para que entre tu pareja: Resumen → "Tu hogar" → copiá el código y que se cree su cuenta con ese código.
- Para invitar a otra familia: creale un código en `invites` (ver "Varias familias" más arriba).

## Si querés cambiar algo más adelante

Todo el código está en `index.html`. Volvé a subir el archivo a GitHub (Add file → Upload files, mismo nombre) y se actualiza solo.
