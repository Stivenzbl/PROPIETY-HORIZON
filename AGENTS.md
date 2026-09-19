# Contexto de trabajo

Este repositorio se trabaja con un modelo local de 32k de contexto. La conversacion no es la memoria principal del proyecto.

## Reglas

- Lee `docs/AI_CONTEXT.md` al comenzar una tarea.
- Busca primero con `rg` y abre solo los archivos relevantes; no cargues todo el repositorio en el prompt.
- Antes de una tarea grande, revisa el estado de Git y las pruebas disponibles.
- Mantén los cambios pequenos y verificables.
- No borres ni reemplaces cambios existentes sin una razon clara.
- Ejecuta la prueba o comprobacion mas cercana despues de cada cambio importante.
- Actualiza `docs/AI_CONTEXT.md` cuando cambien decisiones, rutas, comandos, contratos o el estado de la tarea.
- Mantente conciso: no pegues archivos completos ni salidas enormes; resume y enlaza rutas concretas.
- Divide las jornadas largas en hitos. Al terminar cada hito, actualiza la memoria persistente antes de seguir.
- Si la tarea cambia de objetivo, registra el objetivo nuevo en la memoria antes de editar codigo.

## Continuidad

Cuando la conversacion se compacte, trata `docs/AI_CONTEXT.md` y el estado real del repositorio como fuente de verdad. Si falta informacion, inspecciona los archivos antes de asumirla.

## Protocolo de jornada larga

1. Al iniciar, lee `docs/AI_CONTEXT.md` y comprueba `git status`.
2. Trabaja en un solo objetivo pequeno por bloque.
3. Tras completar una parte funcional, registra archivos cambiados y pruebas ejecutadas.
4. Usa `/checkpoint` antes de cambiar de funcionalidad o cuando la conversacion ya tenga mucho historial.
5. Si la compactacion ocurre, continua desde la memoria persistente y el codigo; no intentes reconstruir todo el chat.
