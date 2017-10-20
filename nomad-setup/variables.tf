# Google Project Name
variable "project" {
  default = "innovation-day-nomad"
}

# Google Project Region
variable "region" {
  default = "europe-west1-d"
}

# Comma separated list of Google Availability Zones that may be used to create
# instances or instance groups.
# Will be used on a round robin basis.
variable "zones" {
  default = "europe-west1-b,europe-west1-c,europe-west1-d"
}

# Google DNS Zone resource name and corresponding domain name to use to
# register the external IP addresses of static hosts in the cluster.
# The full DNS name will be <host-name>.<stack-name>.<domain>.
# E.g. nomad-01.bbakker.gce.nauts.io
#
# NB. The Zone resource is not managed by this Terraform setup, only the
# DNS records are.
variable "external_domain" {
  default = {
    domain = "gce.nauts.io."
    zone = "gce-nauts-io"
  }
}

# Name of this Stack
variable "stack" {
  default = "default"
}

# Public SSH key. This key will be authorized to login to the 'user' account
# on all hosts in the cluster.
variable "ssh_key" {
  default = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0yCNeRdwn3CE5oceIQDUET8BeFrBKEuFg4fGn/0Wk7mO9yAmFcXbgLkgAFuROmzihB6lm3EOju5cZPu8ZeJSi2WnvnH5emcmJw5nJcisffmMfGj6j0CK/K3PJeiyt3Z3ZLcWa+YEBJYNFQUS75v5LqgMMzTqAsU6Vc5eAXTqqDij5tIdfnS4UKV3QAIBoBQvbPN2lMgR+KxKilvIb9pkx/O1P3MBnk9amHdg67bHbvKRTxyJP6CbM9dbb9SC6ZHpomCdlVT+5hIzqF04hDIHvTgBq8YysypounlwSkRMe5IyZR2CjVTQI3SbeTieEp+aTi/wXL/DlkwbuBEY0IcKt eveld@xebia.com"
}


# Name of this Stack
variable "network_name" {
  default = "default"
}

variable "nomad_client" {
  default = {
    "groups" = 1
    "min_cluster_size" = 1
    "max_cluster_size" = 4
    "machine_type" = "f1-micro"
    "preemptible_instance" = "false"
    "zones" = "europe-west1-d,us-east1-c,asia-east1-a"
  }
}

variable "nomad_server" {
  default = {
    "machine_type" = "f1-micro"
    "cluster_size" = 3
  }
}
