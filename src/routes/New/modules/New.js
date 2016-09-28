export const PUBLISH_QUESTON = 'New.PUBLISH_QUESTON'
export const PUBLISH_SUCCESS = 'New.PUBLISH_SUCCESS'
const dataHost = __DATAHOST__

function cb (json) {
  return {
    type: PUBLISH_SUCCESS,
    json
  }
}

export function publish (title, content, author) {
  return (dispatch) => {
    var date = new Date()
    fetch(`${dataHost}/question`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        author,
        content,
        createdTime: date.toLocaleString(),
        lastTime: '',
        replies: 0,
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
  [PUBLISH_SUCCESS]: (state, action) => {
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
