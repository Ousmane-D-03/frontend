<template>
  <div class="gallery">
    <img
      v-for="image in images"
      :key="image.id"
      :src="image.url"
      :alt="image.name"
      class="gallery-image"
      @click="selectImage(image)"
    />
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectImage(image) {
      this.$emit('image-selected', image.id); // Émettre un événement pour sélectionner une image
    },
  },
};
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.gallery-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.gallery-image:hover {
  transform: scale(1.05);
}
</style>