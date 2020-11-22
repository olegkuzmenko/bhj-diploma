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
  const response = getValue('responseType') ? getValue('responseType') : '';

  let dataKeys = [];

  if (data) {
    dataKeys = Object.keys(data)
  }

  console.log(url, data, method, response)


  let xhr = new XMLHttpRequest;
  if ( method === 'GET') {
    let requestString = '';
    dataKeys.forEach( key => {
      requestString += `${key}=${data[key]}&` 
    })
    const builtRequest = `${url}?${requestString}`.slice(0, -1);
    try {
      xhr.open(method, builtRequest);
      xhr.responseType = response;
      xhr.withCredentials = true;
      xhr.send();
    }
    catch (e) {
      callback(e)
    }
    
  } else if (method === 'POST') {
    let formData = new FormData;
    console.log(formData)
    dataKeys.forEach( key => {
      formData.append(key, data[key])  
    })

    try {
      xhr.open(method, url);
      xhr.responseType = response;
      xhr.withCredentials = true;
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
