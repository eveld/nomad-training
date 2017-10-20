<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Scheduling

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Vocabulary
**Jobs** are a specification that declares the workload for Nomad. Nomad matches the actual state with the desired state.

**Taskgroups** are the unit of scheduling, consisting of tasks that must run together on the same client.

**Tasks** are the smallest unit of work which are executed by the drivers. They specify drivers, resources and constraints.

**Drivers** are the basic means of executing your Tasks. Example Drivers include Docker, Qemu, Java and static binaries.

**Schedulers** are responsible for the placement of taskgroups on clients.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Bin packing
<center style="padding: 40px;">
  <iframe width="960" height="470" src="https://www.youtube.com/embed/wIhjFzoEY80?start=1101&end=1288&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</center>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Evaluation
![](/img/evaluation.png)

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Planning
![](/img/planning.png)

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Allocation
![](/img/allocation.png)
