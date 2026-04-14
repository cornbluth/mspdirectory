import Link from "next/link";
import { MSP } from "@/lib/mock-data";

export default function MSPCard({ msp }: { msp: MSP }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{msp.name}</h3>
          <p className="text-sm text-gray-500">
            {msp.location.city}, {msp.location.state}
          </p>
        </div>
        {msp.featured && (
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
            Featured
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{msp.tagline}</p>

      <div className="flex flex-wrap gap-1.5">
        {msp.specialties.slice(0, 3).map((s) => (
          <span key={s} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-yellow-500">
          <span>★</span>
          <span className="font-medium text-gray-700">{msp.rating}</span>
          <span className="text-gray-400">({msp.reviewCount})</span>
        </div>
        <Link
          href={`/msp/${msp.slug}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
}
