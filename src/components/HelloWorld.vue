<script>
import axios from 'axios';
import Gallery from './Gallery.vue';
import { getImages, getImage, uploadImage } from './http-api'; // Importer les fonctions

export default {
  components: {
    Gallery,
  },
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
    async getImages() {
      try {
        this.images = await getImages();
      } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
      }
    },
    // Télécharger l'image sélectionnée
    async getImage() {

      try {
        const imageBlob = await getImage(this.selectedImage);
        const reader = new window.FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onload = () => {
          this.imageUrl = reader.result; // Une fois l'image chargée, la stocker dans imageUrl
        };
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    },
    // Télécharger une image sur le serveur
    async uploadImage() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      if (!file) return;

      try {
        await uploadImage(file);
        alert('Image envoyée avec succès');
        this.getImages(); // Rafraîchir la galerie après l'upload
      } catch (error) {
        alert('Erreur lors de l\'envoi de l\'image');
        console.error(error);
      }
    },
    // Gérer la sélection d'une image depuis la galerie
    handleImageSelected(imageId) {
      this.selectedImage = imageId;
      this.getImage(); // Charger l'image sélectionnée
    },
  },
};
</script>

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
    <!-- Utilisation du composant Gallery -->
    <Gallery :images="images" @image-selected="handleImageSelected" />
  </div>
</template>

<style>
.gallery img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 10px;
}
</style>