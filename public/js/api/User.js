/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user'
  
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user)
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.clear();

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    return createRequest({
      url: this.URL + '/current',
      data,
      responseType: 'json',
      callback: (err, response) => {
        if (response && response.user) {
          console.log(response.user)
          this.setCurrent(response.user)
        } else if (!response.success) {
          console.log(response)
          this.unsetCurrent()
        }
        callback.call(this, err, response);
      },
      method: 'GET',
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    const options = {
      url: this.URL + '/login',
      data,
      responseType: 'json',
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user)
        }
        callback(err, response);
      },
      method: 'POST',
    };
    return createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    const options = {
      url: this.URL + '/register',
      data,
      responseType: 'json',
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user)
        }
        callback(err,response);
      },
      method: 'POST',
    };
    return createRequest(options);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    const options = {
      url: this.URL + '/logout',
      data,
      responseType: 'json',
      callback: (err, response) => {
        if (response && response.user) {
          this.unsetCurrent()
        }
        callback(err,response);
      },
      method: 'POST',
    };
    return createRequest(options);

  }
}
