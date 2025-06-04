terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.20"
    }
  }
}

provider "kubernetes" {
  config_path    = var.kubeconfig
  config_context = var.kube_context
}

