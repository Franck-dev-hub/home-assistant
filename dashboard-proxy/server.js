import express from "express";

const HA_URL = process.env.HA_URL;
const HA_TOKEN = process.env.HA_TOKEN;

if (!HA_URL || !HA_TOKEN) {
    throw new Error("HA_URL and HA_TOKEN must be set");
}

const HEADERS = {
    "Authorization": `Bearer ${HA_TOKEN}`,
    "Content-Type": "application/json",
};

const ALLOWED_SERVICES = {
    light: ["turn_on", "turn_off"],
    switch: ["turn_on", "turn_off"],
};

const app = express();
app.use(express.json());

app.get("/states", async (_req, res) => {
    const response = await fetch(`${HA_URL}/api/states`, {headers: HEADERS});
    const data = await response.json();
    res.status(response.status).json(data);
});

app.post("/services/:domain/:service", async (req, res) => {
    const {domain, service} = req.params;
    if (!ALLOWED_SERVICES[domain]?.includes(service)) {
        return res.status(403).json({error: "Service not allowed"});
    }

    const response = await fetch(`${HA_URL}/api/services/${domain}/${service}`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
});

const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () => {
    console.log(`dashboard-proxy listening on ${port}`);
});
