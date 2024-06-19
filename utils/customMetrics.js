import client from "prom-client";

const requestResponseTime = new client.Histogram({
  name: "http_request_response_time",
  help: "This metric tells us about the total time taken by a request-response cycle",
  labelNames: ["method", "path", "statusCode"],
  buckets: [1, 10, 20, 30, 50, 70, 100, 200, 400, 800, 1600],
});

export { requestResponseTime };
