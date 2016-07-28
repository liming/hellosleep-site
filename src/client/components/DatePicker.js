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
      <div class="ui calendar" ref="datepicker">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder={placeholder} />
        </div>
      </div>
    );
  }
};

export default DatePicker;
