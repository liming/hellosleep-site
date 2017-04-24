/**
 * The utilities for evaluation
 */

const evaluation = require('../data/evaluation.json').data;
const moment = require('moment');

exports = module.exports = {

  /**
   * Iterate the evaluation.json to match the evaluation answers and output
   * readable json result
   */
  formatAnswers: function(answers) {
    const formatAnswer = (item, answer) => {
      if (item.type === 'date') {
        const formatStr = item.options.type === 'date' ? 'll' : 'LT';
        return moment(answer).locale('zh-cn').format(formatStr);
      }

      if (['radio', 'select', 'checkbox'].indexOf(item.type) > -1) {
        const choice = item.data.find(n => n.value === answer);

        return choice ? choice.text : answer;
      }

      if (item.type === 'range') {
        return `${answer} ${item.options.unit}`;
      }

      return answer;
    };

    const getAnswer = (item) => {
      if (answers[item.name]) return { text: item.text, answer: formatAnswer(item, answers[item.name]) };

      return [];
    };

    const parseSection = (section) => {
      return section.reduce((results, item) => results.concat(getAnswer(item)), []);
    };

    return evaluation.map(section => {
      return {
        text: section.text,
        answers: parseSection(section.data)
      };
    });
  }
};
