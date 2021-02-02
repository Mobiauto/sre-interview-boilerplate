# SRE Interview Boilerplate

This repository holds an interview problem designed for the [Site Reliability Engineering](https://sre.google/in-conversation/) team at Mobiauto. Here, we describe everything you're going to need to complete the exercise.

## Goals

1. **Expose your ability to learn new tools**
   We don't expect you to know all the technology that  here. We also don't expect you to understand them deeply, just enough to understand how they fit together and get the task done.


2. **Evaluate how you solve problems**
   Since we don't expect you to know the technology deeply, we want to understand how you will deal with unexpected problems on systems with unknown parts as they appear.


_If you feel that for some reason this task doesn't meet the above goals or if you find any problems along the way, you can let us know by emailing the team at sre@mobiauto.com.br._

## Basic Requirements
- Knowledge of how containers and a container orchestration work (Kubernetes, in this case);
- Knowledge of how network requests work;
- Knowledge of a programming language;
- Knowledge of how to use the command line;
- Patience to read documentation;
- Git.

## How to use this repo

This is a template repository. In order to use it, click on the green "Use this template" button.

## Tooling

- [ ] `kubectl` package;
- [ ] The local kubernetes environment [kind](https://kind.sigs.k8s.io/docs/user/quick-start/). You can use others if you want, but this repo will use `kind` as default;
- [ ] Pulumi's CLI ([Getting started guide](https://www.pulumi.com/docs/get-started/install/)) and an account (don't worry, it's free);
- [ ] Yarn ([Installation guide](https://classic.yarnpkg.com/en/docs/install)).


## Folder structure

This project is a default Pulumi typescript project containing a `kind` Nginx deployment and two pods: `pod-a` and `pod-b`.

```
.
├── README.md           -  This README.
├── cluster.yaml        -  Cluster configuration file. Used to create a new kind cluster.
├── Pulumi.yaml         -  Pulumi configuration file.
├── index.ts            -  * Our application code. The most important file.
├── nginx.kind.yaml     -  Nginx deployment for kind.
├── package.json        -  Project configuration and dependencies.
├── tsconfig.json       -  Typescript configuration for Pulumi.
├── node_modules        -  Node dependencies folder
└── yarn.lock           -  Dependencies lock file.
```

## Useful links

- **Kubernetes**
  - [Ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/)

- **Pulumi**
  - [Getting started with Kubernetes](https://www.pulumi.com/docs/get-started/kubernetes/)

- **Kind**
  - [Quick Start](https://kind.sigs.k8s.io/docs/user/quick-start/)
  - [Nginx Ingress](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx)

- **Nginx**
  - [How it works](https://kubernetes.github.io/ingress-nginx/how-it-works/)
## Getting started

1. **Make sure your Kubernetes environment is running**
   Start you cluster and acquire context by running:

   ```sh
   kind create cluster --config cluster.yaml
   ```

    And check the cluster status:
    ```sh
    kubectl get pods --all-namespaces
    NAMESPACE            NAME                                         READY   STATUS    RESTARTS   AGE
    kube-system          coredns-f9fd979d6-bt67v                      1/1     Running   0          37s
    kube-system          coredns-f9fd979d6-npscz                      1/1     Running   0          37s
    kube-system          etcd-kind-control-plane                      1/1     Running   0          46s
    kube-system          kindnet-kk7mm                                1/1     Running   0          37s
    kube-system          kube-apiserver-kind-control-plane            1/1     Running   0          46s
    kube-system          kube-controller-manager-kind-control-plane   1/1     Running   0          46s
    kube-system          kube-proxy-n2s9t                             1/1     Running   0          37s
    kube-system          kube-scheduler-kind-control-plane            1/1     Running   0          46s
    local-path-storage   local-path-provisioner-78776bfc44-8bblt      1/1     Running   0          37s

    ```

2. **Login into your Pulumi account**
    ```sh
    pulumi login
    ```

3. **Install dependencies**

    ```sh
    yarn install
    ```

4. **Preview your code**
   ```sh
   $ pulumi preview

   Previewing update (dev)

    View Live: https://app.pulumi.com/{you-user}/mobiauto-sre-interview-boilerplate/dev/previews/{preview-id}

     Type                                                                             Name                                              Plan
     +   pulumi:pulumi:Stack                                                              mobiauto-sre-interview-boilerplate-dev            create
     +   ├─ kubernetes:yaml:ConfigFile                                                    nginx                                             create
     +   │  ├─ kubernetes:core/v1:Namespace                                               ingress-nginx                                     create
     +   │  ├─ kubernetes:core/v1:ServiceAccount                                          ingress-nginx/ingress-nginx                       create
     +   │  ├─ kubernetes:core/v1:ServiceAccount                                          ingress-nginx/ingress-nginx-admission             create
     +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:RoleBinding                        ingress-nginx/ingress-nginx-admission             create
     +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:Role                               ingress-nginx/ingress-nginx-admission             create
     +   │  ├─ kubernetes:core/v1:ConfigMap                                               ingress-nginx/ingress-nginx-controller            create
     +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRoleBinding                 ingress-nginx                                     create
     +   │  ├─ kubernetes:batch/v1:Job                                                    ingress-nginx/ingress-nginx-admission-patch       create
     +   │  ├─ kubernetes:core/v1:Service                                                 ingress-nginx/ingress-nginx-controller            create
     +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:RoleBinding                        ingress-nginx/ingress-nginx                       create
     +   │  ├─ kubernetes:admissionregistration.k8s.io/v1:ValidatingWebhookConfiguration  ingress-nginx-admission                           create
     +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRoleBinding                 ingress-nginx-admission                           create
     +   │  ├─ kubernetes:apps/v1:Deployment                                              ingress-nginx/ingress-nginx-controller            create
     +   │  ├─ kubernetes:core/v1:Service                                                 ingress-nginx/ingress-nginx-controller-admission  create
     +   │  ├─ kubernetes:batch/v1:Job                                                    ingress-nginx/ingress-nginx-admission-create      create
     +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRole                        ingress-nginx                                     create
     +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRole                        ingress-nginx-admission                           create
     +   │  └─ kubernetes:rbac.authorization.k8s.io/v1:Role                               ingress-nginx/ingress-nginx                       create
     +   ├─ kubernetes:core/v1:Pod                                                        pod-a                                             create
     +   └─ kubernetes:core/v1:Pod                                                        pod-b                                             create

    Resources:
        + 22 to create
    ```

5. **Bootstrap your code**
   ```sh
   $ pulumi up

   ...

   Updating (dev)

   View Live: https://app.pulumi.com/{your-user}/mobiauto-sre-interview-boilerplate/dev/updates/{update-id}

     Type                                                                             Name                                              Status
    +   pulumi:pulumi:Stack                                                              mobiauto-sre-interview-boilerplate-dev            created
    +   ├─ kubernetes:yaml:ConfigFile                                                    nginx                                             created
    +   │  ├─ kubernetes:core/v1:Namespace                                               ingress-nginx                                     created
    +   │  ├─ kubernetes:core/v1:Service                                                 ingress-nginx/ingress-nginx-controller            created
    +   │  ├─ kubernetes:core/v1:ServiceAccount                                          ingress-nginx/ingress-nginx-admission             created
    +   │  ├─ kubernetes:core/v1:ServiceAccount                                          ingress-nginx/ingress-nginx                       created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRoleBinding                 ingress-nginx-admission                           created
    +   │  ├─ kubernetes:batch/v1:Job                                                    ingress-nginx/ingress-nginx-admission-create      created
    +   │  ├─ kubernetes:batch/v1:Job                                                    ingress-nginx/ingress-nginx-admission-patch       created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:RoleBinding                        ingress-nginx/ingress-nginx-admission             created
    +   │  ├─ kubernetes:core/v1:ConfigMap                                               ingress-nginx/ingress-nginx-controller            created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRoleBinding                 ingress-nginx                                     created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:Role                               ingress-nginx/ingress-nginx-admission             created
    +   │  ├─ kubernetes:admissionregistration.k8s.io/v1:ValidatingWebhookConfiguration  ingress-nginx-admission                           created
    +   │  ├─ kubernetes:core/v1:Service                                                 ingress-nginx/ingress-nginx-controller-admission  created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:RoleBinding                        ingress-nginx/ingress-nginx                       created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRole                        ingress-nginx-admission                           created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:ClusterRole                        ingress-nginx                                     created
    +   │  ├─ kubernetes:rbac.authorization.k8s.io/v1:Role                               ingress-nginx/ingress-nginx                       created
    +   │  └─ kubernetes:apps/v1:Deployment                                              ingress-nginx/ingress-nginx-controller            created
    +   ├─ kubernetes:core/v1:Pod                                                        pod-a                                             created
    +   └─ kubernetes:core/v1:Pod                                                        pod-b                                             created

   ```

6. **Check if your application is running**
   ```sh
   kubectl get pods --all-namespaces
   ```


To destroy all resources, you can run `pulumi destroy`. For more info on `pulumi`, you can run `pulumi --help` or check their [documentation](https://www.pulumi.com/docs/).



## The problem

If everything goes well, we're going to have two pods: `pod-a` and `pod-b` and a Nginx ingress controller running on our kind cluster. As [kind's documentation states](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx), with this setup and proper service and ingress configuration, we should be able to reach both pods through Nginx on our `localhost`. And that's what we want to do!

We want to configure one or more **services** and **ingresses** for this Kubernetes cluster such that we're able to `curl` both pods and get their respective answers from `localhost/pod-a` and `localhost/pod-b` endpoints. You can check if its working by running:

```sh
$ curl localhost/pod-a
# outputs "pod-a"
$ curl localhost/pod-b
# outputs "pod-b"
```

## What do we need from you?

- Your code must compile and have the desired result after running `pulumi up`;
- Organize your changes in easy to review commits. Following [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) would be a plus;

## I finished. What now?

Now you send us a link to your repo at sre@mobiauto.com.br. We'll get back to you as soon as possible 🚀