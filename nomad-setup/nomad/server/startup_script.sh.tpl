#!/bin/bash

set -e

ADDR=$(ifconfig eth0 | grep -oP 'inet addr:\K\S+')

writeNomadServerConfig() {
  cat > /etc/nomad.d/local.hcl << EOF
datacenter = "sys1"

leave_on_interrupt = false
leave_on_terminate = false

advertise {
  # We need to specify our host's IP because we can't
  # advertise 0.0.0.0 to other nodes in our cluster.
  rpc = "$ADDR:4647"
  serf = "$ADDR:4648"
}

client {
  servers = ["${stack}-nomad-01:4647", "${stack}-nomad-02:4647", "${stack}-nomad-03:4647"]
  node_class = "system"
}

server {
  enabled = true

  # Startup.
  bootstrap_expect = 3

  # Scheduler configuration.
  num_schedulers = 1

  # join other servers
  retry_join = [ "${stack}-nomad-01", "${stack}-nomad-02", "${stack}-nomad-03" ]
}

telemetry {
  statsite_address = "localhost:8125"
}
EOF
}

writeConsulServerConfig() {
  cat > /etc/consul.d/server.json << EOF
{
  "client_addr": "0.0.0.0",
  "leave_on_terminate": true,
  "ui": true,
  "dns_config": {
    "allow_stale": false
  },
  "advertise_addr": "$ADDR",
  "statsite_addr": "localhost:8125",
  "server": true,
  "retry_join": [ "${stack}-nomad-01", "${stack}-nomad-02", "${stack}-nomad-03" ],
  "bootstrap_expect": 3
}
EOF
}

writeNomadServerConfig
writeConsulServerConfig
