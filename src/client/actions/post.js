import request from 'superagent';

export const RECEIVE_META = 'RECEIVE_META';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';
export const TOGGLE_SUBMIT = 'TOGGLE_SUBMIT';
export const COMMENT_INVALID = 'COMMENT_INVALID';

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

export function toggleSubmit(checked) {
  return {
    type: TOGGLE_SUBMIT,
    enabledSubmit: checked
  };
}

function validateComment(comment) {
  let errors = {};

  if (!comment.author || !comment.author.length) {
    errors.author = '请填写用户名';
  }

  if (!comment.email || !comment.email.length) {
    errors.email = '请填写邮箱';
  }

  if (comment.email) {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(comment.email)) {
      errors.email = '请填写正确的邮箱格式';
    }
  }

  if (!comment.content || !comment.content.length) {
    errors.content = '请填写回复内容';
  }

  let invalid = false;
  for (let error in errors) {
    invalid = true;
    break;
  }

  if (!invalid) return true;

  return {
    type: COMMENT_INVALID,
    errors: errors
  };
}

export function submitComment(id, comment) {
  const result = validateComment(comment);
  if (result == true) {

  } else {
    return result;
  }
}
