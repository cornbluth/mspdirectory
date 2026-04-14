// Affiliate CTA components — Variant A (sidebar), B (banner), C (grid)

// ── Variant A ─────────────────────────────────────────────────────────────────
// Sidebar widget for /msp/[slug] right column
export function AffiliateCTASidebar() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Tools top MSPs use
      </h3>

      <div className="space-y-3">
        {/* Acronis */}
        <div className="relative border border-gray-100 rounded-xl p-3 hover:border-blue-200 transition-colors">
          <span className="absolute top-2 right-2 text-[9px] text-gray-400 uppercase tracking-wide">
            Sponsored
          </span>
          <p className="font-semibold text-sm text-gray-900 pr-14">Acronis Cyber Protect</p>
          <p className="text-xs text-gray-500 mt-0.5 mb-2">
            Unified backup & advanced cybersecurity in one platform.
          </p>
          <a
            href="#acronis"
            rel="sponsored noopener"
            className="inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Try Free →
          </a>
        </div>

        {/* Malwarebytes */}
        <div className="relative border border-gray-100 rounded-xl p-3 hover:border-blue-200 transition-colors">
          <span className="absolute top-2 right-2 text-[9px] text-gray-400 uppercase tracking-wide">
            Sponsored
          </span>
          <p className="font-semibold text-sm text-gray-900 pr-14">Malwarebytes for Teams</p>
          <p className="text-xs text-gray-500 mt-0.5 mb-2">
            Endpoint protection built for MSPs and SMB clients.
          </p>
          <a
            href="#malwarebytes"
            rel="sponsored noopener"
            className="inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Try Free →
          </a>
        </div>

        {/* 1Password */}
        <div className="relative border border-gray-100 rounded-xl p-3 hover:border-blue-200 transition-colors">
          <span className="absolute top-2 right-2 text-[9px] text-gray-400 uppercase tracking-wide">
            Sponsored
          </span>
          <p className="font-semibold text-sm text-gray-900 pr-14">1Password Business</p>
          <p className="text-xs text-gray-500 mt-0.5 mb-2">
            Password management and secrets automation for teams.
          </p>
          <a
            href="#1password"
            rel="sponsored noopener"
            className="inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Try Free →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Variant B ─────────────────────────────────────────────────────────────────
// Horizontal banner that appears every 5th listing card (col-span-full in grid)
export function AffiliateCTABanner() {
  return (
    <div className="col-span-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">
        Tools used by top MSPs
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <a
          href="#acronis"
          rel="sponsored noopener"
          className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
        >
          Acronis
        </a>
        <span className="text-gray-300 hidden sm:inline">·</span>
        <a
          href="#malwarebytes"
          rel="sponsored noopener"
          className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
        >
          Malwarebytes
        </a>
        <span className="text-gray-300 hidden sm:inline">·</span>
        <a
          href="#1password"
          rel="sponsored noopener"
          className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
        >
          1Password
        </a>
      </div>
      <span className="text-[10px] text-gray-400 sm:ml-auto shrink-0">Sponsored</span>
    </div>
  );
}

// ── Variant C ─────────────────────────────────────────────────────────────────
// Bottom of profile page — 3-column horizontal grid
export function AffiliateCTAGrid({ mspName }: { mspName: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Software used by MSPs like {mspName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Acronis */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
          <span className="absolute top-3 right-3 text-[9px] text-gray-400 uppercase tracking-wide">
            Sponsored
          </span>
          <p className="font-semibold text-gray-900 mb-1 pr-16">Acronis Cyber Protect</p>
          <p className="text-sm text-gray-500 mb-4">
            Unified backup & advanced cybersecurity in one platform.
          </p>
          <a
            href="#acronis"
            rel="sponsored noopener"
            className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Free →
          </a>
        </div>

        {/* Malwarebytes */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
          <span className="absolute top-3 right-3 text-[9px] text-gray-400 uppercase tracking-wide">
            Sponsored
          </span>
          <p className="font-semibold text-gray-900 mb-1 pr-16">Malwarebytes for Teams</p>
          <p className="text-sm text-gray-500 mb-4">
            Endpoint protection built for MSPs and SMB clients.
          </p>
          <a
            href="#malwarebytes"
            rel="sponsored noopener"
            className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Free →
          </a>
        </div>

        {/* 1Password */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
          <span className="absolute top-3 right-3 text-[9px] text-gray-400 uppercase tracking-wide">
            Sponsored
          </span>
          <p className="font-semibold text-gray-900 mb-1 pr-16">1Password Business</p>
          <p className="text-sm text-gray-500 mb-4">
            Password management and secrets automation for teams.
          </p>
          <a
            href="#1password"
            rel="sponsored noopener"
            className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Free →
          </a>
        </div>
      </div>
    </section>
  );
}
