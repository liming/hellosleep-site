
import {
  NEXT_STEP,
  PREVIOUS_STEP,
  PREPARE_EVALUATION,
  SUBMIT_RESULT,
  SHOW_CONFIRM_DIALOG,
  CLOSE_CONFIRM_DIALOG
} from '../actions/evaluation';

function evaluation(state = {}, action) {

  switch(action.type) {
  case PREPARE_EVALUATION:
    return Object.assign({}, state, {
      totalStep: action.totalStep,
      stepCounts: action.stepCounts,
      content: action.content,
      question: action.question,
      step: action.step,
      tracks: action.tracks,
      initialValues: action.initValues || {}
    });
  case NEXT_STEP:
  case PREVIOUS_STEP:
    return Object.assign({}, state, {
      step: action.step,
      question: action.question,
      tracks: action.tracks
    });
  case SUBMIT_RESULT:
    return Object.assign({}, state, {
      results: action.results
    });
  case SHOW_CONFIRM_DIALOG:
    return Object.assign({}, state, {
      showConfirmDialog: true
    });
  case CLOSE_CONFIRM_DIALOG:
    return Object.assign({}, state, {
      showConfirmDialog: false
    });
  default:
    break;
  }

  return state;
}

export default evaluation;
