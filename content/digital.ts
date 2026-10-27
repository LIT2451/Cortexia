/** NỘI DUNG MẪU: số liệu, case study và lời chứng thực dưới đây do AI soạn,
 *  chủ site PHẢI xác nhận tính đúng trước khi phát hành. */

export type Stat = { value: string; label: string };
export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  summary: string;
  technologies: string[];
  results: { metric: string; label: string }[];
  /** Optional content image; alt must describe the image. */
  image?: { src: string; alt: string };
};
export type Testimonial = { quote: string; role: string; companyType: string };

export const stats: Stat[] = [
  { value: "120+", label: "Digital Transformation Projects" },
  { value: "40+", label: "Digital Platforms Launched" },
  { value: "5M+", label: "End Users Served" },
  { value: "99.95%", label: "Platform Uptime" },
];

export const featuredCase: CaseStudy = {
  slug: "omnichannel-commerce-platform",
  name: "Omnichannel Commerce & Customer Data Platform",
  industry: "Retail & E-commerce",
  summary:
    "Unified web storefront, mobile app and in-store POS on a headless commerce core with a real-time customer data platform, giving the retailer one view of every customer and order.",
  technologies: ["Next.js", "Node.js", "PostgreSQL", "Kafka", "Kubernetes"],
  results: [
    { metric: "38%", label: "Increase in online conversion rate" },
    { metric: "2.1x", label: "Faster page load on mobile" },
    { metric: "60%", label: "Less time to launch campaigns" },
  ],
};

export const portfolioCases: CaseStudy[] = [
  {
    slug: "core-banking-digital-onboarding",
    name: "Digital Onboarding & eKYC Platform",
    industry: "Banking & Financial Services",
    summary:
      "Paperless account opening with eKYC, e-signature and automated risk scoring, replacing branch-based onboarding.",
    technologies: ["React Native", "Java Spring", "PostgreSQL", "AWS"],
    results: [
      { metric: "8 min", label: "Average account opening time" },
      { metric: "70%", label: "Reduction in onboarding cost" },
    ],
  },
  {
    slug: "b2b-marketplace",
    name: "B2B Wholesale Marketplace",
    industry: "Distribution & Wholesale",
    summary:
      "Multi-vendor marketplace with tiered pricing, credit terms and ERP integration for thousands of retail buyers.",
    technologies: ["Next.js", "Golang", "Elasticsearch", "Redis"],
    results: [
      { metric: "3x", label: "Growth in monthly order volume" },
      { metric: "45%", label: "Fewer manual order errors" },
    ],
  },
  {
    slug: "data-lakehouse-ai-insights",
    name: "Data Lakehouse & AI Insights Hub",
    industry: "Manufacturing",
    summary:
      "Centralized lakehouse combining production, sales and supply data with demand forecasting models and self-service dashboards.",
    technologies: ["Python", "Apache Spark", "dbt", "Power BI"],
    results: [
      { metric: "25%", label: "Lower inventory holding cost" },
      { metric: "90%", label: "Reports automated" },
    ],
  },
  {
    slug: "marketing-automation-suite",
    name: "Marketing Automation & Loyalty Suite",
    industry: "Consumer Goods",
    summary:
      "Customer segmentation, personalized campaigns and a points-based loyalty program across email, SMS and mobile push.",
    technologies: ["Node.js", "React", "MongoDB", "Google Cloud"],
    results: [
      { metric: "32%", label: "Increase in repeat purchases" },
      { metric: "4.5x", label: "Return on campaign spend" },
    ],
  },
  {
    slug: "telehealth-patient-portal",
    name: "Telehealth & Patient Portal",
    industry: "Healthcare",
    summary:
      "Online booking, video consultations and digital medical records for a multi-clinic network, built with strict data privacy controls.",
    technologies: ["Flutter", "Python FastAPI", "WebRTC", "Azure"],
    results: [
      { metric: "200K+", label: "Consultations per year" },
      { metric: "50%", label: "Shorter patient wait time" },
    ],
  },
  {
    slug: "cloud-modernization-saas",
    name: "Legacy-to-SaaS Cloud Modernization",
    industry: "Logistics",
    summary:
      "Re-platformed a monolithic on-premise system into multi-tenant SaaS microservices with CI/CD and observability.",
    technologies: ["Kubernetes", "Terraform", "Golang", "GitHub Actions"],
    results: [
      { metric: "40%", label: "Lower infrastructure cost" },
      { metric: "10x", label: "More frequent releases" },
    ],
  },
];

export const serviceCases: CaseStudy[] = [
  {
    slug: "ai-customer-service-assistant",
    name: "AI Customer Service Assistant",
    industry: "Telecommunications & Digital Services",
    summary:
      "Generative AI assistant on web chat and messaging apps that answers billing and service questions from a private knowledge base and hands off to human agents when needed.",
    technologies: ["Python", "LLM APIs", "Vector Database", "Docker"],
    results: [
      { metric: "65%", label: "Inquiries resolved without an agent" },
      { metric: "24/7", label: "Customer support coverage" },
    ],
  },
  {
    slug: "digital-workplace-platform",
    name: "Digital Workplace & Workflow Platform",
    industry: "Enterprise Services",
    summary:
      "Low-code workflow engine, e-approval and document management that replaced paper processes across departments.",
    technologies: ["React", "Node.js", "PostgreSQL", "Kubernetes"],
    results: [
      { metric: "80%", label: "Processes digitized" },
      { metric: "3 days", label: "Saved per approval cycle" },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Cortexia rebuilt our e-commerce stack in under six months. Conversion is up and our marketing team can launch campaigns without waiting on IT.",
    role: "Chief Digital Officer",
    companyType: "Retail chain",
  },
  {
    quote:
      "Their engineers understood both the regulatory side and the user experience. Digital onboarding is now our fastest-growing channel.",
    role: "Head of Digital Banking",
    companyType: "Commercial bank",
  },
  {
    quote:
      "The data platform finally gave our leadership one source of truth. Forecasts that took a week now refresh every morning.",
    role: "IT Director",
    companyType: "Manufacturing group",
  },
];
