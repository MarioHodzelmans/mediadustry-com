const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export type Product = {
  id: string;
  title: string;
  handle: string;
  onlineStoreUrl: string | null;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        onlineStoreUrl
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!domain || !token) return [];

  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query: FEATURED_PRODUCTS_QUERY, variables: { first: 6 } }),
    next: { revalidate: 300 },
  });

  if (!response.ok) throw new Error(`Shopify request failed (${response.status})`);
  const payload = await response.json();
  if (payload.errors) throw new Error(payload.errors[0]?.message ?? "Shopify GraphQL error");
  return payload.data.products.nodes;
}
