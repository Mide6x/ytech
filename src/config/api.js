const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const API_URLS = {
    // Auth endpoints
    LOGIN: `${BACKEND_URL}/api/auth/login`,
    SIGNUP: `${BACKEND_URL}/api/auth/signup`,
    ADMIN_LOGIN: `${BACKEND_URL}/api/admin/login`,
    
    // User endpoints
    USER_PROFILE: `${BACKEND_URL}/api/users/profile`,
    
    // Admin endpoints
    ADMIN_USERS: `${BACKEND_URL}/api/admin/users`,
    ADMIN_METRICS: `${BACKEND_URL}/api/admin/metrics`,
    
    // Upload endpoint
    UPLOAD: `${BACKEND_URL}/api/upload`,
}; 