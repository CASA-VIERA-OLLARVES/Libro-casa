# Libro Casa Viera Ollarves — puesta en marcha

Esta app funciona por su cuenta: la página vive en GitHub Pages y los datos en tu propio proyecto de Firebase (plan gratuito). No depende de Claude.

Archivos de esta carpeta:

- `index.html` — la app (no hace falta tocarla)
- `firebase-config.js` — acá pegás los datos de tu proyecto de Firebase (paso 4)
- `firestore.rules` — las reglas de seguridad para pegar en Firebase (paso 3)
- `LEEME.md` — este archivo

IMPORTANTE: el archivo `datos-iniciales-septiembre-2026.json` tiene tus montos. Es solo para importar en la app (paso 7). NO lo subas nunca a GitHub.

## Paso 1 — Crear el proyecto en Firebase

1. Entrá a https://console.firebase.google.com con una cuenta de Google.
2. "Crear un proyecto" → nombre: `libro-casa` → desactivá Google Analytics → Crear.

## Paso 2 — Activar el ingreso con correo y clave

1. Menú "Compilación" → Authentication → "Comenzar".
2. Pestaña "Método de acceso" → "Correo electrónico/contraseña" → activar la primera opción → Guardar.
3. Pestaña "Usuarios" → "Agregar usuario": tu correo y la clave que quieras. Si querés que Josse también entre, agregala igual.
4. En la lista de usuarios aparece una columna "UID de usuario". Copiá el tuyo (y el de Josse) para el paso siguiente.
5. Opcional: Authentication → Configuración → "Acciones del usuario" → desactivá "Habilitar la creación (registro)". Las reglas de abajo ya protegen los datos, pero así nadie puede ni crear cuentas.

## Paso 3 — Crear la base de datos y las reglas

1. Menú "Compilación" → Firestore Database → "Crear base de datos".
2. Ubicación: `southamerica-east1` (São Paulo). Modo: "producción". Crear.
3. Pestaña "Reglas": borrá lo que hay y pegá el contenido de `firestore.rules`.
4. En ese texto, reemplazá `PEGAR_UID_DE_JORGE` y `PEGAR_UID_DE_JOSSELY` por los UID reales (con las comillas simples). Si entra una sola persona, borrá la línea que sobra.
5. "Publicar".

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

Si dice "Tu usuario no tiene permiso", la propia pantalla te muestra tu ID de usuario: copialo en las reglas (paso 3) y publicá de nuevo.

## Paso 7 — Traer tus datos actuales

1. En la pantalla "Todavía no hay datos" tocá "Importar respaldo (.json)".
2. Elegí `datos-iniciales-septiembre-2026.json`.
3. Listo: septiembre 2026 con todos tus montos. Desde ahí, "Nuevo mes" arma el siguiente.

## Uso diario

- Resumen → Herramientas → "Descargar respaldo": hacelo de vez en cuando y guardalo en un lugar seguro.
- Podés agregar la app a la pantalla de inicio del celular desde el menú del navegador.
- Para que entre otra persona: crear su usuario en Authentication y agregar su UID a las reglas.

## Si querés cambiar algo más adelante

Todo el código está en `index.html`. Volvé a subir el archivo a GitHub (Add file → Upload files, mismo nombre) y se actualiza solo.
