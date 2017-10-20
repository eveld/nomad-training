#!/bin/sh
cat > /fluentd/etc/fluent.conf <<EOF
<source>
  @type tail
  path ${NOMAD_ALLOC_DIR}/logs/*.0
  refresh_interval 10
  pos_file ${NOMAD_TASK_DIR}/fluentd.pos
  format none
  tag ${NOMAD_TASK_NAME}
</source>

<filter **>
  @type record_modifier
  <record>
    alloc_id ${NOMAD_ALLOC_ID}
    alloc_name ${NOMAD_ALLOC_NAME}
  </record>
</filter>

<match **>
  @type elasticsearch
  host elasticsearch.service.consul
  port 9200
  index_name logs
  logstash_format true
  type_name fluentd
</match>
EOF

exec fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT --use-v1-config
