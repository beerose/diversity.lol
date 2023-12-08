export default defineEventHandler(async event => {
  const storage = useStorage('conferences')
  const conferences = await storage.getKeys().then(keys => keys.filter(key => !key.startsWith('_')))
  return Promise.all(conferences.map(async key => storage.getItem(key)))
})
