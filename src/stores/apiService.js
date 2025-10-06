
export async function apiService({ token, method = 'GET', url, data = null }) {
    if (!token) {
        throw new Error('Нет токена авторизации');
    }
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: data ? JSON.stringify(data) : null,
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('API ошибка:', error);
        throw error;
    }
}