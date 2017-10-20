<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Running Nomad

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Distribution

Nomad consists of a **single** Go binary, which can perform all provided roles:
- Server Agent
- Client Agent
- CLI
- Task Executor
- Logging Agent
- Other (future)

The binary is statically linked (except for libc), so has **no OS dependencies**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Download & Install
For **Linux**, **Mac OS X** and **Windows**, Nomad binaries can be downloaded from https://www.nomadproject.io/downloads.html.

For **other OSes** like FreeBSD, or **other architectures**, like ARM, you can compile the source code. This can be found at https://github.com/hashicorp/nomad.

To install, simply **unzip** the archive and add the binary to your **PATH**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
If you run Nomad **without arguments**, you get an overview of the **available commands**.

<pre>
<span class="comment">usage:</span> nomad [--version] [--help] <command> [&lt;args&gt;]

<span class="comment">Available commands are:</span>
    <span class="value">agent</span>                 Runs a Nomad agent
    <span class="value">agent-info</span>            Display status information about the local agent
    <span class="value">alloc-status</span>          Display allocation status information and metadata
    <span class="value">client-config</span>         View or modify client configuration details
    <span class="value">eval-monitor</span>          Monitor an evaluation interactively
    <span class="value">fs</span>                    Inspect the contents of an allocation directory
    <span class="value">init</span>                  Create an example job file
    <span class="value">inspect</span>               Inspect a submitted job
    <span class="value">node-drain</span>            Toggle drain mode on a given node
    <span class="value">node-status</span>           Display status information about nodes
    <span class="value">run</span>                   Run a new job or update an existing job
    <span class="value">server-force-leave</span>    Force a server into the 'left' state
    <span class="value">server-join</span>           Join server nodes together
    <span class="value">server-members</span>        Display a list of known servers and their status
    <span class="value">status</span>                Display status information about jobs
    <span class="value">stop</span>                  Stop a running job
    <span class="value">validate</span>              Checks if a given job specification is valid
    <span class="value">version</span>               Prints the Nomad version
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Development Mode
In **development mode** Nomad starts a **single node cluster** as both server and client.
<pre>
nomad agent <span class="value">-dev</span>
</pre>
<pre>
    No configuration files loaded
<span class="bracket">==&gt;</span> <span class="comment">Starting Nomad agent...</span>
<span class="bracket">==&gt;</span> <span class="comment">Nomad agent configuration:</span>
        Atlas: &lt;disabled&gt;
       Client: true
    Log Level: DEBUG
       Region: global (DC: dc1)
       Server: true
<span class="bracket">==&gt;</span> <span class="comment">Nomad agent started! Log data will stream in below:</span>
...
</pre>
No configuration necessary!

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<pre style="font-size: 50%;">
<span class="comment">[<span class="bracket">INFO</span>]</span> serf: EventMemberJoin: localhost.localdomain.global 127.0.0.1
<span class="comment">[<span class="bracket">INFO</span>]</span> nomad: starting 8 scheduling worker(s) for [service batch system core]
<span class="comment">[<span class="bracket">INFO</span>]</span> client: using state directory /tmp/NomadClient549617046
<span class="comment">[<span class="bracket">INFO</span>]</span> client: using alloc directory /tmp/NomadClient027047421
<span class="comment">[<span class="bracket">INFO</span>]</span> raft: Node at 127.0.0.1:4647 [Follower] entering Follower state
<span class="comment">[<span class="bracket">INFO</span>]</span> fingerprint.cgroups: cgroups are available
<span class="comment">[<span class="bracket">INFO</span>]</span> nomad: adding server localhost.localdomain.global (Addr: 127.0.0.1:4647) (DC: dc1)
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: periodically fingerprinting cgroup at duration 15s
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: periodically fingerprinting consul at duration 15s
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: allocs: (added 0) (removed 0) (updated 0) (ignore 0)
<span class="comment">[<span class="bracket">WARN</span>]</span> raft: Heartbeat timeout reached, starting election
<span class="comment">[<span class="bracket">INFO</span>]</span> raft: Node at 127.0.0.1:4647 [Candidate] entering Candidate state
<span class="comment">[<span class="bracket">DEBUG</span>]</span> raft: Votes needed: 1
<span class="comment">[<span class="bracket">DEBUG</span>]</span> raft: Vote granted from 127.0.0.1:4647. Tally: 1
<span class="comment">[<span class="bracket">INFO</span>]</span> raft: Election won. Tally: 1
<span class="comment">[<span class="bracket">INFO</span>]</span> raft: Node at 127.0.0.1:4647 [Leader] entering Leader state
<span class="comment">[<span class="bracket">INFO</span>]</span> raft: Disabling EnableSingleNode (bootstrap)
<span class="comment">[<span class="bracket">DEBUG</span>]</span> raft: Node 127.0.0.1:4647 updated peer set (2): [127.0.0.1:4647]
<span class="comment">[<span class="bracket">INFO</span>]</span> nomad: cluster leadership acquired

...
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<pre style="font-size: 50%;">
...

<span class="comment">[<span class="bracket">DEBUG</span>]</span> fingerprint.env_aws: Error querying AWS Metadata URL, skipping
<span class="comment">[<span class="bracket">WARN</span>]</span> fingerprint.env_gce: Could not read value for attribute "machine-type"
<span class="comment">[<span class="bracket">DEBUG</span>]</span> fingerprint.env_gce: Error querying GCE Metadata URL, skipping
<span class="comment">[<span class="bracket">DEBUG</span>]</span> fingerprint.network: Detected interface lo  with IP 127.0.0.1 during fingerprinting
<span class="comment">[<span class="bracket">WARN</span>]</span> fingerprint.network: Unable to parse Speed in output of '/sbin/ethtool lo'
<span class="comment">[<span class="bracket">WARN</span>]</span> fingerprint.network: Unable to read link speed from /sys/class/net/lo/speed
<span class="comment">[<span class="bracket">DEBUG</span>]</span> fingerprint.network: Unable to read link speed; setting to default 100
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: applied fingerprints [arch cgroup cpu host memory network nomad storage]
<span class="comment">[<span class="bracket">DEBUG</span>]</span> driver.qemu: enabling driver
<span class="comment">[<span class="bracket">DEBUG</span>]</span> driver.docker: using client connection initialized from environment
<span class="comment">[<span class="bracket">DEBUG</span>]</span> driver.exec: exec driver is enabled
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: available drivers [java qemu docker exec raw_exec]
<span class="comment">[<span class="bracket">INFO</span>]</span> client: setting server address list: []
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: periodically fingerprinting docker at duration 15s
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: periodically fingerprinting exec at duration 15s
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: updated allocations at index 1 (pulled 0) (filtered 0)
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: node registration complete
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: periodically checking for node changes at duration 5s
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: state updated to ready
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: state changed, updating node.
<span class="comment">[<span class="bracket">DEBUG</span>]</span> client: node registration complete
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Privileges
A **Nomad server** does not need any special privileges, it can run as a regular user process.
It does want to open some TCP and UDP ports and write to a directory to store its state.

A **Nomad client** generally runs with root (equivalent) privileges to be able to interact with the Docker daemon,
 to start tasks with kernel level isolation or properly fingerprint the Node.<br>

For **Dev Mode** a regular user that is a member of the _docker_ group is sufficient.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# CLI
The **Nomad CLI** provides many useful commands to interact with Nomad Agents.

It will talk to the **local Agent by default**, but can also **connect to remote Agents** or local ones listening on a custom IP or Port.

Specify the remote address as an **argument**, or as an **environment variable**:
<pre>
nomad <span class="value">-address http://127.0.0.1:4646</span> ...
</pre>
<pre>
<span class="value">export NOMAD_ADDR=http://127.0.0.1:4646</span>
nomad ...
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Agent Info
The **nomad agent-info** command shows **operational settings** and **metrics** of the queried Agent, some for both Clients and Servers.

It groups the information into sections, most of which are either Client or Server specific.

<pre>
nomad <span class="value">agent-info</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
The runtime section shows information about the node and golang.
<pre>
<span class="value">runtime</span>
  arch = amd64
  cpu_count = 1
  goroutines = 46
  kernel.name = linux
  max_procs = 1
  version = go1.6
</pre>
The client section has client specific information such as the number of allocations placed on the node.
<pre>
<span class="value">client</span>
  heartbeat_ttl = 11.520269379s
  known_servers = 0
  last_heartbeat = 10.217583453s
  node_id = 767566ee-4860-2b7c-05c1-65a1f5dc94a6
  num_allocations = 0
</pre>
But most of the information is related to the server ...

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<pre>
<span class="value">nomad</span>
  bootstrap = false
  known_regions = 1
  leader = true
  leader_addr = 127.0.0.1:4647
  server = true
<span class="value">raft</span>
  applied_index = 15
  commit_index = 15
  fsm_pending = 0
  last_contact = never
  last_log_index = 15
  last_log_term = 1
  last_snapshot_index = 0
  last_snapshot_term = 0
  num_peers = 0
  raft_peers = 127.0.0.1:4647
  state = Leader
  term = 1
<span class="value">serf</span>
  encrypted = false
  event_queue = 0
  event_time = 1
  failed = 0
  intent_queue = 0
  left = 0
  member_time = 1
  members = 1
  query_queue = 0
  query_time = 1
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Server Members
The **nomad server-members** command returns an overview of the **Server Nodes** registered in the cluster.

In development mode there always\* will be just **one** server, with **Leader** status.

<pre>
nomad <span class="value">server-members</span>
</pre>

<pre>
<span class="comment">Name               Address    Port  Status  Leader  Protocol  Build     Datacenter  Region</span>
host.local.global  127.0.0.1  4648  alive   true    2         0.4.0dev  dc1         global
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Node Status
The **nomad node-status** command returns an overview of the **Client Nodes** registered in the cluster.

Again, in development mode there will be just **one** client.

<pre>
nomad <span class="value">node-status</span>
</pre>

<pre>
<span class="comment">ID        DC   Name                   Class   Drain  Status</span>
767566ee  dc1  localhost.localdomain  &lt;none&gt;  false  ready
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
If you specify the **node-id**, Nomad will return information on that particular Node. With flag **-verbose** you will get even more information.

<pre>
nomad node-status <span class="value">-verbose 767566ee</span>
</pre>

<pre>
Node ID = 767566ee-4860-2b7c-05c1-65a1f5dc94a6
Name                 = localhost.localdomain
Class                = <none>
DC                   = dc1
Drain                = false
Status               = ready
Uptime               = 66h19m8s

<span class="bracket">==&gt;</span> <span class="comment">Resource Utilization (Allocated)</span>
<span class="comment">CPU      Memory MB  Disk MB  IOPS</span>
0/22009  0/32081    0/16040  0/0

<span class="bracket">==&gt;</span> <span class="comment">Resource Utilization (Actual)</span>
<span class="comment">CPU         Memory        Disk</span>
3085/22009  8.0 GB/34 GB  0 B/0 B

<span class="bracket">==&gt;</span> <span class="comment">Attributes</span>
...
</pre>
