export type MSP = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  website: string;
  phone: string;
  email: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  specialties: string[];
  techStack: string[];
  certifications: string[];
  companySizes: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  founded: number;
  employees: string;
  affiliateUrl?: string;
};

export const SPECIALTIES = [
  "Cybersecurity",
  "Cloud Services",
  "Help Desk / IT Support",
  "Network Management",
  "Backup & Disaster Recovery",
  "VoIP / Communications",
  "Compliance & Governance",
  "DevOps",
];

export const TECH_STACKS = ["Microsoft", "Google Workspace", "AWS", "Apple / Mac", "Linux", "VMware"];

export const CERTIFICATIONS = ["SOC 2", "HIPAA", "CMMC", "ISO 27001", "PCI DSS", "NIST"];

export const COMPANY_SIZES = ["SMB (1–100 employees)", "Mid-Market (100–1,000)", "Enterprise (1,000+)"];

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
];

export const msps: MSP[] = [
  {
    id: "1",
    slug: "shieldtech-solutions",
    name: "ShieldTech Solutions",
    tagline: "Enterprise-grade security for growing businesses",
    description:
      "ShieldTech Solutions has been protecting businesses from cyber threats since 2008. We specialize in proactive cybersecurity, 24/7 monitoring, and compliance management. Our team of certified professionals helps organizations of all sizes stay secure and compliant with the latest regulations including SOC 2, HIPAA, and CMMC.",
    logo: "/logos/shieldtech.svg",
    website: "https://shieldtech.example.com",
    phone: "(800) 555-0101",
    email: "hello@shieldtech.example.com",
    location: { city: "Austin", state: "Texas", country: "US" },
    specialties: ["Cybersecurity", "Compliance & Governance", "Network Management"],
    techStack: ["Microsoft", "AWS"],
    certifications: ["SOC 2", "HIPAA", "CMMC"],
    companySizes: ["SMB (1–100 employees)", "Mid-Market (100–1,000)"],
    featured: true,
    rating: 4.8,
    reviewCount: 142,
    founded: 2008,
    employees: "50–100",
    affiliateUrl: "https://shieldtech.example.com/?ref=mspdirectory",
  },
  {
    id: "2",
    slug: "cloudbridge-it",
    name: "CloudBridge IT",
    tagline: "Seamless cloud migrations and managed infrastructure",
    description:
      "CloudBridge IT is a top-tier cloud solutions provider with deep expertise in Microsoft Azure, Google Workspace, and AWS. We guide businesses through every phase of cloud adoption — from initial assessment and migration to ongoing optimization and support.",
    logo: "/logos/cloudbridge.svg",
    website: "https://cloudbridge.example.com",
    phone: "(800) 555-0202",
    email: "info@cloudbridge.example.com",
    location: { city: "Seattle", state: "Washington", country: "US" },
    specialties: ["Cloud Services", "DevOps", "Backup & Disaster Recovery"],
    techStack: ["Microsoft", "Google Workspace", "AWS"],
    certifications: ["ISO 27001", "SOC 2"],
    companySizes: ["Mid-Market (100–1,000)", "Enterprise (1,000+)"],
    featured: true,
    rating: 4.7,
    reviewCount: 98,
    founded: 2012,
    employees: "100–250",
    affiliateUrl: "https://cloudbridge.example.com/?ref=mspdirectory",
  },
  {
    id: "3",
    slug: "apex-support-group",
    name: "Apex Support Group",
    tagline: "Responsive help desk support your team will love",
    description:
      "Apex Support Group delivers fast, friendly IT support to small and mid-size businesses across the Midwest. With average response times under 15 minutes, our help desk team keeps your employees productive and your systems running. We support Windows, Mac, and Linux environments.",
    logo: "/logos/apex.svg",
    website: "https://apexsupport.example.com",
    phone: "(800) 555-0303",
    email: "support@apexsupport.example.com",
    location: { city: "Chicago", state: "Illinois", country: "US" },
    specialties: ["Help Desk / IT Support", "Network Management", "VoIP / Communications"],
    techStack: ["Microsoft", "Apple / Mac", "Linux"],
    certifications: ["SOC 2"],
    companySizes: ["SMB (1–100 employees)"],
    featured: false,
    rating: 4.6,
    reviewCount: 215,
    founded: 2015,
    employees: "25–50",
    affiliateUrl: "https://apexsupport.example.com/?ref=mspdirectory",
  },
  {
    id: "4",
    slug: "nova-managed-services",
    name: "Nova Managed Services",
    tagline: "Full-stack IT management for healthcare and finance",
    description:
      "Nova Managed Services is the compliance-first MSP for regulated industries. We have extensive experience helping healthcare organizations achieve and maintain HIPAA compliance and financial firms meet PCI DSS requirements. Our comprehensive managed services model gives you a fully outsourced IT department at a fraction of the cost.",
    logo: "/logos/nova.svg",
    website: "https://novamsp.example.com",
    phone: "(800) 555-0404",
    email: "contact@novamsp.example.com",
    location: { city: "New York", state: "New York", country: "US" },
    specialties: ["Compliance & Governance", "Cybersecurity", "Cloud Services"],
    techStack: ["Microsoft", "AWS"],
    certifications: ["HIPAA", "PCI DSS", "SOC 2", "NIST"],
    companySizes: ["SMB (1–100 employees)", "Mid-Market (100–1,000)"],
    featured: true,
    rating: 4.9,
    reviewCount: 76,
    founded: 2010,
    employees: "75–150",
    affiliateUrl: "https://novamsp.example.com/?ref=mspdirectory",
  },
  {
    id: "5",
    slug: "pinnacle-tech-partners",
    name: "Pinnacle Tech Partners",
    tagline: "Apple-first IT management for creative agencies",
    description:
      "Pinnacle Tech Partners is the go-to MSP for creative and media companies running Apple environments. We specialize in macOS device management, creative application support (Adobe, Final Cut Pro, DaVinci Resolve), and Google Workspace administration. Our Apple-certified engineers provide white-glove support that understands your creative workflow.",
    logo: "/logos/pinnacle.svg",
    website: "https://pinnacletech.example.com",
    phone: "(800) 555-0505",
    email: "hello@pinnacletech.example.com",
    location: { city: "Los Angeles", state: "California", country: "US" },
    specialties: ["Help Desk / IT Support", "Cloud Services", "Network Management"],
    techStack: ["Apple / Mac", "Google Workspace"],
    certifications: ["ISO 27001"],
    companySizes: ["SMB (1–100 employees)", "Mid-Market (100–1,000)"],
    featured: false,
    rating: 4.7,
    reviewCount: 189,
    founded: 2016,
    employees: "20–40",
    affiliateUrl: "https://pinnacletech.example.com/?ref=mspdirectory",
  },
];

export function getMSPBySlug(slug: string): MSP | undefined {
  return msps.find((m) => m.slug === slug);
}

export function filterMSPs(params: {
  state?: string;
  specialty?: string;
  techStack?: string;
  certification?: string;
  companySize?: string;
  q?: string;
}): MSP[] {
  return msps.filter((msp) => {
    if (params.state && msp.location.state !== params.state) return false;
    if (params.specialty && !msp.specialties.includes(params.specialty)) return false;
    if (params.techStack && !msp.techStack.includes(params.techStack)) return false;
    if (params.certification && !msp.certifications.includes(params.certification)) return false;
    if (params.companySize && !msp.companySizes.includes(params.companySize)) return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      if (
        !msp.name.toLowerCase().includes(q) &&
        !msp.tagline.toLowerCase().includes(q) &&
        !msp.description.toLowerCase().includes(q) &&
        !msp.location.city.toLowerCase().includes(q) &&
        !msp.location.state.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}
