import client, { register } from "prom-client";
import express from "express";
import cors from "cors";
import api from "./routes/api.js";
import responseTime from "response-time";
import { requestResponseTime } from "./utils/customMetrics.js";

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.use(express.json());
app.use(cors());
app.use(
  responseTime((req, res, time) => {
    requestResponseTime
      .labels({
        method: req.method,
        path: req.url,
        statusCode: res.statusCode,
      })
      .observe(time);
  })
);
app.use("/v1", api);
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

export default app;
