# Paperclip plugins

A pnpm workspace for independently packaged Paperclip plugins. The starter is generated from the official Paperclip scaffolder and uses the published SDK pinned to `2026.1001.0`.

## Development

Requires Node.js 24.11+ and pnpm (the repo pins pnpm 10.28.2).

```sh
corepack enable
pnpm install
pnpm check
pnpm dev
```

`pnpm dev` watches the starter and rebuilds its manifest, worker, and React dashboard widget. In a second terminal, with your Paperclip instance running and its CLI available:

```sh
paperclipai plugin install /Users/cedricziel/private/code/paperclip-plugins/plugins/starter
paperclipai plugin inspect paperclip-plugin-starter
```

Paperclip reloads the worker when built output changes. Optional UI development server: `pnpm dev:ui` (port 4177); configure `devUiUrl` in Paperclip for that server.

## Starter behavior

- Observes `issue.created` and stores an issue-scoped `seen` flag.
- Provides a health data handler and a ping action.
- Renders a dashboard health widget.
- Includes SDK harness tests for the event, data, and action handlers.

## Adding plugins

Copy `plugins/starter` to a new folder under `plugins/`. Change the package name and manifest ID, display name, description, and capabilities. Each plugin owns its entrypoints and dependencies. Root checks discover all workspace plugins automatically.

Keep the root workspace private. Starter packages are private until intentionally prepared for publishing. For a release, set the plugin package's `private` to `false`, choose its name/version/license, build it, inspect `pnpm pack`, then publish that package individually. No repository license is selected yet.

## References

- [Local plugin development](https://github.com/paperclipai/paperclip/blob/master/doc/plugins/LOCAL_PLUGIN_DEVELOPMENT.md)
- [Plugin authoring guide](https://github.com/paperclipai/paperclip/blob/master/doc/plugins/PLUGIN_AUTHORING_GUIDE.md)
