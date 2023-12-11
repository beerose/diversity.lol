<template>
  <div>
    <header class="absolute inset-x-0 top-0 z-50">
      <nav
        class="flex items-center justify-between p-6 lg:px-8 text-xs text-stone-600"
        aria-label="Global"
      >
        <NuxtLink
          href="/about"
          class="-m-1.5 p-1.5 hover:underline underline-offset-1"
        >
          About
        </NuxtLink>
        <a
          href="https://github.com/beerose/diversity.lol"
          target="_blank"
          class="-m-1.5 p-1.5"
        >
          Github
        </a>
      </nav>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl"
          >
            Diveristy in Tech
          </h1>
          <p class="mt-6 text-lg leading-8 text-stone-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
