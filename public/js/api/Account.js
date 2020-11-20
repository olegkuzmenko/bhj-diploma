/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity{
  constructor(...params) {
    super(...params);
    this.URL = `/account`;
  }
}
