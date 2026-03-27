import msps from "../data/msps.json";

export type MSP = {
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

export const mockMSPs: MSP[] = msps as MSP[];

export function getFeaturedMSPs(limit = 12): MSP[] {
  return mockMSPs.slice(0, limit);
}

export function getAllMSPs(): MSP[] {
  return mockMSPs;
}

export function getMSPBySlug(slug: string): MSP | undefined {
  return mockMSPs.find((msp) => msp.slug === slug);
}
