<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Jobs

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Jobs can be written in either **HCL** or **JSON**, but the format that you use needs to match the method of submitting jobs.
**HCL** jobs are submitted from the command line using the **Nomad CLI**.
<pre>
nomad run <span class="value">myjob.nomad</span>
</pre>

Jobs written in **JSON** are sent with a **POST** to the **HTTP endpoint** of a Nomad server.
<pre>
curl -X POST http://<span class="value">myserver</span>:4646/v1/jobs @<span class="value">myjob.json</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
The primary objects are the **job**, **task group**, and **task**. Each job file has **only a single job**, however a job may have **multiple task groups**, and each task group may have **multiple tasks**.

The **task driver** is specified that should be used to run the task.
<pre>
job <span class="value">"example"</span> <span class="bracket">{</span>
    datacenters = [<span class="value">"dc1"</span>]
    group <span class="value">"cache"</span> <span class="bracket">{</span>
      task <span class="value">"redis"</span> <span class="bracket">{</span>
        driver = <span class="value">"docker"</span>
        config <span class="bracket">{</span> ... <span class="bracket">}</span>
        resources <span class="bracket">{</span> ... <span class="bracket">}</span>
      <span class="bracket">}</span>
    <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<img src="/img/docker.png"/>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
**Docker** allows you to **package** an application with all of its **dependencies** into a **standardized unit** (*images*) for software development.

These images can be **shared** with others by pushing them to the **Docker Hub**, a cloud-based **registry**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Docker images can be **configured at runtime** by passing **environment variables** into the container and using them in the **entrypoint**.

In order for your application to be **reachable**, you need to **map** the ports on the **host** to the **exposed ports** on the inside of the container.

It is necessary to **version your Docker images**, other than latest. This way Nomad can **see the changes** to the job and **update** appropriately.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
The **Docker image** is specified together with the **version** and the resources that the task needs to run such as **CPU**, **Memory**, **Disk space** and **Network**.
<pre>
config <span class="bracket">{</span>
  image = <span class="value">"redis:latest"</span> <span class="comment"># so versioning like this is not what you'd want to do ..</span>
<span class="bracket">}</span>
</pre>
<pre>
resources <span class="bracket">{</span>
  cpu = <span class="value">500</span> <span class="comment"># in MHz, defaults to 100</span>
  memory = <span class="value">256</span> <span class="comment"># in MB, defaults to 300</span>
  network <span class="bracket">{</span>
    mbits = <span class="value">10</span> <span class="comment"># in MBits, no default and is required!</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
We will be showcasing Nomad with the help of the **PAAS Monitor** application.
**Create a job** for the application with the **following specifications** and **run it**.

- **xebia/paas-monitor** image from the Docker hub
- PAAS Monitor version 1.0.0
- 100 CPU
- 128 Memory
- 10 Network
- All datacenters (europe-west1-b, europe-west1-c, europe-west1-d)

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/jobspec/index.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
We can obtain the **status** of the just launched job by calling the status command and passing in the **job name**.
<pre>
nomad status <span class="value">paas-monitor</span>
</pre>
<pre>
ID          = paas-monitor
Name        = paas-monitor
Type        = service
Priority    = 50
Datacenters = europe-west1-b, europe-west1-c, europe-west1-d
Status      = running
Periodic    = false

<span class="bracket">==></span> <span class="comment">Evaluations</span>
<span class="comment">ID        Priority  Triggered By    Status</span>
61804b68  50        job-register    complete

<span class="bracket">==></span> <span class="comment">Allocations</span>
<span class="comment">ID        Eval ID   Node ID   Task Group    Desired  Status</span>
<span class="value">631d5654</span>  61804b68  254941af  paas-monitor  run      running
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
The **allocation ID**, highlighted in the previous slide, is used to get information about the allocation.
<pre>
nomad alloc-status <span class="value">631d5654</span>
</pre>
<pre>
ID            = 631d5654
Eval ID       = 61804b68
Name          = paas-monitor.paas-monitor[0]
Node ID       = 254941af
Job ID        = paas-monitor
Client Status = running

<span class="bracket">==></span> <span class="comment">Task Resources</span>
<span class="comment">Task: "paas-monitor"</span>
<span class="comment">CPU  Memory MB  Disk MB  IOPS  Addresses</span>
500  256        300      0     

<span class="bracket">==></span> <span class="comment">Task "paas-monitor" is "running"</span>
<span class="comment">Recent Events:</span>
<span class="comment">Time                   Type      Description</span>
05/06/16 12:03:40 UTC  Started   Task started by client
05/06/16 12:03:36 UTC  Received  Task received by client
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
To **deal with** application/environment **failures** or an increase in **traffic**, **multiple instances** of the **taskgroups** can be scheduled by setting the **count** property.

<pre>
group <span class="value">"cache"</span> <span class="bracket">{</span>
  count = <span class="value">5</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
If a job needs to be running on **all nodes**, set the type to use the **system scheduler**. Nomad will then ensure the job runs on all nodes that match the constraints.

<pre>
job <span class="value">"example"</span> <span class="bracket">{</span>
	type = <span class="value">"system"</span> <span class="comment"># defaults to service</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Make the PAAS Monitor highly available by running **5 instances** of it.

It is **idempotent** to run the **same job** specification again and **no new allocations** will be created if there are **no changes**.

<pre>
nomad run <span class="value">paas.nomad</span>
</pre>
<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/jobspec/index.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
With the job **status** command we can see that it is running **5 times** spread over the nodes.
<pre>
ID          = paas-monitor
Name        = paas-monitor
Type        = service
Priority    = 50
Datacenters = europe-west1-b, europe-west1-c, europe-west1-d
Status      = running
Periodic    = false

<span class="bracket">==></span> <span class="comment">Evaluations</span>
<span class="comment">ID        Priority  Triggered By  Status</span>
94c57b78  50        job-register  complete
3a1d3b66  50        job-register  complete
34ca4ce3  50        job-register  complete
9bbbf82e  50        job-register  complete
61804b68  50        job-register  complete

<span class="bracket">==></span> <span class="comment">Allocations</span>
<span class="comment">ID        Eval ID   Node ID   Task Group    Desired  Status</span>
bb5cb024  94c57b78  39e92960  paas-monitor  run      <span class="value">running</span>
0a6bd802  3a1d3b66  18626aed  paas-monitor  run      <span class="value">running</span>
954e6325  3a1d3b66  913763b4  paas-monitor  run      <span class="value">running</span>
78d38c48  9bbbf82e  476746ac  paas-monitor  run      <span class="value">running</span>
631d5654  9bbbf82e  254941af  paas-monitor  run      <span class="value">running</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
**Constraints** can be specified at the job, task group, or task level to **restrict where a task is eligible for running**. A constraint consists of an **attribute**, a **value** and an **operator** to compare the two.

Placing the **constraint** at both the **job** level **and** at the **taskgroup** level **is redundant** since when placed at the job level, the constraint will be applied to all task groups.

<pre>
constraint <span class="bracket">{</span>
  attribute = <span class="value">"${attr.kernel.name}"</span>
  operator = <span class="value">"is"</span> <span class="comment"># defaults to equality where =, == and is are equivalent</span>
  value = <span class="value">"linux"</span>
<span class="bracket">}</span>
</pre>

!SUB
Some of the allocations were placed on the **control nodes**, instead of the application farm.
<pre>
$ nomad status paas-monitor
<span class="comment">ID        Eval ID   Node ID   Task Group    Desired  Status</span>
bb5cb024  94c57b78  39e92960  paas-monitor  run      running
0a6bd802  3a1d3b66  18626aed  paas-monitor  run      running
954e6325  3a1d3b66  <span class="value">913763b4</span>  paas-monitor  run      running
78d38c48  9bbbf82e  <span class="bracket">476746ac</span>  paas-monitor  run      running
631d5654  9bbbf82e  254941af  paas-monitor  run      running
</pre>
<pre>
$ nomad node-status
<span class="comment">ID        DC              Name                  Class   Drain  Status</span>
18626aed  europe-west1-b  default-farm-01-xmu1  &lt;none&gt;  false  ready
39e92960  europe-west1-c  default-farm-01-buib  &lt;none&gt;  false  ready
6e7a14eb  europe-west1-d  default-farm-01-e29q  &lt;none&gt;  false  ready
254941af  europe-west1-d  default-farm-01-o7vn  &lt;none&gt;  false  ready
b584435b  europe-west1-b  default-farm-01-6eqz  &lt;none&gt;  false  ready
e76406d1  europe-west1-d  default-nomad-02      &lt;none&gt;  false  ready
<span class="value">913763b4</span>  europe-west1-c  default-nomad-01      &lt;none&gt;  false  ready
<span class="bracket">476746ac</span>  europe-west1-b  default-nomad-03      &lt;none&gt;  false  ready
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
To help restrict placement to certain Nodes, they can be logically grouped by class with the **node_class** property

<pre>
client <span class="bracket">{</span>
  node_class = <span class="value">"app"</span>
  ...
<span class="bracket">}</span>
</pre>

Add a node class to every Nomad agent to put the Nomad server nodes and farm nodes into **separate classes**.

Restart the agent to make the configuration effective.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
To make sure the PAAS Monitor is **not** running on the **server** machines, constrain it to **only** run on machines of the **farm** node class.

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/jobspec/index.html#constraint) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
To make your application **reachable** from the outside we need to set up the networking of the job so the **ports are exposed** and **forwarded** correctly to the application.

Keep in mind that a **port is a resource** and there is **only one of each** on every machine.

<pre>
config <span class="bracket">{</span>
  port_map <span class="bracket">{</span>
    db = <span class="value">6379</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

<pre>
resources <span class="bracket">{</span>
  network <span class="bracket">{</span>
    mbits = <span class="value">10</span>
    port <span class="value">"db"</span> <span class="bracket">{</span><span class="bracket">}</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Set up the networking for the PAAS Monitor with a port called **http** that maps container **port 80** as a dynamically allocated port.

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/jobspec/networking.html) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
After setting up the networking, the **allocation** should show the **address** where the application can be reached.
<pre>
ID            = 631d5654
Eval ID       = 61804b68
Name          = paas-monitor.paas-monitor[0]
Node ID       = 254941af
Job ID        = paas-monitor
Client Status = running

<span class="bracket">==></span> <span class="comment">Task Resources</span>
<span class="comment">Task: "paas-monitor"</span>
<span class="comment">CPU  Memory MB  Disk MB  IOPS  Addresses</span>
500  256        300      0     <span class="value">http: 10.240.0.10:80</span>

<span class="bracket">==></span> <span class="comment">Task "paas-monitor" is "running"</span>
<span class="comment">Recent Events:</span>
<span class="comment">Time                   Type      Description</span>
05/06/16 12:03:40 UTC  Started   Task started by client
05/06/16 12:03:36 UTC  Received  Task received by client
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<img style="box-shadow: 0 0 30px rgba(0,0,0,0.4);" src="/img/paas-monitor.png"/>

!SLIDE
<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Lunch Break

!SLIDE
<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Jobs

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Very few tasks are immune to failure. **Restart policies** instruct Nomad to **keep** the task **running** through transient failures.

After a specified **delay** Nomad will **attempt** to restart the tasks a specified number of **times**, at a specified **interval**.

<pre>
group <span class="value">"cache"</span> <span class="bracket">{</span>
  <span class="comment"># after an initial delay of 25 seconds, restart 10 times per 5 minutes</span>
  restart <span class="bracket">{</span>
    attempts = <span class="value">10</span>
    interval = <span class="value">"5m"</span>
    delay = <span class="value">"25s"</span>
    mode = <span class="value">"delay"</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Make sure that in case of failure, the PAAS Monitor will be restarted **every 10 seconds**, after an initial **delay of 10 seconds**.

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/jobspec/index.html#attempts) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
At the top right of the PAAS Monitor is a **switch** that **kills** the PAAS Monitor when turned **off** and tries to **reconnect** to the backend when turned back **on**.

Nomad should **restart** the application and the PAAS Monitor will **recover**, with **new information**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Job definitions are **not static**, and are meant to be updated over time. Modified job specifications can be run by **pushing** the **updated version** of the job to Nomad, which will **stop the old tasks** and **start new tasks**.

The update strategy can be configured, but **rolling updates** makes it easy to upgrade an application at large scale with minimal to **no downtime**.
<pre>
job <span class="value">"example"</span> <span class="bracket">{</span>
  update <span class="bracket">{</span>
    stagger = <span class="value">"10s"</span> <span class="comment"># delay between sets of task updates</span>
    max_parallel = <span class="value">1</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Set up the PAAS Monitor to perform a **rolling update** that updates an instance **every 5 seconds**.

Then switch to **version 2.0.0** of the PAAS Monitor.

<br/>
<span style="font-size: 70%">Check the [Documentation](https://www.nomadproject.io/docs/jobspec/index.html#update) for more information.</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<img style="box-shadow: 0 0 30px rgba(0,0,0,0.4);" src="/img/paas-monitor-v2.png"/>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
A map of key/value representing **environment variables** are passed along to the running process, which can be used for **configuration**.

These are only defined **once the task has been placed** on a particular node and as such can **not** be used in **constraints**.
<pre>
task <span class="value">"redis"</span> <span class="bracket">{</span>
  env <span class="bracket">{</span>
    REDIS_USER = <span class="value">"redis"</span>
    REDIS_PASSWORD = <span class="value">"loremipsum"</span> <span class="comment"># it would be better to get this from Vault instead</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Jobs can also specify additional **metadata** at the job, task group, or task level. This metadata is opaque to Nomad and can be used for **any purpose**, including defining **constraints** on the metadata.

These values can be then used in the running process by reading the **NOMAD_META_MYKEY** environment variable.

<pre>
meta <span class="bracket">{</span>
  MYKEY = <span class="value">"abc"</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Environment variables are interpreted and can contain both **runtime** and **node attributes**.
<pre>
env <span class="bracket">{</span>
  DC = <span class="value">"Running on datacenter ${node.datacenter}"</span>
  VERSION = <span class="value">"Version ${NOMAD_META_VERSION}"</span>
<span class="bracket">}</span>

meta <span class="bracket">{</span>
  VERSION = <span class="value">"v1.0.0"</span>
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Besides the **builtin** node attributes Nomad also supports **user defined** attributes, which can be set in the client configuration.

<pre>
client <span class="bracket">{</span>
  meta <span class="bracket">{</span>
    altname = <span class="value">"hilarious heisenberg"</span>
  <span class="bracket">}</span>
<span class="bracket">}</span>
</pre>

Add unique node meta data to one or more of your nodes.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
To get the full list of **attributes** in the PAAS Monitor, we need to fill **environment variables** with [attributes](https://www.nomadproject.io/docs/jobspec/interpreted.html).

Add environment variables for the available attributes and use the following **naming convention**.
<pre>
node.unique.id -&gt; <span class="value">NODE_UNIQUE_ID</span>
node.meta.altname -&gt; <span class="value">NODE_META_ALTNAME</span>
attr.arch -&gt; <span class="value">ATTR_ARCH</span>
</pre>
