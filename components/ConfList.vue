<template>
  <div class="space-y-4">
    <div class="bg-white">
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-40 sm:hidden" @close="open = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    @click="open = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4">
                  <Disclosure
                    as="div"
                    v-for="section in filterOptions"
                    :key="section.name"
                    class="border-t border-gray-200 px-4 py-6"
                    v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                        <span class="font-medium text-gray-900">{{
                          section.name
                        }}</span>
                        <span class="ml-6 flex items-center">
                          <ChevronDownIcon
                            :class="[
                              open ? '-rotate-180' : 'rotate-0',
                              'h-5 w-5 transform',
                            ]"
                            aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div
                          v-for="(option, optionIdx) in section.options"
                          :key="option.value"
                          class="flex items-center">
                          <input
                            :id="`filter-mobile-${section.id}-${optionIdx}`"
                            :name="`${section.id}[]`"
                            :value="option.value"
                            type="checkbox"
                            :checked="
                              filters[section.id as FilterKeys]?.includes(
                                option.value,
                              )
                            "
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label
                            :for="`filter-mobile-${section.id}-${optionIdx}`"
                            class="ml-3 text-sm text-gray-500"
                            >{{ option.label }}</label
                          >
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Filters -->
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" class="sr-only">Filters</h2>

        <div class="bg-white pb-4">
          <div class="mx-auto flex max-w-7xl items-center justify-between px-1">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true" />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem
                      v-for="option in sortOptions"
                      :key="option.name"
                      v-slot="{ active }">
                      <NuxtLink
                        :to="{ query: { sort: option.href } }"
                        :class="[
                          option.href === sort
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm',
                        ]">
                        {{ option.name }}
                      </NuxtLink>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button
              type="button"
              class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              @click="open = true">
              Filters
            </button>

            <div class="hidden sm:block">
              <div class="flow-root">
                <PopoverGroup class="-mx-4 flex items-center">
                  <Popover
                    v-for="section in filterOptions"
                    :key="section.name"
                    class="relative inline-block px-4 text-left">
                    <PopoverButton
                      class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>{{ section.name }}</span>
                      <span
                        v-if="filters[section.id as FilterKeys]?.length"
                        class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700"
                        >{{ filters[section.id as FilterKeys]?.length }}</span
                      >
                      <ChevronDownIcon
                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true" />
                    </PopoverButton>

                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95">
                      <PopoverPanel
                        class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <form class="space-y-4">
                          <div
                            v-for="(option, optionIdx) in section.options"
                            :key="option.value"
                            class="flex items-center">
                            <input
                              :id="`filter-${section.id}-${optionIdx}`"
                              :name="`${section.id}[]`"
                              :value="option.value"
                              type="checkbox"
                              :checked="
                                filters[section.id as FilterKeys]?.includes(
                                  option.value,
                                )
                              "
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              :onChange="
                                e => {
                                  const value = e.target.value;
                                  const checked = e.target.checked;
                                  const currentQuery = route.query[section.id];
                                  const current = Array.isArray(currentQuery)
                                    ? currentQuery
                                    : currentQuery
                                      ? [currentQuery]
                                      : [];
                                  const next = checked
                                    ? [...current, value]
                                    : current.filter(v => v !== value);

                                  router.replace({
                                    query: {
                                      ...route.query,
                                      [section.id]: next,
                                    },
                                  });
                                }
                              " />
                            <label
                              :for="`filter-${section.id}-${optionIdx}`"
                              class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                              >{{ option.label }}</label
                            >
                          </div>
                        </form>
                      </PopoverPanel>
                    </transition>
                  </Popover>
                </PopoverGroup>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <ul role="list" class="overflow-hidden bg-white space-y-4">
      <li
        v-for="conf in filtered"
        :key="conf.url"
        class="relative flex gap-x-6 border border-slate-100 rounded-md">
        <div class="text-sm bg-primary px-2 flex items-center justify-center">
          <time
            :datetime="conf.startDate"
            class="text-slate-800 font-semibold text-center px-4">
            {{
              new Date(conf.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            }}
          </time>
        </div>
        <div class="flex justify-between w-full">
          <div class="space-y-1 py-4 flex-col">
            <ul class="flex space-x-2">
              <li v-for="tag in conf.tags" :key="tag">
                <span class="rounded-full text-xs text-slate-600">
                  #{{ tag }}
                </span>
              </li>
            </ul>
            <div class="min-w-0 space-y-1 flex-auto">
              <a
                :href="conf.url"
                target="_blank"
                class="cursor-pointer hover:underline underline-offset-2 hover:text-gray-600">
                <p class="text-base font-semibold leading-6 text-gray-900">
                  <span class="absolute inset-x-0 -top-px bottom-0" />
                  {{ conf.name }}
                </p>
              </a>
              <p class="text-xs text-gray-900">
                {{ conf.location }}
              </p>
            </div>
          </div>
          <div>
            <dl
              class="py-5 h-full grid grid-cols-1 divide-y divide-slate-100 overflow-hidden md:grid-cols-2 md:divide-x md:divide-y-0">
              <div class="px-4">
                <dt class="text-xs font-normal text-gray-900">
                  Total Speakers
                </dt>
                <dd
                  class="mt-2 flex items-baseline justify-between md:block lg:flex">
                  <div
                    class="flex items-baseline text-2xl font-semibold text-accent">
                    {{ conf.speakers.total }}
                  </div>
                </dd>
              </div>
              <div class="px-4">
                <dt class="text-xs font-normal text-gray-900">
                  Women & Non-Binary
                </dt>
                <dd
                  class="mt-2 flex items-baseline justify-between md:block lg:flex">
                  <div
                    class="flex items-baseline text-2xl font-semibold text-accent">
                    {{
                      Math.round(
                        (conf.speakers.womenAndNonBinary /
                          conf.speakers.total) *
                          100,
                      )
                    }}%
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const open = ref(false);

const route = useRoute();
const router = useRouter();
const { data } = await useFetch('/api/conferences');
const filters = computed<Filters>(() => ({
  tags: route.query.tags ? (route.query.tags as string).split(',') : [],
  locations: Array.isArray(route.query.locations)
    ? (route.query.locations as string[])
    : route.query.locations
      ? [route.query.locations as string]
      : [],
  treshold: [route.query.treshold as string].filter(Boolean),
}));

type Sort = 'newest' | 'oldest' | 'diverse';
type FilterKeys = 'tags' | 'locations' | 'treshold';
type Filters = Record<FilterKeys, string[]>;

const sort = computed<Sort>(() => (route.query.sort as Sort) || 'newest');

const filtered = computed(
  () =>
    data.value
      ?.filter(conference => {
        const diversity =
          ((conference.speakers.womenAndNonBinaryMain ||
            conference.speakers.womenAndNonBinary) /
            conference.speakers.total) *
          100;

        return (
          filters.value.tags.every(tag => conference.tags.includes(tag)) &&
          filters.value.locations.some(location =>
            location === 'online'
              ? conference.location === 'online'
              : conference.location === 'inperson' ||
                conference.location !== 'online',
          ) &&
          diversity >= (Number(filters.value.treshold) || 0)
        );
      })
      .sort((a, b) => {
        if (sort.value === 'diverse') {
          const diversityA =
            ((a.speakers.womenAndNonBinaryMain ||
              a.speakers.womenAndNonBinary) /
              a.speakers.total) *
            100;
          const diversityB =
            ((b.speakers.womenAndNonBinaryMain ||
              b.speakers.womenAndNonBinary) /
              b.speakers.total) *
            100;
          return diversityB - diversityA;
        } else {
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();

          return sort.value === 'oldest' ? dateA - dateB : dateB - dateA;
        }
      }),
);
const tags = computed(() => [
  ...new Set(data.value?.map(conference => conference.tags).flat()),
]);

const sortOptions: { name: string; href: Sort }[] = [
  { name: 'Newest', href: 'newest' },
  { name: 'Oldest', href: 'oldest' },
  { name: 'Most Diverse', href: 'diverse' },
];
const filterOptions = computed(() => [
  {
    id: 'tags',
    name: 'Tags',
    options: tags.value.map(tag => ({
      value: tag,
      label: tag,
    })),
  },
  {
    id: 'locations',
    name: 'Location',
    options: [
      { value: 'online', label: 'Online' },
      { value: 'inperson', label: 'In Person' },
      { value: 'hybrid', label: 'Hybrid' },
    ],
  },
  {
    id: 'treshold',
    name: 'Threshold',
    options: [
      { value: 's', label: '> 30%' },
      { value: 'm', label: '> 40%' },
      { value: 'l', label: '> 50%' },
      { value: 'xl', label: '> 60%' },
      { value: '2xl', label: '> 70%' },
      { value: '3xl', label: '> 80%' },
    ],
  },
]);
</script>
