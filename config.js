// Configuration file for NusaPulse
const API_CONFIG = {
    // Replace this with your deployed Google Apps Script web app URL
    API_URL: 'https://script.google.com/macros/s/AKfycbwiu48FQClhkfte0BDISv0UjtirBE5okOLN2aizVdph44uIbk_NtxmVdVbcwpb5X6I/exec',
    
    // API endpoints
    ENDPOINTS: {
        SIGNUP: '/signup',
        LOGIN: '/login',
        FORGOT_PASSWORD: '/forgotPassword',
        UPLOAD_FILE: '/uploadFile',
        GET_HEALTH_DATA: '/getUserHealthData',
        GET_USER_FILES: '/getUserFiles'
    }
};

// Helper function to make API calls
async function callAPI(action, data) {
    try {
        const requestData = {
            action: action,
            ...data
        };
        
        const response = await fetch(API_CONFIG.API_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        // Note: With no-cors mode, we cannot read the response
        // So we'll use a workaround with GET requests for data retrieval
        return { success: true };
        
    } catch (error) {
        console.error('API call error:', error);
        return { success: false, message: error.toString() };
    }
}

// Helper function to make GET API calls (for retrieving data)
async function callAPIGet(action, data) {
    try {
        const params = new URLSearchParams({
            data: JSON.stringify({ action: action, ...data })
        });
        
        const response = await fetch(`${API_CONFIG.API_URL}?${params}`, {
            method: 'GET'
        });
        
        return await response.json();
        
    } catch (error) {
        console.error('API GET call error:', error);
        return { success: false, message: error.toString() };
    }
}

// Helper function to convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}