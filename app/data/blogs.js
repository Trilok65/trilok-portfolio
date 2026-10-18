export const blogPosts = [
  {
    slug: "nextjs-staging-to-production-dns-cutover",
    title: "From Vercel Staging to Production: Zero-Downtime Custom Domain Cutover",
    date: "October 2026",
    readTime: "4 min read",
    category: "DevOps & Cloud",
    tags: ["Next.js", "Vercel CI/CD", "DNS", "SSL/TLS"],
    excerpt:
      "How I manage pre-launch client staging environments (like mindpodcast-yjj5.vercel.app) and execute a clean DNS & SSL cutover to a custom production domain like themind.com.",
    content: [
      {
        heading: "1. Staging vs. Production in Real Agency Workflows",
        body: "When building commercial platforms like Nepal Exporting IT (nepalexportingit.com) or The Mind Podcast, pushing untested commits directly to a live domain risks breaking client workflows. By pairing GitHub branches with Vercel preview and staging environments, clients can review responsive layouts and interactive media features on a staging URL before DNS cutover.",
      },
      {
        heading: "2. DNS A/CNAME Configuration & Automated SSL Provisioning",
        body: "Once final client sign-off is complete, we lower the DNS TTL beforehand, point the root (@) A record and www CNAME record to the cloud edge, and verify Let's Encrypt TLS certificate provisioning.",
        code: `# Verify DNS propagation from Linux terminal
dig +short themind.com A
dig +short www.themind.com CNAME

# Verify HTTP/2 200 OK & SSL headers on live deployment
curl -I https://www.nepalexportingit.com`,
      },
      {
        heading: "3. Post-Cutover SEO & Canonical Checks",
        body: "After cutting over to the production domain, updating metadataBase and OpenGraph URLs ensures clean link previews across LinkedIn, WhatsApp, and Google Search.",
      },
    ],
  },
  {
    slug: "multi-vm-devops-labs-with-vagrant-and-virtualbox",
    title: "Orchestrating Multi-Machine Linux Labs Using Vagrant & VirtualBox",
    date: "October 2026",
    readTime: "5 min read",
    category: "DevOps & Cloud",
    tags: ["Vagrant", "VirtualBox", "Linux", "IaC"],
    excerpt:
      "Using Infrastructure-as-Code principles with Vagrantfiles to spin up reproducible Ubuntu & CentOS virtual machines for networking and deployment testing.",
    content: [
      {
        heading: "1. Why Local Multi-VM Labs Beat Single-Container Testing",
        body: "When practicing real-world DevOps scenarios—like configuring Nginx reverse proxies in front of application servers or testing SSH key authentication across private subnets—a multi-machine Vagrant setup simulates actual cloud VPC networking right on your local workstation.",
      },
      {
        heading: "2. Automating Provisioning with a Vagrantfile",
        body: "With a declarative Vagrantfile, we can spin up an Ubuntu web node and a database node on a private network with automated Bash provisioning in a single command.",
        code: `Vagrant.configure("2") do |config|
  config.vm.define "web01" do |web|
    web.vm.box = "ubuntu/jammy64"
    web.vm.network "private_network", ip: "192.168.56.10"
    web.vm.provision "shell", inline: <<-SHELL
      apt-get update && apt-get install -y nginx docker.io
      systemctl enable --now nginx docker
    SHELL
  end
end`,
      },
    ],
  },
  {
    slug: "linux-bash-permissions-and-server-troubleshooting",
    title: "Essential Linux Administration: File Permissions, SSH & Process Diagnostics",
    date: "September 2026",
    readTime: "5 min read",
    category: "Linux & Systems",
    tags: ["Linux", "Bash", "SSH", "Troubleshooting"],
    excerpt:
      "Practical Linux administration commands for diagnosing CPU/memory bottlenecks, hardening SSH access, and enforcing safe web directory permissions.",
    content: [
      {
        heading: "1. Rapid Server Triage in 60 Seconds",
        body: "When a production Linux server slows down or refuses connections, checking system load, memory pressure, and listening sockets immediately isolates the root cause.",
        code: `# Check memory, swap, and system load average
free -h && uptime

# Identify top CPU and memory processes
ps aux --sort=-%mem | head -n 10

# Inspect active listening ports and daemon PIDs
sudo ss -tulnp`,
      },
      {
        heading: "2. Enforcing Least-Privilege Permissions",
        body: "Avoid chmod 777 on production web servers. Separating directory execution permissions (755) from static file permissions (644) and locking down SSH keys (600) keeps servers hardened.",
        code: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
sudo find /var/www/html -type d -exec chmod 755 {} \\\;
sudo find /var/www/html -type f -exec chmod 644 {} \\\;`,
      },
    ],
  },
  {
    slug: "dockerizing-nextjs-for-portable-deployments",
    title: "Containerizing Next.js Applications with Multi-Stage Dockerfiles",
    date: "September 2026",
    readTime: "4 min read",
    category: "DevOps & Cloud",
    tags: ["Docker", "Next.js", "Containers", "CI/CD"],
    excerpt:
      "How to shrink production Next.js Docker images from 1GB+ down to ~150MB using multi-stage Alpine builds.",
    content: [
      {
        heading: "1. Solving the Bloated Node Image Problem",
        body: "A naive Dockerfile that copies node_modules and runs npm build in a single layer produces massive container images that slow down CI/CD pipelines. Multi-stage builds separate dependency installation, static compilation, and the lightweight runtime image.",
        code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]`,
      },
    ],
  },
  {
    slug: "optimizing-nextjs-and-wordpress-for-production",
    title: "Bridging Next.js & WordPress: Choosing the Right Stack for B2B Clients",
    date: "August 2026",
    readTime: "4 min read",
    category: "Web Engineering",
    tags: ["Next.js", "WordPress", "Performance", "SEO"],
    excerpt:
      "Comparing custom Next.js/Tailwind architectures (nepalexportingit.com) with international WordPress CMS platforms (teenmissions.org) in real production environments.",
    content: [
      {
        heading: "1. Custom Next.js for High-Speed Commercial Platforms",
        body: "For B2B platforms like Nepal Exporting IT and media apps like The Mind Podcast, Next.js + Tailwind CSS delivers instant client-side routing, clean component modularity, and automated Git-based deployments.",
      },
      {
        heading: "2. Production WordPress for Content-Heavy Organizations",
        body: "Contributing to international platforms like Teen Missions International (teenmissions.org) highlights where WordPress shines: empowering non-technical teams to publish content while developers maintain custom PHP templates, Elementor layouts, and mobile responsiveness.",
      },
    ],
  },
];
