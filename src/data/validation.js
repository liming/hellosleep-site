import request from 'superagent';

export function validate(values) {

  const errors = {};

  // validate name
  if (!values.name) {
    errors.name = "请填写昵称";
  } else if (values.name.length > 15) {
    errors.name = "昵称最大长度不得超过15个字";
  }

  if (!values.email) {
    errors.email = '请填写邮箱';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '无效的邮箱地址';
  }

  return errors;
}

export function asyncValidate(values) {
  // send to server the values for validation

  const fields = [];
  if (values.name) fields.push({key: 'name', value: values.name});
  if (values.email) fields.push({key: 'email', value: values.email});

  const requests = [];

  fields.forEach(field => {
    requests.push(
      new Promise((resolve, reject) => {

        const query = {};
        query[field.key] = field.value;

        return request
          .get('/api/evaluations')
          .query(query)
          .end((err, res) => {

            if (res.statusCode !== 404) {
              if (field.key === 'name') return resolve({name: '此昵称已经存在'});
              if (field.key === 'email') return resolve({email: '此邮箱已经存在'});
            }

            return resolve(null);
          });
      }));
  });

  return Promise.all(requests).then(result => {
    if (result && result[0]) throw result[0];
  });
}

export const asyncBlurFields = ['name', 'email'];
