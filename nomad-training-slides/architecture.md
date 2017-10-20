<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Architecture

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Vocabulary
**Nodes** are the machines that comprise the Nomad cluster.
Sometimes the term 'nodes' refers only to 'clients'.

**Agents** are the long running Nomad processes which run on every Node.

**Clients** are the Nodes that tasks can be run on.
Every Client has a Nomad Agent running in Client mode.

**Servers** are the brains of the cluster. There is a cluster of servers per region. They manage all jobs and clients, run evaluations and create task allocations.
Every Server has a Nomad Agent running in Server mode.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Simple Setup
![](/img/simple-setup.png)

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# High Availability
![](/img/ha-setup.png)

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Raft & Gossip
Nomad uses the Raft protocol for **leader election** and **consensus on global state** of the cluster. Only server nodes participate in Raft, the client nodes forward requests to servers.

Nomad uses a gossip protocol to manage **membership**, provided by the **Serf** library. Nomad makes use of a **single** global WAN gossip pool that all servers participate in. The gossip protocol is also used to detect servers in the same region to perform automatic clustering.


!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Scaling
![](/img/scaling.png)

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Regions
![](/img/regions.png)
