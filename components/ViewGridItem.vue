<template>
  <div class="view-grid-item">
    <div class="view-grid-item__img">
      <img :src="img" :alt="title"/>
      <div class="view-grid-item__tags">
        <ViewTag
          v-for="(tag, key) in tags"
          :key="key"
          :type="tag.type"
          class="view-grid-item__tag">{{ tag.label }}</ViewTag>
      </div>
    </div>
    <div class="view-grid-item__title">{{ title }}</div>
    <div class="view-grid-item__date">{{ date }}</div>
    <div class="view-grid-item__description" v-if="description">{{ description }}</div>
  </div>
</template>


<script setup lang="ts">
  import ViewTag from "~/components/ViewTag.vue";

  interface Props {
    img: string,
    title: string,
    tags: {type: string, label: string}[]
    date: string,
    description?: string
  }
  defineProps<Props>()
</script>

<style lang="scss" scoped>
 .view-grid-item {
   background: var(--g-block-bg);
   padding: 15px 15px 20px;
   border-radius: 12px;
   display: flex;
   flex-direction: column;
   gap: 10px;
   cursor: pointer;
   &__img {
     position: relative;
     width: 100%; /* Full width */
     padding-top: 42.85714%; /* 21:9 aspect ratio  */
     overflow: hidden;
     img {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       object-fit: cover; /* Ensures the image covers the area while maintaining its aspect ratio */
     }
   }
   &__tags {
     display: flex;
     flex-wrap: wrap;
     gap: 10px;
     position: absolute;
     left: 10px;
     bottom: 10px;
   }
   &__title {
     font-weight: 600;
     font-size: 24px;
     color: #fff;
   }
   &__date {
     color: var(--p-text-muted-color);
     font-weight: 400;
     font-size: 18px;
   }
   &__description {
     font-weight: 400;
     font-size: 16px;
   }
 }

</style>