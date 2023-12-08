export default defineEventHandler(async event => {
  const storage = useStorage('conferences')
  const slug = getRouterParam(event, 'slug')
  if (!slug || !(await storage.hasItem(slug + '.json'))) {
    throw createError({ statusCode: 404 })
  }
  return storage.getItem(slug + '.json')
})
