import Link from "next/link";
import {
  filterMSPs,
  SPECIALTIES,
  TECH_STACKS,
  CERTIFICATIONS,
  COMPANY_SIZES,
  US_STATES,
} from "@/lib/mock-data";
import MSPCard from "@/components/MSPCard";
import { AffiliateCTABanner } from "@/components/AffiliateCTA";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    state?: string;
    specialty?: string;
    techStack?: string;
    certification?: string;
    companySize?: string;
  }>;
}

export default async function DirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const results = filterMSPs(params);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse MSPs</h1>
      <p className="text-gray-500 mb-8">
        {results.length} provider{results.length !== 1 ? "s" : ""} found
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-64 shrink-0">
          <form method="GET" className="space-y-5">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Name, city, keyword..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                name="state"
                defaultValue={params.state ?? ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All States</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <select
                name="specialty"
                defaultValue={params.specialty ?? ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
              <select
                name="techStack"
                defaultValue={params.techStack ?? ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Stacks</option>
                {TECH_STACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
              <select
                name="certification"
                defaultValue={params.certification ?? ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Any Certification</option>
                {CERTIFICATIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Size Served
              </label>
              <select
                name="companySize"
                defaultValue={params.companySize ?? ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Any Size</option>
                {COMPANY_SIZES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Apply Filters
            </button>

            {Object.values(params).some(Boolean) && (
              <Link
                href="/directory"
                className="block text-center text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all filters
              </Link>
            )}
          </form>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {results.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No MSPs found matching your criteria.</p>
              <Link href="/directory" className="text-blue-600 text-sm mt-2 inline-block underline">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {results.flatMap((msp, i) => {
                const card = <MSPCard key={msp.id} msp={msp} />;
                if ((i + 1) % 5 === 0 && i < results.length - 1) {
                  return [card, <AffiliateCTABanner key={`banner-${i}`} />];
                }
                return [card];
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
