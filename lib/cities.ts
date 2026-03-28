export type City = {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
};

export const TOP_50_CITIES: City[] = [
  { name: "New York", slug: "new-york", state: "NY", stateSlug: "ny" },
  { name: "Los Angeles", slug: "los-angeles", state: "CA", stateSlug: "ca" },
  { name: "Chicago", slug: "chicago", state: "IL", stateSlug: "il" },
  { name: "Houston", slug: "houston", state: "TX", stateSlug: "tx" },
  { name: "Phoenix", slug: "phoenix", state: "AZ", stateSlug: "az" },
  { name: "Philadelphia", slug: "philadelphia", state: "PA", stateSlug: "pa" },
  { name: "San Antonio", slug: "san-antonio", state: "TX", stateSlug: "tx" },
  { name: "San Diego", slug: "san-diego", state: "CA", stateSlug: "ca" },
  { name: "Dallas", slug: "dallas", state: "TX", stateSlug: "tx" },
  { name: "San Jose", slug: "san-jose", state: "CA", stateSlug: "ca" },
  { name: "Austin", slug: "austin", state: "TX", stateSlug: "tx" },
  { name: "Jacksonville", slug: "jacksonville", state: "FL", stateSlug: "fl" },
  { name: "Fort Worth", slug: "fort-worth", state: "TX", stateSlug: "tx" },
  { name: "Columbus", slug: "columbus", state: "OH", stateSlug: "oh" },
  { name: "Charlotte", slug: "charlotte", state: "NC", stateSlug: "nc" },
  { name: "Indianapolis", slug: "indianapolis", state: "IN", stateSlug: "in" },
  { name: "San Francisco", slug: "san-francisco", state: "CA", stateSlug: "ca" },
  { name: "Seattle", slug: "seattle", state: "WA", stateSlug: "wa" },
  { name: "Denver", slug: "denver", state: "CO", stateSlug: "co" },
  { name: "Nashville", slug: "nashville", state: "TN", stateSlug: "tn" },
  { name: "Oklahoma City", slug: "oklahoma-city", state: "OK", stateSlug: "ok" },
  { name: "El Paso", slug: "el-paso", state: "TX", stateSlug: "tx" },
  { name: "Washington", slug: "washington", state: "DC", stateSlug: "dc" },
  { name: "Boston", slug: "boston", state: "MA", stateSlug: "ma" },
  { name: "Memphis", slug: "memphis", state: "TN", stateSlug: "tn" },
  { name: "Louisville", slug: "louisville", state: "KY", stateSlug: "ky" },
  { name: "Portland", slug: "portland", state: "OR", stateSlug: "or" },
  { name: "Las Vegas", slug: "las-vegas", state: "NV", stateSlug: "nv" },
  { name: "Baltimore", slug: "baltimore", state: "MD", stateSlug: "md" },
  { name: "Milwaukee", slug: "milwaukee", state: "WI", stateSlug: "wi" },
  { name: "Albuquerque", slug: "albuquerque", state: "NM", stateSlug: "nm" },
  { name: "Tucson", slug: "tucson", state: "AZ", stateSlug: "az" },
  { name: "Fresno", slug: "fresno", state: "CA", stateSlug: "ca" },
  { name: "Sacramento", slug: "sacramento", state: "CA", stateSlug: "ca" },
  { name: "Kansas City", slug: "kansas-city", state: "MO", stateSlug: "mo" },
  { name: "Mesa", slug: "mesa", state: "AZ", stateSlug: "az" },
  { name: "Atlanta", slug: "atlanta", state: "GA", stateSlug: "ga" },
  { name: "Omaha", slug: "omaha", state: "NE", stateSlug: "ne" },
  { name: "Colorado Springs", slug: "colorado-springs", state: "CO", stateSlug: "co" },
  { name: "Raleigh", slug: "raleigh", state: "NC", stateSlug: "nc" },
  { name: "Long Beach", slug: "long-beach", state: "CA", stateSlug: "ca" },
  { name: "Virginia Beach", slug: "virginia-beach", state: "VA", stateSlug: "va" },
  { name: "Miami", slug: "miami", state: "FL", stateSlug: "fl" },
  { name: "Oakland", slug: "oakland", state: "CA", stateSlug: "ca" },
  { name: "Minneapolis", slug: "minneapolis", state: "MN", stateSlug: "mn" },
  { name: "Tampa", slug: "tampa", state: "FL", stateSlug: "fl" },
  { name: "Tulsa", slug: "tulsa", state: "OK", stateSlug: "ok" },
  { name: "Arlington", slug: "arlington", state: "TX", stateSlug: "tx" },
  { name: "New Orleans", slug: "new-orleans", state: "LA", stateSlug: "la" },
  { name: "Wichita", slug: "wichita", state: "KS", stateSlug: "ks" },
];

export function getCityBySlug(stateSlug: string, citySlug: string): City | undefined {
  return TOP_50_CITIES.find(
    (c) => c.stateSlug === stateSlug && c.slug === citySlug
  );
}
