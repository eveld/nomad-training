<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Configuration

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
A production setup of Nomad requires configuration. This mostly happens via **config files**, and some options can be set via **command line parameters** too. Specify config locations as follows:

<pre>
nomad agent <span class="value">-config common.conf -config /etc/nomad.d/ -config extra.json</span>
</pre>

This will read the config files in **given order**. When specifying a directory Nomad will only read files in that directory ending in **.hcl** or **.json**, in **alphabetical order**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Nomad supports configuration in both **HCL** (Hashicorp Configuration Language) and **JSON** format.

**Functionally both are equivalent**, but HCL is easier to read and write by humans.

<pre>
<span class="comment"># I like comments</span>
some_key = <span class="value">"somevalue"</span>
some_section <span class="bracket">{</span>
  speed = <span class="value">100</span>
  some_array = [<span class="value"> "first", 2, true </span>]
<span class="bracket">}</span>
</pre>

!SUB
  <!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# General Options

<pre>
<span class="comment"># Location</span>
region = <span class="value">"europe"</span>
datacenter = <span class="value">"west1-d"</span>

name = <span class="value">"bastiaan-nomad-01"</span>

<span class="comment"># Storage</span>
data_dir = <span class="value">"/var/local/nomad"</span>

<span class="comment"># Logging</span>
enable_syslog = <span class="value">true</span>
syslog_facility = <span class="value">"LOCAL0"</span>
log_level = <span class="value">"INFO"</span>

<span class="comment"># Phone home</span>
disable_update_check = <span class="value">false</span>
disable_anonymous_signature = <span class="value">false</span>

<span class="comment"># Clustering</span>
leave_on_interrupt = <span class="value">false</span>
leave_on_terminate = <span class="value">false</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Networking
Depending on its **role** Nomad wants to listen on **one or more TCP and UDP ports**.

<br/>
<table style="font-size: 70%;">
<thead>
  <tr>
    <td>**Name**</td><td>**Port**</td><td>**Server**</td><td>**Client**</td><td>**Purpose**</td>
  </tr>
</thead>
<tbody>
  <tr><td colspan="5">&nbsp;</td></tr>
  <tr>
    <td>http</td><td>4646</td><td style="text-align:center;">&check;</td><td style="text-align:center;">&check;</td><td>HTTP API</td>
  </tr>
  <tr><td colspan="5">&nbsp;</td></tr>
  <tr>
    <td>rpc</td><td>4647</td><td style="text-align:center;">&check;</td><td style="text-align:center;">&cross;</td><td>Internal RPC communication between clients and servers, and Raft consensus protocol.</td>
  </tr>
  <tr><td colspan="5">&nbsp;</td></tr>
  <tr>
    <td>serf</td><td>4648</td><td style="text-align:center;">&check;</td><td style="text-align:center;">&cross;</td><td>Gossip protocol for cluster membership (both TCP and UDP).</td>
  </tr>
</tbody>
</table>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
By default Nomad will bind to **127.0.0.1**, to interact with other Nomad Agents we have to specify the **bind_addr**.

<pre>
bind_addr = <span class="value">1.2.3.4</span> <span class="comment"># default 127.0.0.1</span>
</pre>

Specifying **0.0.0.0** is valid, but requires some extra configuration.

<pre>
advertise <span class="bracket">{</span>
  <span class="comment"># Only needed if different from bind_addr</span>
  http = <span class="value">"5.6.7.8:4646"</span>
  rpc = <span class="value">"5.6.7.8:4647"</span>
  serf = <span class="value">"5.6.7.8:4648"</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Server Options
<pre>
server <span class="bracket">{</span>
  enabled = <span class="value">true</span>

  <span class="comment"># server clustering</span>
  bootstrap_expect = <span class="value">3</span>
  retry_join = [ <span class="value">"nomad4", "nomad5"</span> ]
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Configure the Nomad Server Agent on **yourname**-nomad-01, with config file(s) in the  **/etc/nomad.d/** directory. Use the following values in your configuration.
- Your name as region name
- Google availability zone (e.g. **europe-west1-b**) as data center name

<br/>
When ready, start the Agent.
<pre>
service nomad start
</pre>

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/agent/config.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Check the **agent info**, **server members**, **log output**  (/var/log/syslog). If all is correct, repeat the configuration for **server 2 and 3**.

<br/>
**NOTE**: For your convenience **NOMAD_ADDR** already is configured to point to the private IP address of the VM.

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/commands/index.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Client

<pre>
client <span class="bracket">{</span>
  enabled = <span class="value">true</span>

  servers = [<span class="value">"nomad-01:4647", "nomad-02:4647", "nomad-03:4647"</span>]

  network_interface = <span class="value">"eth0"</span>
  network_speed = <span class="value">1000</span>
<span class="bracket">}</span>

leave_on_interrupt = <span class="value">true</span>
leave_on_terminate = <span class="value">true</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Nomad can **reserve** a portion of the nodes **resources** from being used when placing tasks.

<pre>
reserved <span class="bracket">{</span>
    cpu = <span class="value">500</span>
    memory = <span class="value">512</span>
    disk = <span class="value">1024</span>
    reserved_ports = <span class="value">"22,80,8500-8600"</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->

```
options = {
  "driver.raw_exec.enable" = "1"
  ...
}
```

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Configure the Nomad client agent on **yourname**-farm-01, with config file(s) in the  **/etc/nomad.d/** directory. Use the following values in your configuration.
- Your name as region name
- Google availability zone (e.g. **europe-west1-b**) as data center name

<br/>
When ready, start the Agent.
<pre>
service nomad start
</pre>

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/agent/config.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Check the **agent info**, **node status**, **log output**  (/var/log/syslog). If all is correct, repeat the configuration for **client 2**.

Finally enable client mode for the **Nomad servers** as well.

<br/>
**NOTE**: For your convenience **NOMAD_ADDR** already is configured to point to the private IP address of the VM.

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/commands/index.html) for more information.</span>
