// Surat Sadi Center - Frontend-Only Mock API Client
// All network requests are routed to client localStorage services

export const mockApi = {
  get: async (url) => {
    console.log(`[Frontend Demo API] GET ${url}`);
    return { success: true };
  },
  post: async (url, data) => {
    console.log(`[Frontend Demo API] POST ${url}`, data);
    return { success: true, data };
  }
};

export default mockApi;
