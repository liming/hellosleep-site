import request from 'superagent';

export const RECEIVE_META = 'RECEIVE_META';

export function clickChange() {
  
}

function receivePostMeta(id, result) {
  return {
    type: RECEIVE_META,
    id: id,
    meta: result,
    receivedAt: Date.now()
  };
}

export function fetchPostMeta(id) {
  return dispatch => {
    return request
      .get(`/api/posts/{id}`)
      .end((err, res) => {
        if (err) console.error(err);

        if (!err && res.body) {
          dispatch(receivePostMeta(id, res.body));
        }
      });
  };
}
