import React, { Component, PropTypes } from 'react';

class ResultTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results } = this.props;

    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>name</th>
            <th>text</th>
          </tr>
        </thead>
        <tbody>
          {results.tags.map((tag, i) =>
            <tr key={i}>
              <td>{tag.name}</td>
              <td>{tag.text}</td>
            </tr>
           )}
        </tbody>
      </table>
    );
  }
}

export default ResultTable;
