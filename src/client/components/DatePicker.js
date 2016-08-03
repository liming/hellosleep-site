import React, { Component, PropTypes } from 'react';

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { type, input, options } = this.props;
    const calType = options.type || 'date';

    let config = {
      type: calType,
      ampm: false,
      initialDate: options.initialDate ? new Date(options.initialDate) : null,
      onChange: input.onChange
    };

    if (calType === 'date') {
      config.formatter = {
        date: function (date) {
          if (!date) return '';
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          return `${year}-${month}-${day}`;
        }
      }
    }

    if (options.start) config.startMode = options.start;

    if (options.range) {
      const startCal = $(this.refs.rangestart);
      const endCal = $(this.refs.rangeend);

      startCal.calendar(Object.assign({}, config, {endCalendar: endCal}));
      endCal.calendar(Object.assign({}, config, {startCalendar: startCal}));
    } else {
      $(this.refs.datepicker).calendar(config);
    }
  }

  render() {
    const { placeholder, options } = this.props;

    const fieldStyle = {
      marginTop: "2rem"
    };

    if (options.range) {
      return (
        <div className="ui form">
          <div className="two fields">
            <div className="field">
              <label>{options.startText}</label>
              <div className="ui calendar" ref="rangestart">
                <div className="ui input left icon">
                  <i className="calendar icon"></i>
                  <input type="text" placeholder={options.startPlaceHolder} />
                </div>
              </div>
            </div>
            <div className="field">
              <label>{options.endText}</label>
              <div className="ui calendar" ref="rangeend">
                <div className="ui input left icon">
                  <i className="calendar icon"></i>
                  <input type="text" placeholder={options.endPlaceHolder} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

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
