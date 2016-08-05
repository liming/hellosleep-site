import React, { Component, PropTypes } from 'react';

class ModalDialog extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    const { isShow, onCancel, onSubmit } = this.props;

    if (newProps.isShow && !isShow) {

      $(this.refs.modal).modal({
        closable: false,
        onDeny: onCancel,
        onApprove: onSubmit
      }).modal('show');
    } else if (!newProps.isShow && isShow) {

      $(this.refs.modal).modal('hide');
    }
  }

  render() {
    const { isShow, title, description } = this.props;

    return (
      <div className="ui modal" ref="modal">
        <i className="close icon"></i>
        <div className="header">
          {title}
        </div>
        <div className="content">
          <div className="description">
            {description}
          </div>
        </div>
        <div className="actions">
          <div className="ui cancel button">取消</div>
          <div className="ui approve button">确认</div>
        </div>
      </div>
    );
  }
}

export default ModalDialog;
