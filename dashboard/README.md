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
            icon: "ChefHat", // lucide-vue-next icon name
            lights: ["light.kitchen_light_1"],
            switches: [],
        },
    ],
};
```

No component changes needed, the room card and its tiles are generated automatically.

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
