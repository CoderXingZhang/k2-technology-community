export const PUBLISH_QUESTON = 'New.PUBLISH_QUESTON'
export const PUBLISH_SUCCESS = 'New.PUBLISH_SUCCESS'
export const FETCH_TAGS = 'New.FETCH_TAGS'
export const RECEIVE_TAGS = 'New.RECEIVE_TAGS'
export const ADD_TAGS = 'New.ADD_TAGS'
const dataHost = __DATAHOST__

function cb (json) {
  return {
    type: PUBLISH_SUCCESS,
    json
  }
}

export function addTags (tags, allTags) {
  let hash = {}
  let newArr = []
  allTags.map((t) => { hash[t._source.tag] = 1 })
  tags.map((t) => {
    if (!hash[t]) {
      hash[t] = 1
      newArr.push(t)
    }
  })
  return () => {
    newArr.map((tag) => {
      fetch(`${dataHost}/tags?refresh=wait_for`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag })
      })
      .then(function (res) {
        if (res.status >= 400) {
          throw new Error('Put fail')
        }
        return res.json()
      })
      .then(function (json) {
        return {}
      })
    })
  }
}

export function publish (title, content, author, tags, allTags, id, likes) {
  return (dispatch) => {
    var date = new Date()
    fetch(id ? `${dataHost}/question/${id}?refresh=wait_for` : `${dataHost}/question?refresh=wait_for`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          author,
          content,
          createdTime: date.getTime(),
          lastTime: '',
          replies: 0,
          likes: id ? likes : 0,
          tags
        })
      })
    .then(function (res) {
      if (res.status >= 400) {
        throw new Error('Put fail')
      }
      return res.json()
    })
    .then(function (json) {
      dispatch(addTags(tags, allTags))
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
