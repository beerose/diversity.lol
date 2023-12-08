<template>
  <div>
    <button @click="sort = sort === 'DESC' ? 'ASC' : 'DESC'">
      Sort by date
    </button>
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
  const { data } = await useFetch('/api/conferences')
  const filters = reactive({
    tags: [],
    locations: [],
    diversity: {
      min: 0,
      max: 100,
    },
  })

  const sort = ref<'DESC' | 'ASC'>('DESC')

  const filtered = computed(() =>
    data.value
      ?.filter((conference) => {
        const diversity =
          ((conference.speakers.womenAndNonBinaryMain ||
            conference.speakers.womenAndNonBinary) /
            conference.speakers.total) *
          100
        return (
          filters.tags.every((tag) => conference.tags.includes(tag)) &&
          filters.locations.every((location) =>
            conference.location.includes(location)
          ) &&
          diversity >= filters.diversity.min &&
          diversity <= filters.diversity.max
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
