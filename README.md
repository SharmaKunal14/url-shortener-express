# URL Shortner using Express

The main focus of this project was to get a brush up on express and to familiarize myself with the following technologies:

- Redis
- Prometheus
- Grafana
- Custom Metrics
- docker compose

The main aim was to implement monitoring of the APIs, learn about cusotm metrics and how to setup alerts using Grafana.

To run the project, you need to perform the following steps:

- Find the private IP of your system. You can do this by running **ifconfig** in the terminal
- Replace the private IP in the **prometheus.yml** file with your own private IP
- Run the following command
  ```
  docker compose build --no-cache
  docker compose up
  ```
