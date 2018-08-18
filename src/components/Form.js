import React, { Component } from 'react';
import { View } from 'react-native';
import { FormContext } from '../Context';
import FormController from '../Controller/FormController';

class Form extends Component {
  constructor(props) {
    super(props);
    const {
      onSubmit,
      preSubmit,
      getApi,
      dontPreventDefault,
      onSubmitFailure,
      initialValues
    } = props;
    this.controller = new FormController(
      {
        onSubmit,
        getApi,
        preSubmit,
        onSubmitFailure
      },
      {
        dontPreventDefault,
        initialValues
      }
    );
    this.controller.on('change', () => this.forceUpdate());
    this.controller.on('change', state => {
      if (props.onChange) {
        props.onChange(state);
      }
    });
    this.controller.on('values', values => {
      if (props.onValueChange) {
        props.onValueChange(values);
      }
    });
  }

  get formContext() {
    return {
      formApi: this.controller.api,
      formState: this.controller.state,
      controller: this.controller
    };
  }

  get content() {
    const { children, component, render } = this.props;

    const props = this.formContext;

    if (component) {
      return React.createElement(component, props, children);
    }
    if (render) {
      return render(props);
    }
    if (typeof children === 'function') {
      return children(props);
    }
    return children;
  }

  render() {
    return (
      <FormContext.Provider value={this.formContext}>
        <View>{this.content}</View>
      </FormContext.Provider>
    );
  }
}

export default Form;
