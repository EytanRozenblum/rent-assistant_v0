
interface ApiConfig {
  ELEVEN_LABS_API_KEY: string;
}

// Default to placeholder - this will be overridden by user input
const apiConfig: ApiConfig = {
  ELEVEN_LABS_API_KEY: "MY_API_KEY",
};

export const getApiConfig = (): ApiConfig => {
  return apiConfig;
};

export const setApiKey = (key: string): void => {
  apiConfig.ELEVEN_LABS_API_KEY = key;
  
  // Optional: Save to localStorage for persistence during the session
  // Note: This is for demo/development only
  localStorage.setItem('ELEVEN_LABS_API_KEY', key);
};

// Try to load from localStorage if available
try {
  const savedKey = localStorage.getItem('ELEVEN_LABS_API_KEY');
  if (savedKey) {
    apiConfig.ELEVEN_LABS_API_KEY = savedKey;
  }
} catch (e) {
  console.error("Could not load API key from localStorage");
}
