import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import DatePicker from './DatePicker';
import Ranger from './Ranger';

function renderField(q, meta, input) {
  const type = q.type;

  if (type === 'text' || type === 'email') {
    return (<div className="ui input"><input {...input} placeholder={q.placeholder} type={type} /></div>);
  }

  if (type === 'date') {
    return (<DatePicker {...input} name={q.name} placeholder={q.placeHolder} type={type} options={q.options} />);
  }

  if (type === 'range') {
    return (<Ranger {...input} name={q.name} options={q.options} />);
  }

  if (type === 'radio' || type === 'checkbox') {

    const divClass = type === 'radio' ? 'ui radio checkbox' : 'ui checkbox';

    return (
      <div>
        {q.data.map((item, i) =>
          <div key={i} className="field">
            <div className={divClass}>
              <input {...input} name={type === 'radio' ? q.name : item.value} type={type} />
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
        <select name={q.name} className="ui selection dropdown">
          <option></option>
          {q.data.map((item, i) =>
            <option value={item.value} key={i}>{item.text}</option>
           )}
        </select>
      </div>
    );
  }
};

const renderQuestion = ({input, meta, data }) => {
  const type = data.type;
  const {touched, error} = meta;

  let fieldClass = 'field';
  if (data.type === 'radio') fieldClass = 'grouped fields';
  else if (touched && error) {
    fieldClass = 'field error';
  }

  const labelStyle = {
    fontSize: "1rem"
  };

  const errorStyle = {
    color: "red"
  };

  return (
    <div className={fieldClass}>
      <label style={labelStyle}>{data.text}</label>
      {renderField(data, input)}
      {touched && error && <span style={errorStyle}>{error}</span>}
    </div>
  )
};

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question } = this.props;

    const labelStyle = {
      fontSize: "1rem"
    };

    return (
      <Field
        name={question.name}
        data={question}
        component={renderQuestion}
      />
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
