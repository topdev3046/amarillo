import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  loadScript
} from '../../modules/editor'
import './editor.css'
import {
  translateJStoAST
} from '../../modules/translator'
import {
  translateASTtoModel
} from '../../modules/amarillo'

class Editor extends Component {

  translateToModel(props)
  {
    if (props.translatedAST === undefined)
    {
      props.translateJStoAST(this.props.text);
    }
    else
    {
      if (props.translatedModel === undefined)
      {
        props.translateASTtoModel(props.translatedJS);
      }
    }
  }

  componentWillMount() {
    this.translateToModel(this.props);
  }

  componentWillReceiveProps(props) {
    this.translateToModel(props);
  }

  render() {
    const hasModel = this.props.translatedModel !== undefined;

    const model = hasModel ? (
      <div>{this.props.translatedModel}</div>
    ) : false;

    return (
      <div className="App">
        {model}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.editor.text,
  translatedAST: state.translator.translatedAST,
  translatedModel: state.amarillo.translatedModel,
  translatedJS: state.translator.translatedJS
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadScript,
  translateJStoAST,
  translateASTtoModel,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

