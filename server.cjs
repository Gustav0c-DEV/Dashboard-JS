const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || (process.argv.includes("--dev") ? 3001 : 3000);
const API_BASE = "https://apidadosabertos.saude.gov.br/sisvan/estado-nutricional";

app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "dist")));

// Proxy same-origin: evita que o navegador bloqueie a leitura por CORS.
app.get("/api/sisvan", async (req, res) => {
  try {
    const allowed = ["uf", "limit", "offset", "ano", "ano_referencia",
                     "competencia", "municipio", "fase_vida", "sexo"];
    const params = new URLSearchParams();

    for (const key of allowed) {
      const value = req.query[key];
      if (typeof value === "string" && value.trim() !== "") {
        params.set(key, value.trim());
      }
    }

    // Valores conservadores para a primeira consulta.
    if (!params.has("uf")) params.set("uf", "PR");
    if (!params.has("limit")) params.set("limit", "20");
    if (!params.has("offset")) params.set("offset", "0");

    const url = `${API_BASE}?${params.toString()}`;
    console.log(`[SISVAN] GET ${url}`);

    const upstream = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(30000)
    });

    const body = await upstream.text();
    res.status(upstream.status);
    res.set("Content-Type", upstream.headers.get("content-type") || "application/json; charset=utf-8");
    res.send(body);
  } catch (error) {
    console.error("[SISVAN] Falha na consulta:", error.message);
    res.status(502).json({
      error: "Não foi possível consultar a API do SISVAN.",
      detail: error.name === "TimeoutError" ? "A API demorou para responder." : error.message
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "NutriData", node: process.version });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`NutriData disponível em http://localhost:${PORT}`);
  console.log("Para encerrar, pressione Ctrl + C.");
});