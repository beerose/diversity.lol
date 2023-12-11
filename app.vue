<template>
  <Head>
    <Link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫠</text></svg>"
    />
  </Head>
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

  useSeoMeta({
    title: 'diversity.lol',
    description:
      'A list of conferences and events with statistics on diversity and inclusion.',
  })
</script>
