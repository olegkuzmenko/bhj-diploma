/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const getValue = (rightKey) => {
    if (options.hasOwnProperty(rightKey)) {
      return options[rightKey];
    } 
    return null;
  }

  const url = getValue('url');
  const data = getValue('data');
  const method = getValue('method');
  const callback = getValue('callback');
  


  let dataKeys = [];

  if (data) {
    dataKeys = Object.keys(data)
  }

  let xhr = new XMLHttpRequest;
  if ( method === 'GET') {
    let requestString = '';
    dataKeys.forEach( key => {
      requestString += `${key}=${data[key]}&` 
    })
    const builtRequest = `${url}?${requestString}`.slice(0, -1);
    try {
      xhr.open(method, builtRequest);
      xhr.responseType = 'json';
      xhr.withCredentials = true;
      xhr.send();
    }
    catch (e) {
      callback(e)
    }
    
  } else if (method === 'POST') {
    let formData = new FormData;
    dataKeys.forEach( key => {
      formData.append(key, data[key])  
    })

    try {
      xhr.open(method, url);
      xhr.responseType = 'json';
      xhr.withCredentials = true;
      xhr.send(formData);
    }
    catch (e) {
      callback(e)
    }

  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      if (xhr.response.success) {
        callback(null, xhr.response);
      } else {
        callback(xhr.response.error);
      }
    }
  }
  return xhr;
};
