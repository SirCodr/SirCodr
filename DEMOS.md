# Portfolio y demos para negocios

El portfolio presenta el trabajo. Cada demo ofrece una experiencia independiente para mostrar a posibles clientes.

## Estructura acordada

```text
portfolio/
  src/                    Portfolio actual (Astro, servidor, Clerk)
  public/                 Recursos del portfolio
  demos/
    cavaliere/
      src/
        components/       Elementos propios de la barbería
        layouts/          Documento y metadatos
        pages/            Rutas de la demo
        scripts/          Movimiento y carga de reservas
        styles/           Identidad visual aislada
      public/             Imágenes, fuentes y favicon
      package.json        Dependencias y comandos independientes
      package-lock.json
      CREDITS.md           Procedencia de recursos
  package.json            Comandos del portfolio y accesos a las demos
```

Un repositorio, varias aplicaciones. No hace falta mover el portfolio ni introducir un orquestador de builds. Cada demo instala y bloquea sus dependencias; no importa componentes, autenticación ni estilos del portfolio. Extraer una demo para un cliente debe ser posible copiando su carpeta.

Los recursos compartidos se extraerán solo cuando exista una reutilización real. Las marcas conservan su diseño propio.

## Desarrollo local

Para instalaciones nuevas de Cavaliere, usar Node.js 22.19 o superior (requisito de una dependencia de Astro). El portfolio mantiene su configuración actual.

```powershell
npm --prefix demos/cavaliere ci
npm run dev:cavaliere
npm run check:cavaliere
npm run build:cavaliere
```

Portfolio: `npm run dev` para desarrollo con recarga en caliente; `npm run preview` genera y sirve una compilación local en `http://127.0.0.1:4321`. Para esta previsualización local se usa el adapter Node; `npm run build` mantiene el adapter de Vercel para publicación. Cavaliere corre por separado en `http://localhost:4322`. Cada aplicación tiene un servidor independiente.

## Publicación prevista

No hay dominio propio todavía. Mantener el proyecto Vercel actual del portfolio y crear otro para Cavaliere desde el mismo repositorio:

| Ajuste | Portfolio | Cavaliere |
| --- | --- | --- |
| Root Directory | `.` | `demos/cavaliere` |
| Framework | Astro | Astro |
| Install Command | Actual | `npm ci` |
| Build Command | Actual | `npm run build` |
| Output Directory | Actual | `dist` |
| Variables | Actuales | Ninguna |

Vercel asignará la URL disponible al crear el proyecto. No se presupone que un nombre concreto esté libre. En el futuro, se asignará un subdominio del dominio propio a cada proyecto, sin cambiar rutas ni código de la demo.

La galería futura vivirá en `/webs`; cada caso, en `/webs/<slug>`, con enlace a la URL pública de su demo y contacto contextual. Esta primera entrega se centra en Cavaliere; la galería no está implementada.

## Secuencia

1. Cavaliere: landing, entrada del poste, navegación móvil y agenda embebida.
2. Verificar diseño, movimiento y Bookitit en navegador.
3. Ajustar el concepto con el usuario.
4. Crear el proyecto Vercel y conectar la demo a la futura galería.

La configuración de proyectos, dominios y DNS no forma parte de los cambios locales.

Referencias técnicas: https://vercel.com/docs/monorepos y https://vercel.com/docs/domains/working-with-domains/add-a-domain.
