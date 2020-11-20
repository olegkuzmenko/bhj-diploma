/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity{
  constructor(...params) {
    super(...params);
    this.URL = `/transaction`;
  }
}
