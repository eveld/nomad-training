<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Metrics

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Metrics are **valuable** for every organisation. Whether they are **performance metrics**, **business metrics** or other metrics, they all **give insight** in the running of your infrastructure and applications.

Some of the uses of metrics are:
- See when things will go / go / did go wrong
- Correctly size your infrastructure and save costs
- Find bottlenecks / problems and solve them
- Optimisation of applications

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Statsite & Statsd
Nomad agents can send metrics to a **statsd** or **statsite** server. Turn it on by specifying a **telemetry** section in the agent configuration.
<pre>
telemetry <span class="bracket">{</span>
  statsd_address = <span class="value">"localhost:8125"</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Configure a **statsd_address** in the Nomad agent configuration. Use the **internal** IP address of the node ('ifconfig eth0') and port **9125**.

Run the **statsd.nomad** job and **prometheus.nomad** job to grab the metrics that we are exposing with Nomad and Consul. **Find the address** where Prometheus is listening and **view the metrics** in the browser.

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/agent/telemetry.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<img style="box-shadow: 0 0 30px rgba(0,0,0,0.4);" src="/img/prometheus.png"/>
