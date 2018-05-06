import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ClassGesture extends Component {
  render() {
    return (
    <div className="Gesture a">
      <svg height="600">
        <circle cx={10} cy={10} r={10} fill="brown" />
        <circle cx={32} cy={10} r={10} fill="brown" />
        <circle cx={54} cy={10} r={10} fill="brown" />
        <circle cx={10} cy={211} r={10} fill="brown" />
        <circle cx={10} cy={432} r={10} fill="brown" />
        <circle cx={32} cy={432} r={10} fill="brown" />
        <circle cx={54} cy={432} r={10} fill="brown" />
      </svg>
      {this.props.children}
    </div>
    );
  }
}

class MethodDeclarationGesture extends Component {
  render() {
    return (
      <div className="Gesture b">
          <svg>
            <circle cx={10} cy={10} r={10} fill="orange" />
            <circle cx={32} cy={10} r={10} fill="orange" />
            <circle cx={54} cy={10} r={10} fill="orange" />
            <circle cx={84} cy={10} r={10} fill="orange" />
            <circle cx={114} cy={10} r={10} fill="orange" />
          </svg>
          {this.props.children}
      </div>
    );
  }
}

class IfGesture extends Component {
  render() {
    return (
      <div className="Gesture e">
          <svg>
          <circle cx={32} cy={10} r={10} fill="lime" />
          <circle cx={10} cy={30} r={10} fill="lime" />
          <circle cx={54} cy={30} r={10} fill="lime" />
          </svg>
          {this.props.children}
      </div>
    );
  }
}

class ExpressionGesture extends Component {
  render() {
    return (
      <div className="Gesture c">
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
      <div className="Gesture d">
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
        <div className="Gesture f">
          <svg>
            <circle cx={10} cy={10} r={10} fill="red" />
            <circle cx={32} cy={30} r={10} fill="red" />
            <circle cx={54} cy={50} r={10} fill="red" />
          </svg>
          {this.props.children}
        </div>
    );
  }
}

class ElseGesture extends Component {
  render() {
    return (
      <div className="Gesture g">
        <svg>
          <circle cx={10} cy={50} r={10} fill="red" />
          <circle cx={32} cy={30} r={10} fill="red" />
          <circle cx={54} cy={10} r={10} fill="red" />
        </svg>
        {this.props.children}
      </div>
    );
  }
}
class App extends Component {
  render() {
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
    </div>
    );
  }
}

export default App;
