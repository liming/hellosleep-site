import request from 'superagent';

export const RECEIVE_META = 'RECEIVE_META';

export function likePost() {
  
}

function receivePostMeta(id, result) {
  return {
    type: RECEIVE_META,
    id: id,
    meta: result,
    receivedAt: Date.now()
  };
}

function requestPostMeta(id) {
  return dispatch => {
    return request
      .get(`/api/posts/{id}/meta`)
      .end((err, res) => {
        if (err) console.error(err);

        if (!err && res.body) {
          dispatch(receivePostMeta(id, res.body));
        }
      });
  };
}

export function fetchPostMeta(id) {
  return dispatch => {
    return dispatch(requestPostMeta(id));
  };
}
