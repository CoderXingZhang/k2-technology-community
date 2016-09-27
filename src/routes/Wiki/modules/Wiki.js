export const RECEIVE_QUESTION = 'Wiki.RECEIVE_QUESTION'
export const GET_QUESTION = 'Wiki.GET_QUESTION'
const serviceUrl = 'http://localhost:9200/wiki'

function receiveQuestion (data) {
  return {
    type: RECEIVE_QUESTION,
    data
  }
}

export function getQuestion (query) {
  return (dispatch) => {
    fetch(`${serviceUrl}/_search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
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

export const actions = {
  getQuestion
}

const ACTION_HANDLERS = {
  [RECEIVE_QUESTION]: (state, action) => {
    return Object.assign({}, state, {
      ql: action.data
    })
  }
}

const initialState = {}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
