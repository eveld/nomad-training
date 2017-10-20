FROM scratch

ADD assets assets
ADD bin/nomad-paas-monitor-linux-amd64 paas-monitor
EXPOSE 80

ENTRYPOINT ["/paas-monitor"]
