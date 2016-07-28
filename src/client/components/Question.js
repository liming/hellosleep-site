import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import DatePicker from './DatePicker';

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question } = this.props;

    let fieldClass = 'field';
    if (question.type === 'radio') fieldClass = 'grouped fields';

    return (
      <div className={fieldClass}>
        <label>{question.text}</label>
        {this.renderField(question)}
      </div>
    );
  }

  renderField(q) {
    const type = q.type;

    if (type === 'input') {
      return (<Field name={q.name} component="input" placeholder={q.placeHolder} />);
    }

    if (type === 'date') {
      return (<Field name={q.name} component={DatePicker} placeholder={q.placeHolder} type='date' />);
    }

    if (type === 'radio') {
      return (
        <div className="field">
          {q.data.map(item =>
            <div className="ui radio checkbox">
              <label><Field name={q.name} component="input" type="radio" value={item.value}/> {item.text}</label>
            </div>
           )}
        </div>
      );
    }

    if (type === 'select') {
      return (
        <div>
          <Field name={q.name} className="ui selection dropdown" component="select">
            <option></option>
            {q.data.map(item =>
              <option value={item.value}>{item.text}</option>
             )}
          </Field>
        </div>
      );
    }
  }
};

export default reduxForm({
  form: 'question',
  destroyOnUnmount: false
})(Question);
