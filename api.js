const API_URL = 'https://demo2.z-bit.ee';

async function apiRequest(path, options = {}) {
    const token = sessionStorage.getItem('access_token');
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (!response.ok) {
        if (response.status === 401 && path.startsWith('/tasks')) {
            sessionStorage.removeItem('access_token');
            window.location.href = 'index.html';
        }
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Request failed (${response.status})`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}
