job "paas-monitor" {
	datacenters = ["dc1", "europe-west1-b", "europe-west1-c", "europe-west1-d"]
	group "paas-monitor" {
		count = 1

		task "paas-monitor" {
			env {
				NODE_UNIQUE_ID = "${node.unique.id}"
				NODE_UNIQUE_NAME = "${node.unique.name}"
				NODE_DATACENTER = "${node.datacenter}"
				NODE_CLASS = "${node.class}"
				ATTR_ARCH = "${attr.arch}"
				ATTR_OS_NAME = "${attr.os.name}"
				ATTR_OS_VERSION = "${attr.os.version}"
				ATTR_KERNEL_NAME = "${attr.kernel.name}"
				ATTR_KERNEL_VERSION = "${attr.kernel.version}"
				ATTR_CPU_NUMCORES = "${attr.cpu.numcores}"
				ATTR_HOSTNAME = "${attr.hostname}"
				ATTR_DRIVER_DOCKER_VERSION = "${attr.driver.docker.version}"
			}

			driver = "docker"
			config {
				image = "xebia/paas-monitor:2.0.0"
				port_map {
					http = 80
				}
			}

			service {
				name = "paas-monitor"
				tags = ["http"]
				port = "http"
				check {
					name = "alive"
					type = "tcp"
					interval = "10s"
					timeout = "2s"
				}
			}

			resources {
				cpu = 500
				memory = 256
				network {
					mbits = 10
					port "http" {}
				}
			}
		}
	}
}
