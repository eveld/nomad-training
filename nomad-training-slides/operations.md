<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Operational Challenges

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Failures
In any large datacenter **failure** is <strike>not an option</strike> **common**.

Let's take some time to experiment with different failure scenarios.
- A task fails
- A Nomad client becomes unreachable
- All Nomad client nodes go down
- A Nomad server crashes
- All Nomad servers fail

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Client Node Maintenance
Sometimes we **want** to temporarily or permantently remove a node from the Nomad cluster.

For example when **decommissioning** client nodes in an auto scaling group or when **updating** Nomad itself.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
If you shutdown a **client node**, Nomad will automatically **reallocate** any tasks that where running on it.
In the meantime however your availability or performance may suffer.

To solve this Nomad provides a **node drain** feature. When enabled on a node, Nomad will **stop scheduling** new tasks on that node and proactively **reschedule** running tasks to other nodes.

After the drain completes the node can be safely shut down and undergo maintenance.  

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<pre>
nomad <span class="value">node-drain -enable e201c2e1-0ba3-fd71-f5aa-acfda4eb1891</span>
</pre>
<pre>
nomad <span class="value">node-status -allocs</span>
</pre>
<pre>
<span class="comment">ID        DC              Name               Class   Drain  Status  Running Allocs</span>
e201c2e1  europe-west1-d  bastiaan-farm-01   docker  <span class="value">true</span>   ready   0
5808563b  europe-west1-c  bastiaan-farm-02   docker  false  ready   1
023247d3  europe-west1-b  bastiaan-nomad-01  system  false  ready   0
4b7e9076  europe-west1-d  bastiaan-nomad-03  system  false  ready   0
741d4ab3  europe-west1-c  bastiaan-nomad-02  system  false  ready   0
</pre>

<pre>
nomad <span class="value">node-drain -disable e201c2e1-0ba3-fd71-f5aa-acfda4eb1891</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Server Node Maintenance
For **server nodes** the operating procedures are a bit different.

When doing **maintenance**, e.g. **updating Nomad itself**, simply stop the Nomad Agent.
As long as an absolute majority of the server nodes are still running, i.e. **have quorum**, the cluster can keep scheduling.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Let's try this out by updating the Nomad servers to version **0.4.0dev**. On each node perform:

<pre>
sudo su -
</pre>
<pre>
ln -sf <span class="value">/usr/bin/nomad-0.4.0-dev</span> /usr/bin/nomad
</pre>
<pre>
service nomad restart
</pre>

Check the versions with **nomad server-members**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Decommissioning
To **permanently decommission** a server node, first stop the nomad agent on the node and request a **nomad server-force-leave**
 of that node on the remaining cluster.

<pre>
nomad <span class="value">server-force-leave bastiaan-nomad-03</span>
</pre>

To make a new server node **join** the cluster, start the agent with the **join configuration parameter**, or request a **join via the CLI**.

<pre>
nomad <span class="value">server-join bastiaan-nomad-01 bastiaan-nomad-02</span> ...
</pre>
