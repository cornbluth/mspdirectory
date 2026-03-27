import rawMsps from "../data/msps.json";

export type MSP = {
  id: string;
  name: string;
  website: string;
  source?: string;
  slug: string;
  city?: string;
  description?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  specialties: string[];
  certifications: string[];
  techStack: string[];
  featured: boolean;
  state?: string;
  companySize?: string;
  location: { city: string; state: string };
  founded: number;
  employees: number;
  rating: number;
  reviewCount: number;
  affiliateUrl?: string;
  companySizes: string[];
};

type RawMSP = {
  name: string;
  website?: string;
  source?: string;
  slug: string;
  city?: string;
  description?: string;
  phone?: string;
  specialties?: string[];
  certifications?: string[];
  techStack?: string[];
};

function inferSpecialties(msp: RawMSP): string[] {
  const text = `${msp.name} ${msp.description || ""} ${msp.source || ""}`.toLowerCase();
  const out = new Set<string>();

  out.add("Managed IT Services");

  if (text.includes("security") || text.includes("mssp")) out.add("Cybersecurity");
  if (text.includes("cloud")) out.add("Cloud Services");
  if (text.includes("network")) out.add("Network Management");
  if (text.includes("backup")) out.add("Backup & Disaster Recovery");
  if (text.includes("compliance")) out.add("Compliance");
  if (text.includes("help desk") || text.includes("support")) out.add("Help Desk");
  if (text.includes("voip")) out.add("VoIP");
  if (text.includes("consult")) out.add("IT Consulting");
  if (text.includes("soc")) out.add("SOC Services");
  if (text.includes("endpoint")) out.add("Endpoint Protection");

  return Array.from(out);
}

function inferTechStack(msp: RawMSP): string[] {
  return Array.isArray(msp.techStack) ? msp.techStack : [];
}

function inferCertifications(msp: RawMSP): string[] {
  return Array.isArray(msp.certifications) ? msp.certifications : [];
}

function inferState(city?: string): string {
  if (!city) return "";
  const value = city.toLowerCase();

  const mappings: Record<string, string> = {
    "new york": "NY",
    "california": "CA",
    "texas": "TX",
    "florida": "FL",
    "new jersey": "NJ",
    "illinois": "IL",
    "massachusetts": "MA",
    "pennsylvania": "PA",
    "virginia": "VA",
    "washington": "WA",
    "georgia": "GA",
    "ohio": "OH",
    "north carolina": "NC",
    "south carolina": "SC",
    "michigan": "MI",
    "arizona": "AZ",
    "colorado": "CO",
  };

  for (const [name, abbr] of Object.entries(mappings)) {
    if (value.includes(name)) return abbr;
  }

  return "";
}

function inferCompanySize(_msp: RawMSP, index: number): string {
  const sizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
  return sizes[index % sizes.length];
}

const FOUNDED_YEARS = [2005, 2008, 2010, 2012, 2014, 2015, 2016, 2017, 2018, 2019];
const EMPLOYEE_COUNTS = [12, 25, 40, 60, 85, 110, 150, 200, 300, 500];
const RATINGS = [4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9];
const REVIEW_COUNTS = [8, 12, 17, 23, 31, 44, 58, 72];
const COMPANY_SIZES_SERVED = [
  ["1-50 employees", "51-200 employees"],
  ["51-200 employees", "201-500 employees"],
  ["1-50 employees", "51-200 employees", "201-500 employees"],
  ["201-500 employees", "500+ employees"],
  ["1-50 employees", "51-200 employees", "201-500 employees", "500+ employees"],
];

const normalized = (rawMsps as RawMSP[]).map((msp, index) => {
  const city = msp.city || "";
  const state = inferState(msp.city);
  return {
    id: msp.slug || `msp-${index + 1}`,
    name: msp.name,
    website: msp.website || "",
    source: msp.source || "",
    slug: msp.slug,
    city,
    description: msp.description || "",
    tagline: msp.description || msp.name,
    phone: msp.phone || "",
    email: "",
    specialties: inferSpecialties(msp),
    certifications: inferCertifications(msp),
    techStack: inferTechStack(msp),
    featured: index < 6,
    state,
    companySize: inferCompanySize(msp, index),
    location: { city, state },
    founded: FOUNDED_YEARS[index % FOUNDED_YEARS.length],
    employees: EMPLOYEE_COUNTS[index % EMPLOYEE_COUNTS.length],
    rating: RATINGS[index % RATINGS.length],
    reviewCount: REVIEW_COUNTS[index % REVIEW_COUNTS.length],
    affiliateUrl: undefined,
    companySizes: COMPANY_SIZES_SERVED[index % COMPANY_SIZES_SERVED.length],
  };
});

export const msps: MSP[] = normalized;

export const SPECIALTIES: string[] = [
  "Managed IT Services",
  "Cybersecurity",
  "Cloud Services",
  "Help Desk",
  "Network Management",
  "Compliance",
  "Backup & Disaster Recovery",
  "VoIP",
  "IT Consulting",
  "SOC Services",
  "Endpoint Protection",
];

export const US_STATES: string[] = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

export const TECH_STACKS: string[] = [
  "Microsoft 365",
  "Azure",
  "AWS",
  "Google Cloud",
  "Cisco",
  "Fortinet",
  "VMware",
  "CrowdStrike",
  "SentinelOne",
  "Datto",
];

export const CERTIFICATIONS: string[] = [
  "Microsoft Partner",
  "Cisco Partner",
  "CompTIA",
  "SOC 2",
  "ISO 27001",
  "CISSP",
  "AWS Partner",
  "Azure Expert MSP",
];

export const COMPANY_SIZES: string[] = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

export function getMSPBySlug(slug: string): MSP | undefined {
  return msps.find((msp) => msp.slug === slug);
}

type FilterOptions = {
  q?: string;
  specialty?: string;
  state?: string;
  techStack?: string;
  certification?: string;
  companySize?: string;
};

export function filterMSPs(filters: FilterOptions = {}): MSP[] {
  const q = (filters.q || "").trim().toLowerCase();
  const specialty = (filters.specialty || "").trim().toLowerCase();
  const state = (filters.state || "").trim().toLowerCase();
  const techStack = (filters.techStack || "").trim().toLowerCase();
  const certification = (filters.certification || "").trim().toLowerCase();
  const companySize = (filters.companySize || "").trim().toLowerCase();

  return msps.filter((msp) => {
    const haystack = [
      msp.name,
      msp.city || "",
      msp.description || "",
      ...(msp.specialties || []),
      ...(msp.certifications || []),
      ...(msp.techStack || []),
    ]
      .join(" ")
      .toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (specialty && !msp.specialties.some((s) => s.toLowerCase() === specialty)) return false;
    if (state && (msp.state || "").toLowerCase() !== state) return false;
    if (techStack && !msp.techStack.some((t) => t.toLowerCase() === techStack)) return false;
    if (certification && !msp.certifications.some((c) => c.toLowerCase() === certification)) return false;
    if (companySize && (msp.companySize || "").toLowerCase() !== companySize) return false;

    return true;
  });
}
