import React, { Component } from 'react';

export const TRANSLATE_AST_TO_MODEL = 'translator/TRANSLATE_AST_TO_MODEL'
export const TRANSLATE_MODEL_TO_AST = 'translator/TRANSLATE_MODEL_TO_AST'

const initialState = {
  translatedModel: undefined,
}

class ClassGesture extends Component {
    render() {
      return (
      <div>
        <svg height="66px">
            <circle cx={10} cy={10} r={10} fill="brown" />
            <circle cx={32} cy={10} r={10} fill="brown" />
            <circle cx={54} cy={10} r={10} fill="brown" />
            <circle cx={10} cy={32} r={10} fill="brown" />
            <circle cx={10} cy={54} r={10} fill="brown" />
            <circle cx={32} cy={54} r={10} fill="brown" />
            <circle cx={54} cy={54} r={10} fill="brown" />
        </svg>
        <ul>
          <li>
            {this.props.children}
          </li>
        </ul>
      </div>
      );
    }
  }

  class MethodDeclarationGesture extends Component {
    render() {
      return (
        <div>
          <svg height="22px">
            <circle cx={10} cy={10} r={10} fill="orange" />
            <circle cx={32} cy={10} r={10} fill="orange" />
            <circle cx={54} cy={10} r={10} fill="orange" />
            <circle cx={84} cy={10} r={10} fill="orange" />
            <circle cx={114} cy={10} r={10} fill="orange" />
          </svg>
          <ul>
            <li>
              {this.props.children}
            </li>
          </ul>
        </div>
      );
    }
  }

  class IfGesture extends Component {
    render() {
      return (
        <div>
          <svg height="44px">
            <circle cx={32} cy={10} r={10} fill="lime" />
            <circle cx={10} cy={30} r={10} fill="lime" />
            <circle cx={54} cy={30} r={10} fill="lime" />
            </svg>
          <ul>
            <li>
            {this.props.children}
            </li>
          </ul>
        </div>
      );
    }
  }

  class ExpressionGesture extends Component {
    render() {
      return (
        <div>
          <svg height="22px">
            <circle cx={10} cy={10} r={10} fill="blue" />
          </svg>
        </div>
      );
    }
  }

  class MethodInvocationGesture extends Component {
    render() {
      return (
        <div>
          <svg height="22px">
            <circle cx={10} cy={10} r={10} fill="orange" />
            <circle cx={32} cy={10} r={10} fill="orange" />
            <circle cx={54} cy={10} r={10} fill="orange" />
            <circle cx={84} cy={10} r={10} fill="orange" />
            <circle cx={114} cy={10} r={10} fill="orange" />
          </svg>
        </div>
      );
    }
  }

  class ElseIfGesture extends Component {
    render() {
      return (
          <div>
            <svg height="66px">
              <circle cx={10} cy={10} r={10} fill="red" />
              <circle cx={32} cy={30} r={10} fill="red" />
              <circle cx={54} cy={50} r={10} fill="red" />
            </svg>
            <ul>
              <li>
              {this.props.children}
              </li>
            </ul>
          </div>
      );
    }
  }

  class ElseGesture extends Component {
    render() {
      return (
        <div>
          <svg>
            <circle cx={10} cy={50} r={10} fill="red" />
            <circle cx={32} cy={30} r={10} fill="red" />
            <circle cx={54} cy={10} r={10} fill="red" />
          </svg>
          <ul>
            <li>
            {this.props.children}
            </li>
          </ul>
        </div>
      );
    }
  }

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSLATE_AST_TO_MODEL:
      window.React = React
      window.MethodInvocationGesture = MethodInvocationGesture
      window.ClassGesture = ClassGesture
      var component = window.eval.call(window, action.code)
      return {
        ...state,
        translatedModel: <div>{component}</div>
      }

    default:
      return state
  }
}

export const translateASTtoModel = (code) => {
  return dispatch => {
    dispatch({
      type: TRANSLATE_AST_TO_MODEL,
      code: code
    })
  }
}
