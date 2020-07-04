import AsyncStorage from "@react-native-community/async-storage"

export const LOGGEDIN_SUCCESS = "LOGGEDIN_SUCCESS";
export const LOGGEDIN_FAILURE = "LOGGEDIN_FAILURE";
export const LOGGEDOUT_SUCCESS = "LOGGEDOUT_SUCCESS";
export const LOGGEDOUT_FAILURE = "LOGGEDOUT_FAILURE";


export function getLoginStatus() {
  return async (dispatch) => {
    try {
      let userToken = await AsyncStorage.getItem("userToken")
      if (userToken !== null)
        dispatch(getLoginStatusSuccess({ userToken }))
      else
        dispatch(getLoginStatusFailure({ userToken }))
    } catch (err) {
      dispatch(getLoginStatusFailure({ userToken, error: err }))
    }
  }
}

function getLoginStatusSuccess(data) {
  return {
    type: LOGGEDIN_SUCCESS,
    data
  }
}

function getLoginStatusFailure(data) {
  return {
    type: LOGGEDIN_FAILURE,
    data
  }
}

export function signIn() {
  return async (dispatch) => {
    try {
      var userToken = "XYZ"
      await AsyncStorage.setItem("userToken", userToken)
      dispatch(signInSuccess({ userToken }))
    } catch (err) {
      dispatch(signInFailure({ userToken, error: err }))
    }
  }
}

function signInSuccess(data) {
  return {
    type: LOGGEDIN_SUCCESS,
    data
  }
}

function signInFailure(data) {
  return {
    type: LOGGEDIN_FAILURE,
    data
  }
}

export function logOut() {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userToken")
      dispatch(logOutSuccess())
    } catch{
      dispatch(logOutFailure())
    }
  }
}

function logOutSuccess(data) {
  return {
    type: LOGGEDOUT_SUCCESS,
    data
  }
}

function logOutFailure(data) {
  return {
    type: LOGGEDOUT_FAILURE,
    data
  }
}
