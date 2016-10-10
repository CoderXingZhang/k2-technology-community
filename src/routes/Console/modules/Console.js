export const RECEIVE_QUESTION = 'Console.RECEIVE_QUESTION'
export const DELETE_QUESTION = 'Console.DELETE_QUESTION'
export const REMOVE_QUESTION = 'Console.REMOVE_QUESTION'
const dataHost = __DATAHOST__

function receiveQuestion (data) {
  return {
    type: RECEIVE_QUESTION,
    data
  }
}

function removeQuestion (data) {
  return {
    type: REMOVE_QUESTION,
    data
  }
}

export function deleteQuestion (id) {
  return (dispatch) => {
    fetch(`${dataHost}/question/${id}`, {
      method: 'DELETE'
    }).then(function (res) {
      if (res.status >= 400) {
        alert(`Error Status: ${res.status}`)
        throw new Error('Fetch fail')
      }
      return res.json()
    })
    .then(function (json) {
      return dispatch(removeQuestion(json))
    })
  }
}

export function getQuestion () {
  return (dispatch) => {
    fetch(`${dataHost}/question/_search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'sort': [{ 'createdTime': 'desc' }],
        'query': { 'match_all': {} },
        'from': 0,
        'size': 100
      })
    })
      .then(function (res) {
        if (res.status >= 400) {
          alert(`Error Status: ${res.status}`)
          throw new Error('Fetch fail')
        }
        return res.json()
      })
      .then(function (json) {
        return dispatch(receiveQuestion(json))
      })
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_QUESTION]: (state, action) => {
    return Object.assign({}, state, {
      ql: action.data
    })
  },
  [REMOVE_QUESTION]: (state, action) => {
    state.ql.hits.hits = state.ql.hits.hits.filter((q) => {
      return q._id !== action.data._id
    })
    return Object.assign({}, state, {
      ql: state.ql
    })
  }
}

const initialState = {}
export default function consoleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
