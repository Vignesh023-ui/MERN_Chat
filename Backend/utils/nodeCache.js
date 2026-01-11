import NodeCache from "node-cache";

// ? Default cache to Store as long as App running
const memoryCache = new NodeCache();

export const generateCacheKey = (type, key) => {
  return `${type}-${key}`;
};

export default memoryCache;
