import axios from "axios"
import * as actions from './apiActionCreator';

const BASE_URL = process.env.REACT_APP_API_URL

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action)
  const { url, method, data, onStart, onSuccess, onError } = action.payload
  
  if (onStart)
    dispatch({ type: onStart })

  next(action)

  try {
    const response = await axios.request({
      baseURL: BASE_URL,
      url,
      method,
      data,
      withCredentials: true
    })
    // General
    dispatch(actions.apiCallSuccess(response.data))
    // Specific
    if (onSuccess && response.data.status !== 409 && response.data.status !== 500) {
      dispatch({ type: onSuccess, payload: response.data })
    } else {
      dispatch({ type: onSuccess, payload: { user: { data: { attributes: response.data } } } })
    }

  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message))
    // Specific use case
    if (onError)
      dispatch({ type: onError, payload: error.message })
  }
}

export default api