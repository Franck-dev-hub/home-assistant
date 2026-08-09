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

A tile can also be `{type: "custom", component: "someKey"}`, resolved against the registry in
`src/js/constants/customCards.js`  
Used for entities that need richer UI than a simple light/switch toggle (e.g. the 3D printer tile: power switch, live
temps/progress/camera feed, opens a modal with a link to Fluidd).  
Add a new key to the registry and its config block (see `PRINTER` in `config.js`) to add another custom tile type.

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
