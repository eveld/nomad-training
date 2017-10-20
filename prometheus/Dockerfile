FROM prom/prometheus:0.19.2

ENV CONSUL_ADDR="consul:8500"
ENV CONSUL_TAGS="stats"

COPY entrypoint.sh /bin/entrypoint.sh

ENTRYPOINT ["/bin/entrypoint.sh"]
CMD ["-config.file=/etc/prometheus/prometheus.yml", \
     "-storage.local.path=/prometheus", \
     "-web.console.libraries=/etc/prometheus/console_libraries", \
     "-web.console.templates=/etc/prometheus/consoles"]
