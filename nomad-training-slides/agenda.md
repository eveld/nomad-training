<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
<h1>Agenda &</h1><br/>
<h1>Service Announcements</h1>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
<table style="width: 100%;">
  <tr style="font-size: 50%;">
    <td>Morning 9:00 - 12:30</td><td>Lunch 12:30 - 13:30</td><td>Afternoon 13:30 - 17:00</td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Introduction</li>
        <li>Architecture</li>
        <li>Running Nomad</li>
        <li>Configuration</li>
        <li>Scheduling</li>
        <li>Jobs</li>
      </ul>
    </td>
    <td>Lunch</td>
    <td>
      <ul>
        <li>Jobs *(Continued)*</li>
        <li>Service Discovery</li>
        <li>Logging</li>
        <li>Metrics</li>
        <li>Batch & Cron Jobs</li>
        <li>Operational Challenges</li>
        <li>Recap</li>
      </ul>
    </td>
  </tr>
</table>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
**Your training environment** for today consists of 5 Virtual Machines hosted on the Google Cloud Platform.
* 3 Server Nodes called **yourname**-nomad-**0X**.training.gce.nauts.io
* 2 Client Nodes called **yourname**-farm-**0X**.training.gce.nauts.io

<br/>
<br/>
You have been emailed an SSH key to login to these machines, if not please let us know!

<pre>
$ ssh -i ssh-key user@<span class="value">erik-nomad-01</span>.training.gce.nauts.io
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
All machines are running **Debian 8** and have been preloaded with the **Nomad** binary, the **Docker** engine, the **vim** and **nano** editors, **jq**, **curl** and other tools.

If you miss some, feel free to install them.

<pre>
$ sudo su -
# apt-get install <span class="value">your-favorite-tool</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Google Compute Engine assigns every VM **two IP addresses**.
* a **private** IP address in a **10.x.y.z** network, configured on **eth0**.
* a **public** IP address that is forwarded with NAT to the private one.

All VMs can directly communicate with each other via the **private** network.

From your laptop you can access the SSH, Nomad and other ports via the **public** address, because we opened up the firewall.

<br/>
**NOTE:** Never open the Nomad ports to the Internet in a production environment, because it is **very insecure**.

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
These slides can be found at [http://slides.training.gce.nauts.io](http://slides.training.gce.nauts.io).

The Nomad jobs used later in the slides can be found on [Github](https://github.com/xebia/nomad-training-jobs).
