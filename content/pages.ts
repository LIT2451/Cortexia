// Text kept verbatim from the previous site (brand name changed to Cortexia).
// Stats, case studies and testimonials live in content/digital.ts.

export type Meta = { title: string; description: string };
export type Cta = { title: string; text: string; label: string; href: "/contact" | "/services" | "/about" };
export type Item = { title: string; text: string };
export type Step = Item & { step: string };

export const serviceList: { slug: string; title: string; summary: string; bullets: string[] }[] = [
  {
    slug: "custom-software",
    title: "Custom Software Engineering",
    summary:
      "High-concurrency microservices, cloud-native API backends, and modular enterprise platforms built for massive scale, zero-downtime upgrades, and strict compliance.",
    bullets: ["Golang", "Python", "React", "PostgreSQL", "Kafka"],
  },
  {
    slug: "offshore-teams",
    title: "Offshore Dedicated Teams (ODC)",
    summary:
      "Pre-vetted senior software engineers, automated QA squads, and bilingual tech leads embedded directly into your Jira, Slack, and CI/CD pipelines as a seamless extension.",
    bullets: ["Agile Squad", "Senior Tech Leads", "QA Automation", "Jira / GitHub"],
  },
  {
    slug: "telecom",
    title: "Telecom & Network Solutions",
    summary:
      "Mission-critical telecommunications architecture: FreeSWITCH & Asterisk PBX clusters, redundant SIP trunking gateways, carrier call detail record analytics, and 24/7 NOC oversight.",
    bullets: ["FreeSWITCH", "SIP Trunking", "WebRTC", "SMS Gateway", "NOC 24/7"],
  },
  {
    slug: "mobile",
    title: "Mobile Application Engineering",
    summary:
      "Native iOS/Android and Flutter applications engineered with fluid 60fps animations, biometric authentication, secure offline-first local databases, and real-time push engines.",
    bullets: ["Flutter", "React Native", "Swift", "Kotlin", "Offline Sync"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    summary:
      "Enterprise Infrastructure-as-Code (Terraform), Kubernetes cluster orchestration, zero-downtime CI/CD workflows, and FinOps cloud spend reduction across AWS, Azure, and GCP.",
    bullets: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "AWS / Azure"],
  },
  {
    slug: "maintenance-security",
    title: "Software Maintenance & Security",
    summary:
      "Tier-2/3 technical operations backed by guaranteed SLAs, rigorous OWASP vulnerability audits, continuous database tuning, security patch deployment, and legacy refactoring.",
    bullets: ["24/7 SLA", "OWASP Audits", "Vulnerability Patch", "SonarQube"],
  },
];

export const home = {
  meta: {
    title: "Cortexia - Enterprise Software Outsourcing & Telecom Solutions",
    description:
      "Cortexia provides enterprise software development, offshore engineering teams, and telecommunications infrastructure solutions for global businesses.",
  } satisfies Meta,
  hero: {
    titleLines: ["Engineering Reliable Software &", "Scalable Telecom Solutions", "For Global Enterprises"],
    text: "Cortexia delivers high-performance custom software development, offshore dedicated engineering teams, and robust telecommunications infrastructure with predictable costs and strict IP protection.",
    primary: { label: "Explore Solutions", href: "/services" as const },
    secondary: { label: "Consult an Expert", href: "/contact" as const },
  },
  services: {
    eyebrow: "What We Do",
    title: "Core Engineering & Telecom Services",
    items: [
      {
        title: "Custom Software Engineering",
        text: "Full-lifecycle enterprise software, modern cloud-native architectures, and robust web applications designed for scale.",
      },
      {
        title: "Offshore Dedicated Teams (ODC)",
        text: "Scale your development bandwidth with vetted full-stack engineers, QA specialists, and DevOps talent under transparent agile governance.",
      },
      {
        title: "Telecom & Network Solutions",
        text: "Carrier-grade VoIP platforms, telecommunications routing systems, unified communications, and 24/7 network operations center (NOC) support.",
      },
    ] satisfies Item[],
  },
  whyUs: {
    eyebrow: "Why Choose Us",
    title: "Built on Technical Excellence & Trust",
    text: "At Cortexia, we bridge engineering craftsmanship with predictable delivery. We eliminate communication bottlenecks through bilingual tech leads, automated CI/CD pipelines, and proactive milestone reporting.",
    items: [
      {
        title: "Strict IP Protection & Security",
        text: "NDA backed development, isolated source control, and SOC2/ISO aligned coding standards.",
      },
      {
        title: "Agile Sprint Deliverables",
        text: "Bi-weekly release cycles, automated test coverage, and transparent project management.",
      },
      {
        title: "Flexible Engagement Models",
        text: "Dedicated Team, Fixed-price milestones, or Time & Materials to fit your exact budget.",
      },
    ] satisfies Item[],
    link: { label: "Discover Our Story", href: "/about" as const },
  },
  techStack: {
    eyebrow: "Technology Capabilities",
    title: "Proven Technology Stack",
    text: "We adopt battle-tested languages and frameworks that guarantee long-term maintainability and high concurrency.",
    items: ["Node.js / TS", "React & Next.js", "Python / Django", "Golang Backend", "AWS / Cloud", "Docker & K8s"],
  },
  cta: {
    title: "Ready to Elevate Your Engineering Capabilities?",
    text: "Discuss your software project or telecom infrastructure requirements with our principal engineers today.",
    label: "Schedule Consultation",
    href: "/contact",
  } satisfies Cta,
};

export const about = {
  meta: {
    title: "About Us - Cortexia Software Outsourcing & Telecom Solutions",
    description:
      "Learn more about Cortexia, our mission, software engineering culture, and telecommunications infrastructure capabilities.",
  } satisfies Meta,
  hero: {
    eyebrow: "Engineering Leadership & Global Trust",
    title: "About Cortexia",
    text: "Delivering mission-critical enterprise software, dedicated offshore engineering pods, and carrier-grade telecom infrastructure to partners worldwide.",
  },
  whoWeAre: {
    eyebrow: "Who We Are",
    title: "Architecting Scalable Software & Telecom Solutions",
    paragraphs: [
      "Cortexia was founded with an uncompromising mission: to provide global enterprises, technology innovators, and telecom carriers with senior software engineering capabilities and resilient infrastructure.",
      "Headquartered in Vietnam's premier tech corridor, we bridge top-tier Vietnamese engineering pedigree with international project management standards. We empower partners across North America, Europe, Japan, and Australia to accelerate development velocity while maintaining ironclad IP security.",
    ],
    items: [
      { title: "Enterprise Software", text: "Cloud-native microservices, modern web apps, and API ecosystems." },
      { title: "Telecom Systems", text: "Carrier-grade VoIP, SIP trunking, WebRTC, and real-time billing." },
      { title: "Dedicated ODC Pods", text: "Fully managed offshore teams under agile tech leadership." },
      { title: "99.99% Reliability", text: "Rigorous SLAs, SOC2-aligned standards, and 24/7 monitoring." },
    ] satisfies Item[],
  },
  values: {
    eyebrow: "Our Principles",
    title: "Mission & Core Values",
    text: "The foundational values guiding our software craft, architecture decisions, and client partnerships.",
    items: [
      {
        title: "Precision Engineering",
        text: "We write maintainable, modular, and thoroughly tested code adhering to domain-driven design and modern clean architectures.",
      },
      {
        title: "Absolute IP Security",
        text: "Every partnership is protected under strict international NDAs. Isolated repositories, encrypted networks, and SOC2/ISO aligned procedures.",
      },
      {
        title: "Radical Transparency",
        text: "Daily syncs with bilingual tech leads, 2-week demo releases, and total real-time visibility through Jira, GitHub, and Slack.",
      },
      {
        title: "Long-Term Value",
        text: "We build software designed for horizontal scale and minimal technical debt, ensuring low maintenance overhead for years to come.",
      },
    ] satisfies Item[],
  },
  lifecycle: {
    eyebrow: "How We Operate",
    title: "Our Software Development Lifecycle",
    text: "Structured engineering practices that turn complex requirements into high-performance software with zero surprises.",
    steps: [
      {
        step: "01",
        title: "Discovery & Blueprint",
        text: "Deep requirements breakdown, cloud architecture design, system sizing, and sprint milestone scheduling.",
      },
      {
        step: "02",
        title: "Agile Sprint Delivery",
        text: "2-week continuous delivery cycles, daily standups, clean code commits, and mandatory peer code reviews.",
      },
      {
        step: "03",
        title: "QA & Security Audits",
        text: "Automated regression test suites, penetration checks, load stress testing, and vulnerability compliance gates.",
      },
      {
        step: "04",
        title: "Deploy & 24/7 SLA",
        text: "Zero-downtime CI/CD container rollout, real-time observability dashboards, and dedicated tier-3 support.",
      },
    ] satisfies Step[],
  },
  cta: {
    title: "Looking for a Dependable Engineering Partner?",
    text: "Connect with our solutions architects to receive an architecture review and tailored project roadmap.",
    label: "Talk to an Engineer",
    href: "/contact",
  } satisfies Cta,
};

export const services = {
  meta: {
    title: "Services & Solutions - Cortexia Software Outsourcing & Telecom",
    description:
      "Explore Cortexia's engineering services: Custom Software Development, Mobile Apps, Dedicated Offshore Teams, Telecom Systems, and Cloud DevOps.",
  } satisfies Meta,
  hero: {
    eyebrow: "Full-Stack Outsourcing & Telecom Solutions",
    title: "Enterprise Services & Solutions",
    text: "From carrier-grade telecom platforms and autonomous AI agent systems to dedicated offshore engineering pods.",
  },
  intro: {
    eyebrow: "Engineering Excellence",
    title: "Tailored Software & Telecom Services",
    text: "From individual technical modules to full turnkey systems, Cortexia provides end-to-end engineering excellence across the technology spectrum.",
  },
  engagement: {
    eyebrow: "Flexible Partnership",
    title: "Our Engagement Models",
    models: [
      {
        title: "Dedicated Team (ODC)",
        text: "Ideal for long-term product roadmaps and enterprises requiring scalable engineering bandwidth.",
        bullets: ["Monthly retainer billing", "Direct control of backlog & priorities", "Dedicated full-time senior engineers"],
      },
      {
        title: "Fixed-Price Project",
        badge: "Most Popular",
        text: "Ideal for clearly defined project scopes, MVPs, system migrations, or independent modules.",
        bullets: ["Guaranteed delivery timeline", "Milestone-based payment schedule", "Transparent risk mitigation"],
      },
      {
        title: "Time & Materials (T&M)",
        text: "Ideal for evolving specifications, advisory, proof of concept prototyping, or ad-hoc support.",
        bullets: ["Pay strictly for hours consumed", "Pivot scope on short notice", "Detailed timesheet verification"],
      },
    ] as { title: string; badge?: string; text: string; bullets: string[] }[],
  },
  cta: {
    title: "Need a Tailored Technical Proposal?",
    text: "Send us your scope or project brief to receive an architect-level estimate within 24 hours.",
    label: "Request a Proposal",
    href: "/contact",
  } satisfies Cta,
};

export const portfolio = {
  meta: {
    title: "Portfolio & Case Studies - Cortexia Software Outsourcing & Telecom",
    description:
      "Review Cortexia's portfolio of delivered software engineering projects, telecommunications platforms, and cloud modernization case studies.",
  } satisfies Meta,
  hero: {
    eyebrow: "Explore Our Domain Expertise",
    title: "Our Engineering Portfolio",
    text: "Explore verified case studies spanning real-time telecom intelligence, autonomous AI agent gateways, and mission-critical ERPs.",
  },
  cases: {
    eyebrow: "Featured Work",
    title: "Featured Case Studies & Systems",
    text: "Discover how our cross-functional engineering teams architect, deploy, and scale high-demand systems for enterprise clients.",
  },
  cta: {
    title: "Have a Similar Project in Mind?",
    text: "Connect with our architecture team to discuss technical feasibility, technology selection, and delivery timelines.",
    label: "Discuss Your Architecture",
    href: "/contact",
  } satisfies Cta,
};

export const contact = {
  meta: {
    title: "Contact Us - Cortexia Software Outsourcing & Telecom Solutions",
    description:
      "Contact Cortexia to request a project proposal, technical consultation, or explore dedicated software development teams.",
  } satisfies Meta,
  hero: {
    eyebrow: "Start Your Next Project With Us",
    title: "Get in Touch with Cortexia",
    text: "Speak directly with our principal architects to evaluate technical feasibility, system architecture, and dedicated development pods.",
  },
  process: {
    title: "What Happens After You Inquire?",
    steps: [
      {
        step: "1",
        title: "Mutual NDA & Scope Review",
        text: "We execute a standard mutual non-disclosure agreement to protect all your proprietary technical specs and code repositories.",
      },
      {
        step: "2",
        title: "24-Hour SLA Feasibility Analysis",
        text: "Our principal software architects evaluate technical requirements, team composition, and deployment roadmap.",
      },
      {
        step: "3",
        title: "Tailored Proposal & Pod Onboarding",
        text: "Receive a milestone roadmap, transparent developer profiles, pricing options, and trial deliverables.",
      },
    ] satisfies Step[],
  },
  form: {
    eyebrow: "Request a Proposal",
    title: "Start Your Software Project",
    text: "Fill out the form below. A senior technical solutions manager will respond with an initial analysis within 24 business hours.",
    servicePlaceholder: "Service Required",
    serviceOptions: [
      "Custom Software Development",
      "Dedicated Offshore Team (ODC)",
      "Telecom & VoIP Infrastructure",
      "Mobile Application (iOS/Android)",
      "Cloud Migration & DevOps",
      "General Partnership Inquiry",
    ],
    submit: "Submit Inquiry",
  },
};
