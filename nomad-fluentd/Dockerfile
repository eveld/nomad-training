FROM fluent/fluentd:v0.12.26

RUN echo "gem: --user-install --no-document" >> ~/.gemrc
ENV PATH /home/fluent/.gem/ruby/2.3.0/bin:$PATH
ENV GEM_PATH /home/fluent/.gem/ruby/2.3.0:$GEM_PATH
RUN gem install fluent-plugin-elasticsearch
RUN gem install fluent-plugin-record-modifier

USER root
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
