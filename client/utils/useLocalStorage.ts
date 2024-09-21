export const useLocalStorage = () => {
  const checkExist = (key: string) => localStorage.getItem(key) !== null

  const getLocalStorage = (key: string): string => localStorage.getItem(key) || ''

  const setLocalStorage = (key: string, value: string) => {
    if (key && value !== null && value !== undefined) {
      localStorage.setItem(key, value)
    }
  }

  const removeLocalStorage = (key: string) => localStorage.removeItem(key)

  const removeLocalStorageIncludekey = <K>(key: K) => {
    if (typeof key === 'string') {
      const localKey = Object.keys(localStorage)
      if (localKey.includes(key)) {
        localStorage.removeItem(key)
      }
    }
  }

  return { checkExist, getLocalStorage, setLocalStorage, removeLocalStorage, removeLocalStorageIncludekey }
}