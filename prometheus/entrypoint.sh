#!/bin/sh
cat > /etc/prometheus/prometheus.yml <<EOF
global:
  scrape_interval:     10s
  evaluation_interval: 10s

  external_labels:
      monitor: 'monitoring'

scrape_configs:
  - job_name: 'prometheus'
    target_groups:
      - targets: ['localhost:9090']
  - job_name: consul
    consul_sd_configs:
      - server: '${CONSUL_ADDR}'
        services: [${CONSUL_TAGS}]
EOF

exec /bin/prometheus $@
