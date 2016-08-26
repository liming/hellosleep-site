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

  if (!values.birthday) errors.birthday = '请选择出生日期';

  if (!values.sex) errors.sex = '请选择性别';

  if (!values.status) errors.status = '请选择性别';

  return errors;
}

export function asyncValidate(values) {
  // send to server the values for validation

  // get the field name
  const name = arguments[3];

  if (['name', 'email'].indexOf(name) === -1) return Promise.resolve();

  const query = {};
  query[name] = values[name];

  const findEva = key => new Promise((resolve, reject) => {

    return request
      .get('/api/evaluations')
      .query(query)
      .end((err, res) => {
        if (res.statusCode !== 404) return resolve(key);

        return resolve();
      });
  });

  return findEva(name).then(key => {
    if (key === 'name') throw {name: '此昵称已经存在'};
    else if (key === 'email') throw {email: '此邮箱已经存在'};
  });
}

export const asyncBlurFields = ['name', 'email'];
