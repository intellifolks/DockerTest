resource "null_resource" "apply_kustomize" {
  provisioner "local-exec" {
    command = "kubectl apply -k ${var.kustomize_path}"
    #command = "kustomize build ${var.kustomize_path} | kubectl apply -f -"
    environment = {
      KUBECONFIG = var.kubeconfig
    }
  }

}
