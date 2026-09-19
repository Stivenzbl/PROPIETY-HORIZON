# 🏠 Propiety Horizon

> Monorepo para la aplicación de gestión de propiedad horizontal (condonios). Frontend Next.js App Router + Backend Express API.

---

## 🚀 Comandos principales

    pnpm dev               # Frontend Next.js en desarrollo
    pnpm server:dev        # Backend Express en desarrollo
    pnpm build             # Build completo con Turborepo
    pnpm start             # Start del frontend

---

## 🏗️ Arquitectura del Monorepo

```
┌─────────────────────────────────────┐
│    Frontend SPA (Next.js App)       │
│   /app /pages/*                     │
│   Contextos: Auth, Toast           │
│   ━━━━━━━━━━━━━━━━━━━━━━━━ → /api  │
└───────────┬─────────────────────────┘
            │ http://localhost:3000
            ▼
       ┌──────────────────┐
       │Express Server    │ ◄─── pnpm server:dev
       │   Node.js API    │     pnpm server:start
       │   Socket.IO      │
       └──────┬───────────┘
              │
              ▼
         MongoDB + Mongoose
```

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 15, React 20, TailwindCSS 4.0, TypeScript 5.9 |
| Backend | Node.js 20, Express 5, Mongoose |
| Testing | Vitest + Testing Library |
| DB | MongoDB |

---

## 📂 Estructura del repositorio

```
PROPIETY-HORIZON/
├── frontend/          → Next.js SPA (App Router)
│   └── src/
│       ├── pages/     # Autenticación: login, register
│       ├── context/   # AuthContext, ToastContext, BuildingContext
│       └── components/ui/  # Button, Modal, PropertyCard, SearchBar
├── server/            → Express API Server + Socket.IO
├── backend/           → Prisma Schema (Zod schemas definidos aquí)
└── docs/AI_CONTEXT.md # Protocolo de continuidad del equipo
```

---

## 🧪 Testing y validación

```bash
pnpm test        # Run tests con Vitest
pnpm typecheck   # Type checking global
```

---

## 📋 Funcionalidades implementadas

- 🔐 Autenticación (login / registro con JWT + sessions)
- 🏠 Gestión de propiedades y unidades
- 👥 Administración de personas (inquilinos, administradores)
- 🛒 Gestión de órdenes / pedidos
- 📞 Notificación en tiempo real (Socket.IO)
- 🎨 UI/UX con TailwindCSS + componentes reutilizables

---

## 👤 Equipo

Stiven Blasco & Team — Propiety Horizon Team

🔗 [vazio.github.io](https://vazio.github.io)

---

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*
