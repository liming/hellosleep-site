import React, { Component, PropTypes } from 'react';

class Ranger extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const { input, options } = this.props;

    // Semantic UI Range
    $(this.refs.ranger).range({
      min: options.min,
      max: options.max,
      start: input.value || options.start,
      step: options.step || 1,
      onChange: value => {
        this.refs.preview.innerHTML = value.toString();
        input.onChange(value);
      },
      onMove: value => {
        this.refs.preview.innerHTML = value.toString();
      }
    });
  }

  render() {
    const { options } = this.props;

    return (
      <div className="ui segment">
        <div className="ui range" ref="ranger"></div>
        <p>
          <span ref="preview"></span>{options.unit}
        </p>
      </div>
    );
  }
}

export default Ranger;
