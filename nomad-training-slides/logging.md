<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Logging

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
We have already seen that the Nomad agent logs its own events to the syslog facility of the host.

Nomad also provides uniform support for logging of the **stdout** and **stderr** of the **tasks** it runs.
It keeps separate log files per task, that can be limited in size and are not mixed with host logging.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Accessing logs
The logs can be accessed in multiple ways:
- From the **same taskgroup**:<br/>${NOMAD_ALLOC_DIR}/logs

- From the **same node**:<br/>/var/local/nomad/alloc/${NOMAD_ALLOC_ID}/alloc/logs

- From your **log aggregator service** with help of a side car task

- From **anywhere** with the Nomad API or CLI

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Nomad fs
The **nomad fs** command provides three subcommands to query the contents of the Allocation directories:

- **ls** lists the specified directory
- **stat** stats the specified file
- **cat** outputs the contents of the specified file


!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
First determine the **allocation id**.
<pre>
nomad status <span class="value">example</span>
</pre>
<pre>
ID          = example
Name        = example
Type        = service
Priority    = 50
Datacenters = bastiaan-europe-west1-d,bastiaan-europe-west1-c
Status      = running
Periodic    = false

<span class="bracket">==&gt;</span> <span class="comment">Evaluations</span>
<span class="comment">ID        Priority  Triggered By  Status</span>
1887659a  50        job-register  complete

<span class="bracket">==&gt;</span> <span class="comment">Allocations</span>
<span class="comment">ID        Eval ID   Node ID   Task Group  Desired  Status</span>
<span class="value">73473c6f</span>  1887659a  d818189f  cache       run      running
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
With that allocation id it is possible to list the log directory, which is found at the **alloc/logs** path.
<pre>
nomad fs ls <span class="value">73473c6f</span> alloc/logs
</pre>
<pre>
<span class="comment">Mode        Size    Modfied Time           Name</span>
-rw-r--r--  0 B     09/06/16 10:00:09 UTC  <span class="value">redis.stderr.0</span>
-rw-r--r--  5.7 kB  09/06/16 10:57:48 UTC  <span class="value">redis.stdout.0</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Then we can output the contents of the log file.
<pre>
nomad fs cat 73473c6f <span class="value">alloc/logs/redis.stdout.0</span>
</pre>
<pre>
<span class="comment">docker/8ff314[434]:</span><span class="bracket">                 _._                     </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">            _.-``__ ''-._                </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">       _.-``    `.  `_.  ''-._           </span>Redis 3.2.0 (00000000/0) 64 bit
<span class="comment">docker/8ff314[434]:</span><span class="bracket">   .-`` .-```.  ```\/    _.,_ ''-._      </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">  (    '      ,       .-`  | `,    )     </span>Running in standalone mode
<span class="comment">docker/8ff314[434]:</span><span class="bracket">  |`-._`-...-` __...-.``-._|'` _.-'|     </span>Port: 6379
<span class="comment">docker/8ff314[434]:</span><span class="bracket">  |    `-._   `._    /     _.-'    |     </span>PID: 1
<span class="comment">docker/8ff314[434]:</span><span class="bracket">   `-._    `-._  `-./  _.-'    _.-'      </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">  |`-._`-._    `-.__.-'    _.-'_.-'|     </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">  |    `-._`-._        _.-'_.-'    |     </span>      http://redis.io        
<span class="comment">docker/8ff314[434]:</span><span class="bracket">   `-._    `-._`-.__.-'_.-'    _.-'      </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">  |`-._`-._    `-.__.-'    _.-'_.-'|     </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">  |    `-._`-._        _.-'_.-'    |     </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">   `-._    `-._`-.__.-'_.-'    _.-'      </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">       `-._    `-.__.-'    _.-'          </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">           `-._        _.-'              </span>                             
<span class="comment">docker/8ff314[434]:</span><span class="bracket">               `-.__.-'                  </span>                             
<span class="comment">docker/8ff314[434]:</span>

...
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Nomad Executor Logs
To troubleshoot startup problems, it can be useful to check the **Nomad task executor** log files.

<pre>
nomad fs cat 73473c6f <span class="value">redis/redis-executor.out</span>
</pre>
<pre>
<span class="comment">10:00:09 [</span><span class="bracket">DEBUG</span><span class="comment">]</span> sylog-server: launching syslog server on addr: /tmp/plugin453575363
<span class="comment">10:00:10 [</span><span class="bracket">INFO</span><span class="comment">]</span> executor: registering services
<span class="comment">10:57:10 [</span><span class="bracket">INFO</span><span class="comment">]</span> executor: de-registering services and shutting down consul service
<span class="comment">10:57:10 [</span><span class="bracket">INFO</span><span class="comment">]</span> consul: shutting down sync for task "redis"
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Log Rotation
Nomad automatically rotates logs when they reach a certain size.<br>
The **maximum file size** and **number of files** to retain can be configured per task.

<pre>
task <span class="value">"redis"</span> <span class="bracket">{</span>
  logs <span class="bracket">{</span>
    max_files = <span class="value">10</span>     <span class="comment"># default</span>
    max_file_size = <span class="value">10</span> <span class="comment"># default, in MB</span>
  <span class="bracket">}</span>

  ...
<span class="bracket">}</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exporting Logs
It's valuable to get logs **off your machines** and **aggregated** in a central location, so you can **search** through logs and **correlate events**.

We will create a setup that carts the logs out of the tasks and off to **Elasticsearch** after which we can view them in **Kibana**.

To get the logs off the machines we will use **Fluentd**, that **reads the log files** in the alloc directory and sends them to Elasticsearch.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Run the **logging.nomad** job, that you can find with the presentation, and find the **address where Kibana is running**.

View the logs in your browser, on the external address of the node.

<br/>
<span style="font-size: 70%">More information about [Fluentd](http://www.fluentd.org/), [Elasticsearch](https://www.elastic.co/products/elasticsearch) and [Kibana](https://www.elastic.co/products/kibana).</span>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<img style="box-shadow: 0 0 30px rgba(0,0,0,0.4);" src="/img/kibana.png"/>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Exercise
Extend the PAAS Monitor job with a **side car task**. An example task can be found in the **logging.nomad** job with the name **fluentd**.

After running the PAAS Monitor job again, the logs should start showing up in Kibana.
