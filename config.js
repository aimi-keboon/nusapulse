// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

// Configuration file for NusaPulse
const API_CONFIG = {
  // Replace this with your deployed Google Apps Script web app URL
  API_URL:
    "https://script.google.com/macros/s/AKfycbwWongvDr3kKnD8VuWEfgPKT_cnJ7C7OhSA3_A1y5Vpw4HirBAHZ3kkdiTBMlOJh4gN/exec",
};

// Helper function to make API calls using GET method with JSONP workaround
async function callAPIGet(action, data) {
  try {
    const params = new URLSearchParams({
      data: JSON.stringify({ action: action, ...data }),
    });

    const response = await fetch(`${API_CONFIG.API_URL}?${params}`, {
      method: "GET",
      redirect: "follow",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API GET call error:", error);
    return { success: false, message: error.toString() };
  }
}

// Helper function for POST requests (uses form data to avoid CORS preflight)
async function callAPIPost(action, data) {
    try {
        // Use URLSearchParams instead of JSON to avoid preflight
        const params = new URLSearchParams();
        params.append('action', action);
        
        // Add all data fields to params
        for (const key in data) {
            params.append(key, data[key]);
        }
        
        const response = await fetch(API_CONFIG.API_URL, {
            method: 'POST',
            body: params,
            redirect: 'follow'
        });
        
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('API POST call error:', error);
        return { success: false, message: error.toString() };
    }
}

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}
