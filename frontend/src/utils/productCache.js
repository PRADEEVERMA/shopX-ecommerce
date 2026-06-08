const PRODUCT_CACHE_PREFIX = "shopx:products:";
const PRODUCT_CACHE_TTL = 60 * 1000;

export const getCachedProducts = (key) => {
  try {
    const cached = sessionStorage.getItem(`${PRODUCT_CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const { products, savedAt } = JSON.parse(cached);
    if (Date.now() - savedAt > PRODUCT_CACHE_TTL) return null;

    return Array.isArray(products) ? products : null;
  } catch {
    return null;
  }
};

export const setCachedProducts = (key, products) => {
  try {
    sessionStorage.setItem(
      `${PRODUCT_CACHE_PREFIX}${key}`,
      JSON.stringify({ products, savedAt: Date.now() }),
    );
  } catch {
    // Ignore storage quota/private mode failures.
  }
};
