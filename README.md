
# sde-hire-nodejs

This project is a robust Node.js application backed by a MongoDB database. It features a comprehensive CI/CD pipeline designed to ensure code quality and security. Utilizing Jenkins for automation, the pipeline integrates SonarQube for static code analysis, Trivy for security scanning, and Nexus for artifact management. The deployment is managed on AWS EKS, providing scalability and reliability. This setup not only streamlines development and deployment processes but also maintains high standards for code integrity and security.

Step 1: Launch EC2 (Ubuntu 22.04): name it as server

Provision an EC2 instance on AWS with Ubuntu 22.04.
Connect to the instance using SSH.

RUN THE BELOW COMANDS
## AWS CLI

run code

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install
aws configure
```
## Kube CTL

run code

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client 
```
## EKSCTL

run code

```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```
## EKSCTL

run code

```bash
eksctl create cluster --name=EKS-1 \
                      --region=ap-south-1 \
                      --zones=ap-south-1a,ap-south-1b \
                      --without-nodegroup

eksctl utils associate-iam-oidc-provider \
    --region ap-south-1 \
    --cluster EKS-1 \
    --approve

eksctl create nodegroup --cluster=EKS-1 \
                       --region=ap-south-1 \
                       --name=node2 \
                       --node-type=t3.medium \
                       --nodes=3 \
                       --nodes-min=2 \
                       --nodes-max=4 \
                       --node-volume-size=20 \
                       --ssh-access \
                       --ssh-public-key=DevOps \
                       --managed \
                       --asg-access \
                       --external-dns-access \
                       --full-ecr-access \
                       --appmesh-access \
                       --alb-ingress-access
```

## EKSCTL

To connect EKS so we can run commands(Change region and cluster name)

```bash
aws eks --region ap-south-1 update-kubeconfig --name devopsregin-cluster
```
## Terraform

run code

```bash
cd terraform_eks
terraform init
terraform apply -auto-approve
```
    

Step : Launch EC2 (Ubuntu 22.04): name it as Nexus and SonarQUbe

Provision an EC2 instance on AWS with Ubuntu 22.04.
Connect to the instance using SSH.

run following in both the instances

## Docker 

run code

```bash

sudo apt-get update
sudo apt-get install docker.io -y
sudo usermod -aG docker $USER 
newgrp docker
sudo chmod 777 /var/run/docker.sock
```

In Nexus instance

run code

```bash
docker run -d ---name -p 8081:8081 sonatype/nexus3
```
In SonarQube instance

run Docker code

```bash
docker run -d --name sonar -p 9000:9000 sonarqube:lts-community
```
run Trivy code

```bash

sudo apt-get install wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy        
```

    
Step 3: Launch EC2 (Ubuntu 22.04): name it as jenkins

Provision an EC2 instance on AWS with Ubuntu 22.04.
Connect to the instance using SSH.

run the following code

Install Jenkins on the EC2 instance to automate deployment:

```bash
sudo apt update
sudo apt install fontconfig openjdk-17-jre
java -version

#jenkins
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```
## Kube CTL

run code

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client 
```
## Docker 

run code

```bash

sudo apt-get update
sudo apt-get install docker.io -y
sudo usermod -aG docker $USER 
newgrp docker
sudo chmod 777 /var/run/docker.sock
```

Step 3: Launch EC2 (Ubuntu 22.04): name it as jenkins

Provision an EC2 instance on AWS with Ubuntu 22.04.
Connect to the instance using SSH.

run the following code

Install Jenkins on the EC2 instance to automate deployment:

```bash
sudo apt update
sudo apt install fontconfig openjdk-17-jre
java -version

#jenkins
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```
## Kube CTL

run code

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client 
```
## Docker 

run code

```bash

sudo apt-get update
sudo apt-get install docker.io -y
sudo usermod -aG docker $USER 
newgrp docker
sudo chmod 777 /var/run/docker.sock
```

## JenkinsFile 

copy code and paste it 

```bash

node {
    stage('Git Checkout') {
        // Checkout the code from GitHub
        git branch: 'main', url: 'https://github.com/reginbilnesar/sde-hire-nodejs.git'
    }
    stage('Build') {
        nodejs(nodeJSInstallationName: 'node'){
            sh 'npm install'
        }
    }
    stage('ExecuteSonarQubeReport') {
        nodejs(nodeJSInstallationName: 'node'){
            sh 'npm run sonar'
        }
    }
    stage('UploadArtifactToNexus') {
        nodejs(nodeJSInstallationName: 'node'){
            sh 'npm publish'
        }
    }
    stage('Trivy FS Scan') {
        nodejs(nodeJSInstallationName: 'node'){
            sh 'trivy fs --format table -o fs-report.html .'
        }
    }
    stage('Docker Build Image') {
        nodejs(nodeJSInstallationName: 'node'){
            // This step should build the Docker image
            withDockerRegistry(credentialsId: 'docker-cred', toolName: 'Docker') {
                sh 'docker build -t reginbilnesar/nodejsapp:latest .'
            }
        }
    }
    stage('Trivy Image Scan') {
        nodejs(nodeJSInstallationName: 'node'){
            sh 'trivy image --format table -o image-scan-report.html reginbilnesar/nodejsapp:latest'
        }
    }
    stage('Docker Push Image') {
        nodejs(nodeJSInstallationName: 'node'){
            withDockerRegistry(credentialsId: 'docker-cred', toolName: 'Docker') {
                sh "docker push reginbilnesar/nodejsapp:latest"
            }
        }
    }
    stage('Deploy To Kubernetessss') {
        nodejs(nodeJSInstallationName: 'node'){
            withKubeConfig(caCertificate: '', clusterName: 'devopsshack-cluster', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://c1f842a74bc8163d0d61554becda2baa.gr7.ap-south-1.eks.amazonaws.com/') {
                sh "kubectl apply -k ."
                sleep 30
            }
        }
    }
    stage('Verify Deployment ') {
        nodejs(nodeJSInstallationName: 'node'){
            withKubeConfig(caCertificate: '', clusterName: 'devopsshack-cluster', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://c1f842a74bc8163d0d61554becda2baa.gr7.ap-south-1.eks.amazonaws.com/') {
                sh "kubectl get pods -n webapps"
                sh "kubectl get svc -n webapps"
            }
        }
    }
}

```
Install Necessary Plugins in Jenkins:

Goto Manage Jenkins →Plugins → Available Plugins →

Install below plugins

-Docker plugins

- SonarQube Scanner (Install without restart)

- NodeJs Plugin (Install Without restart)

Configure Java and Nodejs in Global Tool Configuration

Goto Manage Jenkins → Tools → Install JDK and NodeJs→ Click on Apply and Save

SonarQube

-Create the token

-Goto Jenkins Dashboard → Manage Jenkins → Credentials → Add Secret Text. It should look like this

-After adding sonar token

-Click on Apply and Save

-The Configure System option is used in Jenkins to configure different server

-Global Tool Configuration is used to configure different tools that we install using Plugins

-We will install a sonar scanner in the tools.

-Create a Jenkins webhook

Nexus

- Step 1: Set Up Nexus Repository

- Install Nexus: Download and install Nexus Repository Manager.

- Create Repository: Access the Nexus UI at http://<your-nexus-host>:8081, log in, and create an npm (hosted) repository (e.g., npm-repo).

- Step 2: Configure Jenkins

- Install Jenkins: Set up Jenkins on your server.

- Install Plugins: Go to Manage Plugins and install Nexus Artifact Uploader and NodeJS Plugin.

- Configure Node.js: Add Node.js under Global Tool Configuration.

- Add Nexus Credentials: Under Manage Credentials, add credentials for Nexus (username and password).

