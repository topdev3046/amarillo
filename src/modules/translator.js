import * as Babel from '@babel/standalone'
import amarilloPlugin from './plugin'

export const TRANSLATE_JS_TO_AST = 'translator/TRANSLATE_JS_TO_AST'
export const TRANSLATE_AST_TO_JS = 'translator/TRANSLATE_AST_TO_JS'

const initialState = {
  translatedAST: undefined,
  translatedModel: undefined,
  translatedJS: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {

    case TRANSLATE_AST_TO_JS:
      return {
        ...state,
        translatedJS: "new translated js"
      }

    case TRANSLATE_JS_TO_AST:
      var result = Babel.transform(action.text, { code: true, ast: true, plugins: [amarilloPlugin], presets: ["react"] });
      console.log("AST:", result.ast)
      console.log("code:", result.code)
      return {
        ...state,
        translatedAST: result.ast,
        translatedJS: result.code
      }

    default:
      return state
  }
}

export const translateJStoAST = (text) => {
  return dispatch => {
    dispatch({
      type: TRANSLATE_JS_TO_AST,
      text: text
    })
  }
}
