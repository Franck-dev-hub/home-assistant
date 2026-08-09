# Dashboard

Home-made dashboard for Home Assistant (Vue 3 + Vite), designed to be simple and easy to read day to day rather than
technical. Groups entities by room, with a light/dark theme (toggle button in the header), served in an iframe within
HA's "Dashboard" view.

## Architecture

The dashboard never talks directly to the Home Assistant API: it goes through [`dashboard-proxy`](../dashboard-proxy), a
small Node service that keeps the HA token server-side. The token is therefore never exposed to the browser.

```
browser -> dashboard (nginx) -> dashboard-proxy (Node) -> Home Assistant
```

## Adding a room / entity

Everything lives in `config.js` (not versioned, gitignored):

```js
export const config = {
    GREETING_NAME: "",
    ROOMS: [
        {
            id: "kitchen",
            name: "Kitchen",
            icon: "ChefHat", // @tabler/icons-vue icon name
            // Tile order here is display order - reorder freely to control layout.
            tiles: [
                {type: "light", id: "light.kitchen_light_1"},
                {type: "switch", id: "switch.kitchen_outlet"},
            ],
        },
    ],
};
```

No component changes needed, the room card and its tiles are generated automatically.

### Custom tiles

A tile can also be `{type: "custom", component: "someKey"}`. Each custom integration is self-contained under
`src/js/customs/<someKey>/`:

```
src/js/customs/
    registry.js              # maps component key -> Vue component, imported by RoomCard.vue
    index.js                 # auto-discovers every customs/*/config.js (import.meta.glob)
    printer/
        config.js             # not versioned, gitignored - real entity ids/URLs
        components/
        composables/
        api/
        constants/
```

To add a new custom tile type:

1. Create `src/js/customs/<name>/config.js` exporting your config object (gitignored automatically, see root
   `.gitignore`). Set `category: "light" | "switch"` and a `powerSwitch` entity id if it should count toward the
   summary totals.
2. Build the tile/modal components under `src/js/customs/<name>/`, importing the config directly
   (e.g. `import {PRINTER} from "../config.js"` from within `customs/printer/api/getPrinter.js`).
3. Register the tile component in `src/js/customs/registry.js`.
4. Reference it in a room's `tiles` with `{type: "custom", component: "<name>"}`.

Nothing else needs to change, dashboard/config.js and main.js stay generic.

## Local development

```bash
pnpm install
pnpm dev
```

Serves on `http://localhost:3000` with hot reload, against the real `dashboard-proxy`/HA (so toggles are real, test on
non-critical entities).

## Deployment

From the repo root:

```bash
make build/dashboard
```

Builds the image (nginx + static assets) and restarts the container. See the [root README](../README.md) for the rest of
the stack.
