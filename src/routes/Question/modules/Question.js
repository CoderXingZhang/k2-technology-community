export const dataHost = __DATAHOST__

export const FETCH_QUESTION = 'Question.FETCH_QUESTION'
export const RECEIVE_QUESTION = 'Question.RECEIVE_QUESTION'

export const FETCH_REPLIES = 'Question.FETCH_REPLIES'
export const RECEIVE_REPLIES = 'Question.RECEIVE_REPLIES'

export const ANSWER = 'New.ANSWER'
export const ANSWER_SUCCESS = 'New.ANSWER_SUCCESS'

function receiveReplies (data) {
  return {
    type: RECEIVE_REPLIES,
    data
  }
}

export function fetchReplies (qId) {
  return (dispatch) => {
    fetch(`${dataHost}/answer/_search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: {
          match: { qId }
        }
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
        return dispatch(receiveReplies(json))
      })
  }
}

function receiveQuestion (data) {
  return {
    type: RECEIVE_QUESTION,
    data
  }
}

export function fetchQuestion (id) {
  return (dispatch) => {
    fetch(`${dataHost}/question/${id}`)
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

function cb (data) {
  return {
    type: ANSWER_SUCCESS,
    data
  }
}

export function reply (qId, author, content, to) {
  return (dispatch) => {
    var date = new Date()
    fetch(`${dataHost}/answer`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qId,
        author,
        content,
        createdTime: date.getTime(),
        lastTime: '',
        to,
        likes: 0
      })
    })
    .then(function (res) {
      if (res.status >= 400) {
        throw new Error('Put fail')
      }
      return res.json()
    })
    .then(function (json) {
      return dispatch(cb(json))
    })
  }
}

export const actions = {
}

const ACTION_HANDLERS = {
  [RECEIVE_QUESTION]: (state, action) => {
    return Object.assign({}, state, {
      question: action.data
    })
  },
  [RECEIVE_REPLIES]: (state, action) => {
    return Object.assign({}, state, {
      replies: action.data
    })
  },
  [ANSWER_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      cb: 'success'
    })
  }
}

const initialState = {}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
