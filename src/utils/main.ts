export const cloneDeep = (obj: any) => {
  if (obj == null || typeof obj !== 'object') return obj
  if (obj instanceof Date) {
    const copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }
  if (obj instanceof Array) {
    const copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = cloneDeep(obj[i])
    }
    return copy
  }
  if (obj instanceof Object) {
    const copy = {}
    for (const i in obj) {
      if (obj[i] != null && typeof obj[i] === 'object') {
        copy[i] = cloneDeep(obj[i])
      } else {
        copy[i] = obj[i]
      }
    }
    return copy
  }
}
