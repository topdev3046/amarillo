export const LOAD_SCRIPT = 'editor/LOAD_SCRIPT'

const initialState = {
  text: "console.log(\"Hello, World!\");"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SCRIPT:
      return {
        ...state,
        text: "new script"
      }

    default:
      return state
  }
}

export const loadScript = () => {
  return dispatch => {
    dispatch({
      type: LOAD_SCRIPT
    })
  }
}
