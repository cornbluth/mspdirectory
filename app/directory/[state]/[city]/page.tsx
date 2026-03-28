import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { TOP_50_CITIES, getCityBySlug } from "@/lib/cities";
import { msps } from "@/lib/mock-data";
import MSPCard from "@/components/MSPCard";

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return TOP_50_CITIES.map((city) => ({
    state: city.stateSlug,
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const cityData = getCityBySlug(state, city);
  if (!cityData) return { title: "City Not Found" };

  return {
    title: `Managed Service Providers in ${cityData.name}, ${cityData.state} | MSPDirectory.io`,
    description: `Find the best managed service providers (MSPs) in ${cityData.name}, ${cityData.state}. Compare IT support, cybersecurity, cloud services, and more from local MSPs serving ${cityData.name} businesses.`,
  };
}

const CITY_INTROS: Record<string, string> = {
  "new-york": "New York City's fast-paced business environment demands reliable IT support. With thousands of businesses across finance, media, and tech, NYC has a robust ecosystem of MSPs ready to support your operations.",
  "los-angeles": "Los Angeles is home to a diverse mix of entertainment, tech, and small businesses — all with growing IT needs. Local MSPs in LA specialize in everything from studio infrastructure to startup security.",
  "chicago": "Chicago's thriving business district and manufacturing sector depend on solid IT infrastructure. MSPs in the Windy City offer enterprise-grade managed services tailored to Midwest businesses.",
  "houston": "As the energy capital of the US, Houston businesses rely on specialized IT services for industrial control systems, compliance, and cloud migrations. Find MSPs experienced in oil & gas and healthcare.",
  "phoenix": "Phoenix is one of the fastest-growing metro areas in the US, driving strong demand for IT services. Local MSPs cater to healthcare, real estate, and the booming tech sector.",
  "philadelphia": "Philadelphia's mix of healthcare systems, universities, and small businesses creates unique IT needs. MSPs here bring deep expertise in HIPAA compliance and enterprise infrastructure.",
  "san-antonio": "San Antonio has a strong military and healthcare presence, driving demand for secure, compliant IT services. Local MSPs are experienced in government contracting and medical IT.",
  "san-diego": "San Diego's biotech, defense, and tourism industries require specialized IT support. MSPs in America's Finest City offer cutting-edge cybersecurity and cloud solutions.",
  "dallas": "Dallas is a major tech and finance hub in the South. MSPs serving the Dallas metro bring enterprise-grade solutions for banking, insurance, and the growing startup ecosystem.",
  "san-jose": "At the heart of Silicon Valley, San Jose businesses expect world-class IT support. Local MSPs offer deep expertise in cloud architecture, DevOps, and enterprise security.",
  "austin": "Austin's booming tech scene and business-friendly climate attract companies needing scalable IT solutions. MSPs in Austin specialize in supporting high-growth startups and enterprise teams.",
  "jacksonville": "Jacksonville's logistics, financial services, and military sectors drive steady demand for managed IT. Local MSPs offer cost-effective solutions for mid-market businesses.",
  "fort-worth": "Fort Worth's energy, aerospace, and retail sectors need reliable IT infrastructure. MSPs here serve both large enterprises and the growing small business community.",
  "columbus": "Columbus is a rising tech and logistics hub in the Midwest. MSPs in Columbus support retail tech, insurance, and healthcare organizations with modern managed services.",
  "charlotte": "Charlotte is a major banking and financial services center. MSPs here bring expertise in financial compliance, cybersecurity, and enterprise IT for the banking sector.",
  "indianapolis": "Indianapolis is home to a strong healthcare, logistics, and manufacturing base. MSPs serve both large hospital systems and small businesses across the metro area.",
  "san-francisco": "San Francisco's tech-first culture means businesses expect best-in-class IT. MSPs in SF offer cutting-edge cloud, security, and DevOps services for startups and enterprises alike.",
  "seattle": "Seattle's thriving tech, retail, and aerospace industries make IT services critical. MSPs here are experienced with major cloud platforms and enterprise infrastructure.",
  "denver": "Denver's booming economy attracts a wide range of businesses. MSPs in Denver specialize in cloud migration, cybersecurity, and compliance for the rapidly growing Front Range market.",
  "nashville": "Nashville's healthcare, music, and hospitality industries need specialized IT support. MSPs here offer HIPAA-compliant services and robust support for fast-growing businesses.",
};

function getCityIntro(citySlug: string, cityName: string, stateName: string): string {
  return (
    CITY_INTROS[citySlug] ||
    `${cityName}, ${stateName} has a growing business community with increasing demand for managed IT services. Local MSPs offer cybersecurity, cloud solutions, help desk support, and more — tailored to businesses in the ${cityName} metro area.`
  );
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const cityData = getCityBySlug(state, city);
  if (!cityData) notFound();

  // Filter MSPs by state; fall back to all MSPs if none match
  const stateMSPs = msps.filter(
    (msp) => (msp.state ?? "").toUpperCase() === cityData.state
  );
  const displayMSPs = stateMSPs.length > 0 ? stateMSPs : msps.slice(0, 12);

  const intro = getCityIntro(city, cityData.name, cityData.state);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/directory" className="hover:text-blue-600">Directory</Link>
        <span>/</span>
        <span className="text-gray-700">{cityData.name}, {cityData.state}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Managed Service Providers in {cityData.name}, {cityData.state}
      </h1>

      <p className="text-gray-600 text-base leading-relaxed max-w-3xl mb-8">{intro}</p>

      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">
          {displayMSPs.length} provider{displayMSPs.length !== 1 ? "s" : ""} serving {cityData.state}
        </p>
        <Link
          href={`/directory?state=${cityData.state}`}
          className="text-sm text-blue-600 hover:text-blue-700 underline"
        >
          View all {cityData.state} providers →
        </Link>
      </div>

      {displayMSPs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No MSPs listed yet for {cityData.name}.</p>
          <Link href="/directory" className="text-blue-600 text-sm mt-2 inline-block underline">
            Browse all providers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayMSPs.map((msp) => (
            <MSPCard key={msp.id} msp={msp} />
          ))}
        </div>
      )}

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Other Cities in the US
        </h2>
        <div className="flex flex-wrap gap-2">
          {TOP_50_CITIES.filter((c) => c.slug !== city).slice(0, 24).map((c) => (
            <Link
              key={c.slug}
              href={`/directory/${c.stateSlug}/${c.slug}`}
              className="text-sm text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              {c.name}, {c.state}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
