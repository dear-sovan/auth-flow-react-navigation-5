import axios from "axios"

export const FETCH_USERLIST_SUCCESS = "FETCH_USERLIST_SUCCESS";
export const FETCH_USERLIST_FAILURE = "FETCH_USERLIST_FAILURE";


export function getUserList(page) {
  return async (dispatch) => {
    await axios.get("https://reqres.in/api/users?page=" + page).then(response => {
      let { data, page, per_page, total, total_pages } = response.data
      dispatch(getUserListSuccess({ userList: data, page, per_page, total, total_pages, error: "" }))
    }).catch(err => {
      dispatch(getUserListFailure({ error: err, userList: [], page: 0, per_page: "", total: 0, total_pages: "" }))
    })
  }
}

function getUserListSuccess(data) {
  return {
    type: FETCH_USERLIST_SUCCESS,
    data
  }
}

function getUserListFailure(data) {
  return {
    type: FETCH_USERLIST_FAILURE,
    data
  }
}
