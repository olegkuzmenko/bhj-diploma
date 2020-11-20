/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const url = options.url;
  const mail = options.data.mail;
  const password = options.data.password;
  const method = options.method;
  const callback = options.callback ? options.callback : null;
  const response = options.responseType ? options.responseType : '';
  let xhr = new XMLHttpRequest;
  if ( method === 'GET') {
    const builtRequest = `${url}?mail=${mail}&password=${password}`;
    try {
      xhr.open(method, builtRequest);
      xhr.responseType = response;
      xhr.send();
    }
    catch (e) {
      callback(e)
    }
    
  } else if (method === 'POST') {
    builtRequest = url;
    let formData = new FormData;
    formData.append('mail', mail);
    formData.append('password', password);
    try {
      xhr.open(method, url);
      xhr.responseType = response;
      xhr.send(formData);
    }
    catch (e) {
      callback(e)
    }

  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      if (xhr.responseText.success && options.callback) {
        callback(e, response);

      } else if (!xhr.responseText.success && options.callback) {
        callback(e);
      }
    }
  }
  return xhr;
};
