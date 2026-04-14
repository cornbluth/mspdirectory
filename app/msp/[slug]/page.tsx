import { notFound } from "next/navigation";
import Link from "next/link";
import { getMSPBySlug, msps } from "@/lib/mock-data";
import { AffiliateCTASidebar, AffiliateCTAGrid } from "@/components/AffiliateCTA";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return msps.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const msp = getMSPBySlug(slug);
  if (!msp) return { title: "MSP Not Found" };

  const title = `${msp.name} | MSPDirectory.io`;
  const description =
    msp.description ||
    `${msp.name} is a managed service provider${msp.location.city ? ` based in ${msp.location.city}` : ""} offering ${msp.specialties.slice(0, 3).join(", ")}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mspdirectory.io/msp/${slug}`,
      siteName: "MSPDirectory.io",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://mspdirectory.io/msp/${slug}`,
    },
  };
}

export default async function MSPProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const msp = getMSPBySlug(slug);
  if (!msp) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href="/directory"
        className="text-sm text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Back to Directory
      </Link>

      {/* Header card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{msp.name}</h1>
              {msp.featured && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>
            <p className="text-gray-500 text-lg mb-1">{msp.tagline}</p>
            <p className="text-sm text-gray-400">
              {msp.location.city && `${msp.location.city}, `}
              {msp.location.state && `${msp.location.state} · `}
              Founded {msp.founded} · {msp.employees} employees
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-1 text-yellow-500 text-lg">
              <span>★</span>
              <span className="font-bold text-gray-800">{msp.rating}</span>
              <span className="text-sm text-gray-400">({msp.reviewCount} reviews)</span>
            </div>
            <a
              href={msp.affiliateUrl ?? msp.website}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
            >
              Visit Website →
            </a>
            {msp.phone && (
              <a
                href={`tel:${msp.phone}`}
                className="text-sm text-gray-500 hover:text-gray-700 text-center"
              >
                {msp.phone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Affiliate CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-semibold text-lg">Not sure which MSP is right for you?</p>
          <p className="text-blue-100 text-sm mt-0.5">
            Get a free IT audit and find the best fit for your business.
          </p>
        </div>
        <a
          href="https://lakesidetech.co/ai-gtm"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm whitespace-nowrap text-center"
        >
          Get a Free IT Audit →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {msp.description && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About {msp.name}</h2>
              <p className="text-gray-600 leading-relaxed">{msp.description}</p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {msp.specialties.map((s) => (
                <Link
                  key={s}
                  href={`/directory?specialty=${encodeURIComponent(s)}`}
                  className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {msp.companySizes.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Company Sizes Served</h2>
              <div className="space-y-1.5">
                {msp.companySizes.map((s) => (
                  <div key={s} className="text-sm text-gray-600">
                    ✓ {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {msp.techStack.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {msp.techStack.map((t) => (
                  <span
                    key={t}
                    className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {msp.certifications.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {msp.certifications.map((c) => (
                  <span
                    key={c}
                    className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              {msp.phone && <div>{msp.phone}</div>}
              {msp.email && <div>{msp.email}</div>}
              {msp.website && (
                <a
                  href={msp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block"
                >
                  {msp.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Ready to find the right MSP?
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Get a free IT audit tailored to your business needs.
            </p>
            <a
              href="https://lakesidetech.co/ai-gtm"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Get a Free IT Audit →
            </a>
          </div>

          {/* Variant A — sticky affiliate sidebar widget */}
          <div className="lg:sticky lg:top-6">
            <AffiliateCTASidebar />
          </div>
        </div>
      </div>

      {/* Variant C — bottom 3-column affiliate grid */}
      <AffiliateCTAGrid mspName={msp.name} />
    </main>
  );
}
