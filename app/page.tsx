import Link from "next/link";
import { msps, SPECIALTIES } from "@/lib/mock-data";
import MSPCard from "@/components/MSPCard";
import AffiliateCTA from "@/components/AffiliateCTA";

export default function HomePage() {
  const featured = msps.filter((m) => m.featured);

  return (
    <main>
      <p style={{display:'none'}}>Impact-Site-Verification: ae0728ff-2fea-4ee0-8bc2-90d55c2a6ad6</p>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Find the Right Managed Service Provider
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Browse hundreds of vetted MSPs by location, specialty, certifications, and more. Get the IT
            support your business deserves.
          </p>

          <form action="/directory" method="GET" className="flex gap-2 max-w-xl mx-auto">
            <input
              type="text"
              name="q"
              placeholder="Search by name, city, or specialty..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-8 justify-center text-sm text-gray-600">
          <div>
            <span className="font-bold text-gray-900 text-xl">1,000+</span> MSPs Listed
          </div>
          <div>
            <span className="font-bold text-gray-900 text-xl">48</span> States Covered
          </div>
          <div>
            <span className="font-bold text-gray-900 text-xl">12</span> Specialties
          </div>
          <div>
            <span className="font-bold text-gray-900 text-xl">4.7★</span> Avg Rating
          </div>
        </div>
      </section>

      {/* Featured MSPs */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured MSPs</h2>
          <Link href="/directory" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((msp) => (
            <MSPCard key={msp.id} msp={msp} />
          ))}
        </div>
      </section>

      {/* Browse by category */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Specialty</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SPECIALTIES.map((spec) => (
              <Link
                key={spec}
                href={`/directory?specialty=${encodeURIComponent(spec)}`}
                className="bg-white border border-gray-200 rounded-xl p-4 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                {spec}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Tools */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <AffiliateCTA />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to find your MSP?</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Use our advanced filters to narrow down the perfect IT partner for your business needs and
          budget.
        </p>
        <Link
          href="/directory"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse All MSPs
        </Link>
      </section>
    </main>
  );
}
