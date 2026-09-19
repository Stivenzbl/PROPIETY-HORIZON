# Claude Code local

Trabaja con Qwen local mediante el proxy de Ollama. La conversacion no es la memoria principal del proyecto.

## Continuidad para jornadas largas

- Lee `AGENTS.md` y `docs/AI_CONTEXT.md` al comenzar.
- Busca con `rg` y abre solo archivos relevantes; no cargues el repositorio completo.
- Mantente conciso y no pegues archivos completos ni logs enormes.
- Divide el trabajo en hitos y actualiza `docs/AI_CONTEXT.md` al terminar cada hito.
- Antes de continuar despues de una compactacion, usa la memoria persistente y el estado real de Git.
- Usa Bash para ejecutar comandos reales. No inventes resultados ni simules llamadas a herramientas.

## Git

- Antes de modificar o subir cambios, ejecuta `git status`, revisa el diff y confirma la rama actual.
- Cuando el usuario pida publicar cambios, verifica `git remote -v`, prepara un commit descriptivo y ejecuta `git push origin <rama>`.
- Si Git solicita autenticacion, detente y muestra el mensaje exacto; no inventes credenciales.
- Nunca hagas `reset --hard`, borres ramas o fuerces un push sin una orden explicita.

## Memoria

La fuente persistente es `docs/AI_CONTEXT.md`. Mantenerla por debajo de unas 1.500 palabras con objetivo, decisiones, archivos relevantes, pruebas, bloqueos y proxima accion.
