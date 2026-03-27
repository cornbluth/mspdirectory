import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About MSPDirectory.io",
  description:
    "Learn about MSPDirectory.io — the independent directory helping businesses find the right Managed Service Provider.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About MSPDirectory.io</h1>
      <p className="text-gray-500 text-lg mb-10 leading-relaxed">
        MSPDirectory.io is an independent directory helping businesses of all sizes find and evaluate
        Managed Service Providers (MSPs) across the United States.
      </p>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p>
            Choosing the right IT partner is one of the most important decisions a business can make.
            We make that process transparent and efficient by providing detailed, verified profiles for
            MSPs across every specialty, tech stack, and compliance framework.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What We Cover</h2>
          <ul className="list-disc list-inside space-y-1.5 text-gray-600">
            <li>Cybersecurity &amp; compliance (SOC 2, HIPAA, CMMC, ISO 27001)</li>
            <li>Cloud migration and managed cloud (Azure, AWS, Google Workspace)</li>
            <li>Help desk and end-user support</li>
            <li>Network management and infrastructure</li>
            <li>Backup, disaster recovery, and business continuity</li>
            <li>VoIP and unified communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Affiliate Disclosure</h2>
          <p>
            Some MSP profiles on this site include affiliate links. When you click through and engage
            with a provider, we may receive a referral fee at no additional cost to you. This helps us
            keep the directory free and up to date. We do not accept payment for rankings or reviews.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Get Listed</h2>
          <p>
            Are you an MSP that wants to be featured in our directory? We&apos;re onboarding new
            providers now. Reach out to{" "}
            <a href="mailto:listings@mspdirectory.io" className="text-blue-600 hover:underline">
              listings@mspdirectory.io
            </a>{" "}
            to learn more.
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link
          href="/directory"
          className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse MSPs →
        </Link>
      </div>
    </main>
  );
}
