<!-- .slide: data-background="#040811" data-background-image="/img/hashi-grid-white.svg" data-background-size="cover" data-background-position="center" -->
# Recap

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Future

**Nomad 0.4.0** will be released officially very, very soon!

Some highlights:
* Detailed **resource usage** statistics
* **Dry-run** jobs with nomad plan
* **Auto-registration** of Nomad clients and servers in Consul
* Cluster **auto-bootstrap**
* **Performance** improvements
* **Multi-region** fixes

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Nomad plan
<pre>
nomad <span class="value">plan example.nomad</span>
</pre>
<pre>
<span class="bracket">+</span> Job: <span class="value">"example2"</span>
<span class="bracket">+</span> Task Group: <span class="value">"cache"</span> (1 create)
  <span class="bracket">+</span> Task: <span class="value">"redis"</span> (forces create)

<span class="comment">Scheduler dry-run:</span>
<span class="bracket">-</span> All tasks successfully allocated.

Job Modify Index: 0
<span class="comment">To submit the job with version verification run:</span>

nomad <span class="value">run -check-index 0 example.nomad</span>

<span class="comment">When running the job with the check-index flag, the job will only be run if the
server side version matches the the job modify index returned. If the index has
changed, another user has modified the job and the plan's results are
potentially invalid.</span>
</pre>

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
# Looking back
- Did we tick all boxes?
- What did you think of the training?

!SUB
<!-- .slide: data-background-image="/img/hashi-grid-gray.svg" data-background-size="cover" data-background-position="center" -->
Feel free to **contact us** if you have further questions. Or want to grab a beer to discuss Nomad and other **data center automation** technologies.

**Bastiaan Bakker**
[<i class="fa fa-github fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://github.com/bastiaanb)
[<i class="fa fa-linkedin-square fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://linkedin.com/in/bastiaanbakker)
[<i class="fa fa-envelope-square fa-fw" aria-hidden="true" style="font-style: normal;"></i>](mailto:bbakker@xebia.com)
<p></p><br/>
**Erik Veld**
[<i class="fa fa-github fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://github.com/eveld)
[<i class="fa fa-twitter fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://twitter.com/eveld)
[<i class="fa fa-linkedin-square fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://linkedin.com/in/eveld)
[<i class="fa fa-envelope-square fa-fw" aria-hidden="true" style="font-style: normal;"></i>](mailto:eveld@xebia.com)
<p></p><br/>
**HashiCorp**
[<i class="fa fa-globe fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://hashicorp.com/)
[<i class="fa fa-github fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://github.com/hashicorp)
[<i class="fa fa-twitter fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://twitter.com/hashicorp)
<p></p><br/>
**Xebia**
[<i class="fa fa-globe fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://xebia.com/)
[<i class="fa fa-github fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://github.com/xebia)
[<i class="fa fa-twitter fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://twitter.com/Xebia)
[<i class="fa fa-youtube-play fa-fw" aria-hidden="true" style="font-style: normal;"></i>](http://www.youtube.com/user/XebiaNL)
[<i class="fa fa-vimeo fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://vimeo.com/xebianl)
[<i class="fa fa-linkedin-square fa-fw" aria-hidden="true" style="font-style: normal;"></i>](https://www.linkedin.com/company/xebia)
[<i class="fa fa-envelope-square fa-fw" aria-hidden="true" style="font-style: normal;"></i>](mailto:info@xebia.com)
