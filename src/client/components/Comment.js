import React, { PropTypes } from 'react';

const Comment = ({ author, formatedDate, content}) => (
  <div className="card a-comment">
    <div className="card-block">

      <div className="card-title">
        <span className="m-r-1 font-weight-bold">{author}</span>
        <span className="m-r-1 pull-xs-right text-muted">{formatedDate}</span>
      </div>

      <div className="card-text">
        {content}
      </div>

    </div>
  </div>
);

export default Comment;
