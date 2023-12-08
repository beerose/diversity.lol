export default defineEventHandler(async event => {
  const storage = useStorage('conferences')
  const conferences = await storage.getKeys()
  return Promise.all(conferences.map(async key => storage.getItem(key)))
})
