import React, { Component } from 'react';
import * as Babel from '@babel/standalone';

export const TRANSLATE_JS_TO_AST = 'translator/TRANSLATE_JS_TO_AST'
export const TRANSLATE_AST_TO_JS = 'translator/TRANSLATE_AST_TO_JS'

const initialState = {
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
      var result = Babel.transform(action.text, { ast: true });
      console.log("AST:", result.ast)
      return {
        ...state,
        translatedAST: result.ast
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
