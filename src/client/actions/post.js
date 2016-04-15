import request from 'superagent';

export const RECEIVE_META = 'RECEIVE_META';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';

export function likePost(id) {
  return dispatch => {

    let postStatus;
    try {
      postStatus = JSON.parse(localStorage.getItem(id));
    } catch(e) {
      return dispatch({
        // this means nothing change
        type: RESPONSE_ERROR,
        message: e.message
      });
    }

    const query = postStatus && postStatus.like ? '?method=delete' : '';

    return request.post(`/api/posts/${id}/like${query}`)
      .end((err, res) => {
        if (err) {
          console.error(err);
          return dispatch({
            // this means nothing change
            type: RESPONSE_ERROR,
            message: err.message
          });
        }

        if (res.body) {

          if (!postStatus) postStatus = { like: true };
          else if (!postStatus.like) postStatus.like = true;
          else if (postStatus.like) postStatus.like = false;

          localStorage.setItem(id, JSON.stringify(postStatus));

          return dispatch({
            type: RECEIVE_META,
            id: id,
            meta: {likes: res.body.data},
            receivedAt: Date.now()
          });
        }
      });
  };
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
