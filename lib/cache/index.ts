import NodeCache from 'node-cache'

class Cache {
  cache: any
  
  constructor() {
    this.cache = new NodeCache({ checkperiod: 300, stdTTL: 300 })
  }

  set(key: string, value: any) {
    return this.cache.set(key, value)
  }

  get(key: string) {
    return this.cache.get(key)
  }

  delete(key: string) {
    return this.cache.del(key)
  }
}

const cache = new Cache()

export default cache
