export const RECEIVE_QUESTION = 'Console.RECEIVE_QUESTION'
export const REMOVE_QUESTION = 'Console.REMOVE_QUESTION'
export const RECEIVE_TAGS = 'Console.RECEIVE_TAGS'
export const REMOVE_TAGS = 'Console.REMOVE_TAGS'
const dataHost = __DATAHOST__

function receiver (type, name, data) {
  return { type, name, data }
}

function remover (type, name, data) {
  return { type, name, data }
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
      return dispatch(remover(REMOVE_QUESTION, 'ql', json))
    })
  }
}

export function deleteTags (id) {
  return (dispatch) => {
    fetch(`${dataHost}/tags/${id}`, {
      method: 'DELETE'
    }).then(function (res) {
      if (res.status >= 400) {
        alert(`Error Status: ${res.status}`)
        throw new Error('Fetch fail')
      }
      return res.json()
    })
    .then(function (json) {
      return dispatch(remover(REMOVE_TAGS, 'tags', json))
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
        return dispatch(receiver(RECEIVE_QUESTION, 'ql', json))
      })
  }
}

export function getTags () {
  return (dispatch) => {
    fetch(`${dataHost}/tags/_search`, {
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
        return dispatch(receiver(RECEIVE_TAGS, 'tags', json))
      })
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_QUESTION]: (state, action) => Object.assign({}, state, { [action.name]: action.data }),
  [RECEIVE_TAGS]: (state, action) => Object.assign({}, state, { [action.name]: action.data }),
  [REMOVE_QUESTION]: (state, action) => {
    state[action.name].hits.hits = state[action.name].hits.hits.filter((q) => q._id !== action.data._id)
    return Object.assign({}, state, { [action.name]: state[action.name] })
  },
  [REMOVE_TAGS]: (state, action) => {
    state[action.name].hits.hits = state[action.name].hits.hits.filter((q) => q._id !== action.data._id)
    return Object.assign({}, state, { [action.name]: state[action.name] })
  }
}

const initialState = {}
export default function consoleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
