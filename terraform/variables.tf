variable "kubeconfig" {
  description = "Path to kubeconfig file"
  type        = string
}

variable "kube_context" {
  description = "Kubernetes context to use"
  type        = string
}

variable "namespace" {
  description = "Namespace for resources"
  type        = string
  default     = "default"
}

variable "kustomize_path" {
  description = "Path to Kustomize overlay"
  type        = string
}

