import * as k8s from "@pulumi/kubernetes"
import * as kx from "@pulumi/kubernetesx"

/**
 * A simple regex for the DNS1123 pattern, required for resource naming
 * by the Kubernetes API server.
 */
const dns1123 = /^(?![0-9]+$)(?!.*-$)(?!-)[a-z0-9-]{1,63}$/

const createPod = (name: string): k8s.core.v1.Pod => {
    if (dns1123.test(name) === false) {
        throw new Error(`The name ${name} is not valid. Pod naming must obey the DNS-1123 validation.`)
    }

    return new k8s.core.v1.Pod(name, {
        metadata: {
            labels: { app: name },
        },
        spec: {
            containers: [
                {
                    name: "echo",
                    // This image's default port is 5678
                    // Ref.: https://github.com/hashicorp/http-echo
                    image: "hashicorp/http-echo:0.2.3",
                    args: [`-text=${name}`],
                },
            ],
        },
    })
}

new k8s.yaml.ConfigFile("nginx", {
    file: "nginx.kind.yaml",
})

const podA = createPod("pod-a")
const podB = createPod("pod-b")
