import React, { Component, PropTypes } from 'react';

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { type, onChange } = this.props;

    $(this.refs.datepicker).calendar({
      type: type,
      onChange: onChange
    });
  }

  render() {
    const { placeholder } = this.props;

    return (
      <div className="ui calendar" ref="datepicker">
        <div className="ui input left icon">
          <i className="calendar icon"></i>
          <input type="text" placeholder={placeholder} />
        </div>
      </div>
    );
  }
};

export default DatePicker;
