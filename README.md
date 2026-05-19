# Laboratorio SO — Autenticación con Google OAuth 2.0

## Andres Felipe Ospina Bautista 
## David Leonardo Aguirre Sanchez

## Descripción

Aplicación web desarrollada como laboratorio de la asignatura de Sistemas Operativos, que implementa un sistema de autenticación utilizando Google Identity Services (GSI) y el protocolo OAuth 2.0 con OpenID Connect. La app permite a los usuarios iniciar sesión con su cuenta de Google de forma segura, sin que la aplicación gestione ni almacene contraseñas.

---

## Tecnologías utilizadas

- **HTML5 / CSS3 / JavaScript** — sin frameworks adicionales
- **Google Identity Services (GSI)** — librería oficial de Google para autenticación
- **OAuth 2.0 + OpenID Connect** — protocolo de autorización y capa de identidad
- **JWT (JSON Web Token)** — formato del token de identidad emitido por Google
- **GitHub Pages** — plataforma de despliegue

---

## Estructura del proyecto

```
├── index.html       # Estructura principal de la interfaz
├── styles.css       # Estilos con tema oscuro (inspirado en GitHub)
└── script.js        # Lógica de autenticación con Google GSI
```

---

## Flujo de autenticación

```
Usuario → Tu app → Google (OAuth 2.0) → JWT → Perfil mostrado
```

1. El usuario hace clic en **"Continuar con Google"**
2. La app inicializa GSI con el `Client ID` y abre el popup de Google
3. Google verifica las credenciales y emite un **JWT firmado**
4. La app decodifica el payload del token con `atob()`
5. Se extraen `name`, `email` y `picture` del usuario
6. Se muestra la tarjeta de perfil y se oculta el formulario

---

## Configuración

### 1. Crear credenciales en Google Cloud Console

1. Ir a [console.cloud.google.com](https://console.cloud.google.com)
2. Crear un proyecto nuevo
3. Navegar a **APIs y Servicios → Credenciales**
4. Crear un **ID de cliente OAuth 2.0** de tipo *Aplicación web*
5. Agregar el dominio en **Orígenes autorizados de JavaScript**:
   - Desarrollo: `http://localhost` o `http://127.0.0.1:5500`
   - Producción: `https://tu-usuario.github.io`

### 2. Insertar el Client ID

En `script.js`:

```javascript
const CLIENT_ID = 'TU_CLIENT_ID.apps.googleusercontent.com';
```

En `index.html`:

```html
<div id="g_id_onload"
  data-client_id="TU_CLIENT_ID.apps.googleusercontent.com"
  data-callback="handleCredentialResponse"
  data-auto_prompt="false">
</div>
```

---

## Seguridad

| Aspecto | Implementación |
|---|---|
| Contraseñas | Google las gestiona, la app nunca las ve |
| Token | JWT firmado digitalmente por Google |
| Origen | Validado contra lista blanca en Google Cloud |
| Formulario de correo | Deshabilitado — solo se permite acceso con Google |

<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/a1fb83f1-b1ad-4288-9065-8e5365eef916" />

