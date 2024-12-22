export const getGoogleClientId = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error('Google Client ID is not set!');
      return '';
    }
    return clientId;
  };