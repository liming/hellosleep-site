
import {
  NEXT_STEP,
  PREVIOUS_STEP
} from '../actions/evaluation';

function evaluation(state, action) {
  let newState = Object.assign({}, state);

  switch(action.type) {
  case NEXT_STEP:
    newState.step += 1;
    break;
  case PREVIOUS_STEP:
    if (newState.step > 1) newState.step -= 1;
    break;
  default:
    break;
  }

  return newState;
}

export default evaluation;
