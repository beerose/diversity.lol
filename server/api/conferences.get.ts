interface Conference {
  name: string
  description: string
  startDate: string
  cfp: {
    open: string
    close: string
    url: string
  }
  status: 'cfp open' | 'cfp closed'
  tags: string[]
  location: string
  url: string
  social: {
    twitter: string
  }
  organizer: {
    name: string
    url: string
    forProfit: boolean
  }
  size: string
  speakers: {
    total: number
    womenAndNonBinary: number
    womenAndNonBinaryMain: number
  }
}

export default defineEventHandler(async (event) => {
  const storage = useStorage('conferences')
  const conferences = await storage
    .getKeys()
    .then((keys) => keys.filter((key) => !key.startsWith('_')))
  return Promise.all(
    conferences.map(async (key) => storage.getItem(key))
  ) as Promise<Conference[]>
})
