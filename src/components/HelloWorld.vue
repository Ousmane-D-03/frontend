<template>
  <div>
    <h1>Galerie d'images</h1>
    
    <!-- Liste déroulante pour choisir l'image -->
    <select v-model="selectedImage" @change="getImage">
      <option v-for="image in images" :key="image.id" :value="image.id">
        {{ image.name }}
      </option>
    </select>
    
    <!-- Affichage de l'image sélectionnée uniquement si une image est sélectionnée -->
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Image sélectionnée" />
    </div>
    
    <h2>Déposer une image</h2>
    <!-- Formulaire de téléchargement d'une image -->
    <form @submit.prevent="uploadImage">
      <input type="file" ref="fileInput" />
      <button type="submit">Envoyer</button>
    </form>
    
    <h1>Galerie</h1>
    <!-- Affichage de toutes les images dans la galerie -->
    <div class="gallery">
      <img v-for="image in images" :key="image.id" :src="image.url" alt="Image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [],
      selectedImage: null, // Au départ, aucune image sélectionnée
      imageUrl: null, // L'URL de l'image sélectionnée
    };
  },
  mounted() {
    this.getImages(); // Charger les images au moment où le composant est monté
  },
  methods: {
    // Récupérer la liste des images
    getImages() {
      axios.get('/images')
        .then(response => {
          this.images = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des images:', error);
        });
    },
    // Télécharger l'image sélectionnée
    getImage() {

      axios.get(`/images/${this.selectedImage}`, { responseType: 'blob' })
        .then(response => {
          const reader = new window.FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = () => {
            this.imageUrl = reader.result; // Une fois l'image chargée, la stocker dans imageUrl
          };
        })
        .catch(error => {
          console.error('Erreur lors du téléchargement de l\'image:', error);
        });
    },
    // Télécharger une image sur le serveur
    uploadImage() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      axios.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert('Image envoyée avec succès');
        this.getImages(); // Rafraîchir la galerie après l'upload
      })
      .catch(error => {
        alert('Erreur lors de l\'envoi de l\'image');
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
.gallery img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 10px;
}
</style>
