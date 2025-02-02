// http-api.ts
import axios from 'axios';

// Récupérer la liste des images
export const getImages = async () => {
  try {
    const response = await axios.get('/images');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    throw error;
  }
};

// Récupérer une image spécifique par son ID
export const getImage = async (imageId: string) => {
  try {
    const response = await axios.get(`/images/${imageId}`, { responseType: 'blob' });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    throw error;
  }
};

// Uploader une nouvelle image
export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'image:', error);
    throw error;
  }
};