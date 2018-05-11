import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  loadScript
} from '../../modules/editor'
import './editor.css';
import {
  translateJStoAST
} from '../../modules/translator';

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
class Editor extends Component {

  translateToModel(props)
  {
    if (props.translatedAST === undefined)
    {
      props.translateJStoAST(this.props.text);
    }
  }

  componentWillMount() {
    this.translateToModel(this.props);
  }

  componentWillReceiveProps(props) {
    this.translateToModel(props);
  }

  render() {

    const hasAST = this.props.translatedAST !== undefined;

    const ast = hasAST ? (
      <div>{this.props.translatedAST.type}</div>
    ) : (
      <div/>
    );

    return (
      <div className="App">
        <ClassGesture>
          <MethodDeclarationGesture>
            <IfGesture>
              <ExpressionGesture/>
              <MethodInvocationGesture/>
            </IfGesture>
            <ElseIfGesture>
              <ExpressionGesture/>
              <MethodInvocationGesture/>
              <IfGesture>
                <ExpressionGesture/>
                <MethodInvocationGesture/>
              </IfGesture>
            </ElseIfGesture>
            <ElseGesture>
            </ElseGesture>
          </MethodDeclarationGesture>
        </ClassGesture>
        {ast}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.editor.text,
  translatedAST: state.translator.translatedAST
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadScript,
  translateJStoAST
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

