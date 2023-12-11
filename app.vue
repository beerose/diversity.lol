<template>
  <Hero />
  <div>
    <NuxtLink :to="{ query: { sort: sort === 'DESC' ? 'ASC' : 'DESC' } }">
      Sort by date
    </NuxtLink>
    <article v-for="conference of filtered">
      <h2>{{ conference.name }}</h2>
      <p>{{ conference.description }}</p>
      <p>{{ conference.location }}</p>
      <p>{{ conference.startDate }}</p>
      <p>{{ conference.url }}</p>
      <p>{{ conference.tags }}</p>
      <p>{{ conference.speakers }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
  import Hero from '~/components/Hero.vue'
  const route = useRoute()
  const { data } = await useFetch('/api/conferences')
  const filters = computed(() => ({
    tags: route.query.tags ? (route.query.tags as string).split(',') : [],
    locations: route.query.locations
      ? (route.query.locations as string).split(',')
      : [],
    diversity: {
      min: route.query.min ? +route.query.min : 0,
      max: route.query.max ? +route.query.max : 100,
    },
  }))

  const sort = computed<'DESC' | 'ASC'>(
    () => (route.query.sort as 'DESC' | 'ASC') || 'DESC'
  )

  const filtered = computed(() =>
    data.value
      ?.filter((conference) => {
        const diversity =
          ((conference.speakers.womenAndNonBinaryMain ||
            conference.speakers.womenAndNonBinary) /
            conference.speakers.total) *
          100
        return (
          filters.value.tags.every((tag) => conference.tags.includes(tag)) &&
          filters.value.locations.every((location) =>
            conference.location.includes(location)
          ) &&
          diversity >= filters.value.diversity.min &&
          diversity <= filters.value.diversity.max
        )
      })
      .sort((a, b) => {
        if (sort.value === 'DESC') {
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          )
        } else {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )
        }
      })
  )
</script>
