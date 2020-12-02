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

  let url = getValue('url');
  const data = getValue('data');
  const method = getValue('method');
  const callback = getValue('callback');

  let dataKeys = [];

  if (data) {
    dataKeys = Object.keys(data)
  }


  let xhr = new XMLHttpRequest;
  xhr.responseType = 'json';
  xhr.withCredentials = true;

  let formData = new FormData();
  dataKeys.forEach( key => {
    formData.append(key, data[key])  
  })

  let requestString = '';
  
  dataKeys.forEach( key => {
    requestString += `${key}=${data[key]}&` 
  })
  const builtRequest = `${url}?${requestString}`.slice(0, -1);

  try {
    if ( method === 'GET') {
      console.log(url)
      xhr.open(method, builtRequest);
      xhr.send();
    
    } else if (method === 'POST') {
      xhr.open(method, url);
      xhr.send(formData);
    }
  }

  catch (e) {
      callback(e);
  }

  xhr.onload = () => callback(null, xhr.response);
  xhr.onerror = () => console.log('Ошибка');
  return xhr;
};
