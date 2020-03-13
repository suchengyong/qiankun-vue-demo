import store from '@/store'
const getNamespace = () => {
  const pathname = window.location.pathname.split('/')[1]
  const subApp = store.getters.subApp
  const namespace = subApp.find(item => item.appPrefix.indexOf(pathname) !== -1 || pathname.indexOf(item.appPrefix)!== -1).appName
  return namespace
}
export default (target) => {
  return new Proxy(target, {
    get: (_, p) => {
      return (...args) => {
        return target[p](`${getNamespace()}: `, ...args)
      }
    },
  })
}
