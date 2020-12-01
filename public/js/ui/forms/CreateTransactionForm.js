/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    if (element) {
      super(element);
      this.renderAccountsList();
    }
    else {
      throw new Error('такого элемента не существует');
    }

  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {

    Account.list(User.current(), (error, response) => {
      if (!response) {
        console.log(error);
      }
      this.element.querySelector('select').innerHTML = '';
      response.data.forEach((account) => {
        this.element.querySelector('select').innerHTML += `<option value="${account.id}">${account.name}</option>`
      });

        
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {

    Transaction.create(options, (error, response) => {
      if (!response) {
        console.log(error);
      }
      App.update();
      this.element.reset();
      if (options.type === 'expense') {
        App.getModal('newExpense').close();
      }    
      else if (options.type === 'income') {
        App.getModal('newIncome').close();
      }
    })
  }
}
