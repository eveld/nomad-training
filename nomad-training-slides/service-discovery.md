<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Service Discovery

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Nomad schedules workloads of various types across a cluster of generic hosts. Because of this, **placement is not known in advance** and you will need to **use service discovery** to **connect tasks** to other services deployed across your cluster.

Nomad integrates with **Consul** to provide **service discovery** and **monitoring**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
By **default** Nomad will try to connect to a **local Consul agent** (on 127.0.0.1:8500). If it fails it will **periodically retry**.

To specify a different endpoint use the **consul.address** client option.

<pre>
client <span class="bracket">{</span>
  options <span class="bracket">{</span>
    consul.address = <span class="bracket">"127.0.0.1:8500"</span>
    consul.ssl = <span class="bracket">false</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
The service block in a Task definition defines a service which Nomad will **register with Consul**.

**Multiple service blocks** are allowed in a Task definition, which allow **registering multiple services** for a Task that **exposes multiple ports**.

<pre>
service <span class="bracket">{</span>
  name = <span class="value">"${TASKGROUP}-redis"</span>
  tags = [<span class="value">"global"</span>, <span class="value">"cache"</span>]
  port = <span class="value">"db"</span>
  check <span class="bracket">{</span>
    name = <span class="value">"alive"</span>
    type = <span class="value">"tcp"</span>
    interval = <span class="value">"10s"</span>
    timeout = <span class="value">"2s"</span>
  <span class="bracket">}</span>
  check <span class="bracket">{</span>
    type = <span class="value">"script"</span>
    name = <span class="value">"check_redis"</span>
    command = <span class="value">"/usr/local/bin/check_redis_status"</span>
    args = [<span class="value">"--verbose"</span>]
    interval = <span class="value">"60s"</span>
    timeout = <span class="value">"5s"</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Add a **service block** to the PAAS Monitor that exposes the **http port** to other services. Use a simple **TCP check** to monitor health of the added service.

**NOTE**: Use **paas-monitor** as service name for it to work :(

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/jobspec/servicediscovery.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<img style="box-shadow: 0 0 30px rgba(0,0,0,0.4);" src="/img/service-discovery.png"/>
