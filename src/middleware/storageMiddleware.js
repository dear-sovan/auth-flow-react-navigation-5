import react from "react"
import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_LOCATION = '@webskitterTest/store'


export const APP_LOAD = 'STORAGE/APP_LOAD'
export const actions = {
  appLoad: () => ({ type: APP_LOAD }),
}
export const storageMiddleware = ({ getState }) => (next) => (action) => {
  if (action.type === APP_LOAD) {
    AsyncStorage.getItem(STORAGE_LOCATION)
      .then((stringData) => {
        console.log("%cAPP LOADED");
        next({ type: APP_LOAD, store: JSON.parse(stringData) || { app: {} } })
      })
      .catch(console.log)
  } else {
    next(action)

    if (action.storage === 'local') {
      const state = getState()
      AsyncStorage.setItem(STORAGE_LOCATION, JSON.stringify(state))
    }
  }
}

export default storageMiddleware
