// Affiliate CTA components — Variant A (sidebar), B (banner), C (grid)
// To update vendors: edit the VENDORS array only. Set active: false to hide.

interface Vendor {
  id: string;
  name: string;
  description: string;
  cta: string;
  href: string;
  active: boolean;
}

const VENDORS: Vendor[] = [
  { id: "acronis", name: "Acronis Cyber Protect", description: "Unified backup & advanced cybersecurity in one platform.", cta: "Try Free", href: "#acronis", active: false },
  { id: "atera", name: "Atera RMM", description: "All-in-one RMM + PSA. Per-technician pricing, unlimited endpoints.", cta: "Try Free 30 Days", href: "https://www.atera.com/partners/", active: true },
  { id: "syncro", name: "Syncro MSP", description: "RMM, PSA, and billing in one platform built for MSPs.", cta: "Start Free Trial", href: "https://syncromsp.com/", active: true },
  { id: "superops", name: "SuperOps", description: "AI-native PSA + RMM built for growth-stage MSPs.", cta: "Book a Demo", href: "https://superops.com/", active: true },
  { id: "keeper", name: "Keeper Security", description: "Zero-knowledge password management and privileged access for MSPs.", cta: "Get Business Trial", href: "https://www.keepersecurity.com/partners/", active: true },
  { id: "bitdefender", name: "Bitdefender GravityZone", description: "Enterprise-grade endpoint protection purpose-built for MSPs.", cta: "Become a Partner", href: "https://www.bitdefender.com/business/partner-program/", active: true },
  { id: "veeam", name: "Veeam", description: "Data protection and ransomware recovery for MSPs.", cta: "Become a Partner", href: "https://www.veeam.com/partnerships/", active: true },
  { id: "hudu", name: "Hudu", description: "Fast, modern IT documentation built exclusively for MSPs.", cta: "Start Free Trial", href: "https://www.hudu.com/", active: true },
  { id: "ninjaone", name: "NinjaOne", description: "The #1-rated RMM. Manage, patch, and support every endpoint from one pane.", cta: "Get a Demo", href: "#ninjaone", active: false },
];

const active = VENDORS.filter((v) => v.active);

export function AffiliateCTASidebar() {
  const vendors = active.slice(0, 3);
  if (vendors.length === 0) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Tools top MSPs use</h3>
      <div className="space-y-3">
        {vendors.map((v) => (
          <div key={v.id} className="relative border border-gray-100 rounded-xl p-3 hover:border-blue-200 transition-colors">
            <span className="absolute top-2 right-2 text-[9px] text-gray-400 uppercase tracking-wide">Sponsored</span>
            <p className="font-semibold text-sm text-gray-900 pr-14">{v.name}</p>
            <p className="text-xs text-gray-500 mt-0.5 mb-2">{v.description}</p>
            <a href={v.href} target="_blank" rel="sponsored noopener noreferrer" className="inline-block text-xs font-semibold text-blue-600 hover:text-blue-700">{v.cta} →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AffiliateCTABanner() {
  const vendors = active.slice(0, 4);
  if (vendors.length === 0) return null;
  return (
    <div className="col-span-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">Tools used by top MSPs</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        {vendors.map((v, i) => (
          <span key={v.id} className="flex items-center gap-4">
            <a href={v.href} target="_blank" rel="sponsored noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">{v.name}</a>
            {i < vendors.length - 1 && <span className="text-gray-300 hidden sm:inline">·</span>}
          </span>
        ))}
      </div>
      <span className="text-[10px] text-gray-400 sm:ml-auto shrink-0">Sponsored</span>
    </div>
  );
}

export function AffiliateCTAGrid({ mspName }: { mspName: string }) {
  const vendors = active.slice(0, 3);
  if (vendors.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Software used by MSPs like {mspName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendors.map((v) => (
          <div key={v.id} className="relative bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <span className="absolute top-3 right-3 text-[9px] text-gray-400 uppercase tracking-wide">Sponsored</span>
            <p className="font-semibold text-gray-900 mb-1 pr-16">{v.name}</p>
            <p className="text-sm text-gray-500 mb-4">{v.description}</p>
            <a href={v.href} target="_blank" rel="sponsored noopener noreferrer" className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">{v.cta} →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AffiliateCTA({ className = "" }: { className?: string }) {
  if (active.length === 0) return null;
  return (
    <section className={`my-8 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-700 mb-4 tracking-tight">Recommended Tools for MSPs</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {active.map((v) => (
          <div key={v.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow">
            <p className="font-semibold text-gray-900 text-base mb-1">{v.name}</p>
            <p className="text-sm text-gray-600 flex-1 mb-4 leading-relaxed">{v.description}</p>
            <a href={v.href} target="_blank" rel="sponsored noopener noreferrer" className="self-start inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">{v.cta}</a>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">Some links on this page are affiliate links. We may earn a commission at no extra cost to you.</p>
    </section>
  );
}
