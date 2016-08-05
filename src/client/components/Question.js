import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import DatePicker from './DatePicker';
import Ranger from './Ranger';

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question } = this.props;

    let fieldClass = 'field';
    if (question.type === 'radio') fieldClass = 'grouped fields';

    const labelStyle = {
      fontSize: "1rem"
    };

    return (
      <div className={fieldClass}>
        <label style={labelStyle}>{question.text}</label>
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
      return (<Field name={q.name} component={DatePicker} placeholder={q.placeHolder} type={type} options={q.options} />);
    }

    if (type === 'range') {
      return (<Field name={q.name} component={Ranger} options={q.options} />);
    }

    if (type === 'radio' || type === 'checkbox') {

      const divClass = type === 'radio' ? 'ui radio checkbox' : 'ui checkbox';

      return (
        <div>
          {q.data.map((item, i) =>
            <div className="field" key={i}>
              <div className={divClass}>
                <Field name={type === 'radio' ? q.name : item.value} component="input" type={type} value={item.value}/>
                <label>{item.text}</label>
              </div>
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
            {q.data.map((item, i) =>
              <option value={item.value} key={i}>{item.text}</option>
             )}
          </Field>
        </div>
      );
    }
  }
};

export default Question;
