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
    
    const cb = (error, response) => {
      if (response) {
        response.data.forEach((account) => {
          this.element.querySelector('select').innerHTML += `<option value="${account.id}">${account.name}</option>`
        });
      }
      else
        console.log(error);
    }

    Account.list(User.current(), cb)
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    const cb = (error, response) => {
      if (response) {
        App.update();
        this.element.reset();
        if (options.type === 'expense')
          App.getModal('newExpense').close();
        else if (options.type === 'income')
          App.getModal('newIncome').close();
      }
      else
        console.log(error);
    }

    Transaction.create(options, cb)
  }
}
