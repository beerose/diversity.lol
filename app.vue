<template>
  <NuxtLayout>
    <Hero />
    <ConfList />
    <CTA />
    <Footer />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import Hero from '~/components/Hero.vue'
  import Footer from '~/components/Footer.vue'
  import CTA from '~/components/CTA.vue'
  import ConfList from '~/components/ConfList.vue'
</script>
