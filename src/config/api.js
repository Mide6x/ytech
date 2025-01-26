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
    
    // Lesson endpoints
    ADMIN_LESSONS: `${BACKEND_URL}/api/lessons`,
    LESSONS: `${BACKEND_URL}/api/lessons`,
    LESSON_DETAIL: (id) => `${BACKEND_URL}/api/lessons/${id}`,
    
    // Upload endpoint
    UPLOAD: `${BACKEND_URL}/api/lessons/upload`,

    USER_COMPLETE_LESSON: (id) => `${BACKEND_URL}/api/users/complete-lesson/${id}`,

    SAVE_NOTE: `${BACKEND_URL}/api/notes`,
    GET_NOTE: (lessonId) => `${BACKEND_URL}/api/notes/${lessonId}`
};

export const fetchWithAuth = async (url, options = {}) => {
    return fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        }
    });
}; 