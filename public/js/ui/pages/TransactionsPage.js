/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();

    } else {
      throw new Error('такого элемента не существует')
    }

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
    else {
      this.render();
    } 
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {


    const remove = (e) => {

      if (e.target.closest('button').classList.contains('remove-account'))
        this.removeAccount();

      if (e.target.closest('button').classList.contains('transaction__remove'))
        this.removeTransaction(e.target.getAttribute('data-id'))
    }

    this.element.addEventListener('click', (e) => remove(e));

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }

    const ask = confirm('Вы действительно хотите удалить счет?');
    const cb = (error, response) => {
      if (response) {
        this.clear();
        App.update();
      }
      else
        console.log(error);
    };
    
    if (ask) {
      Account.remove(this.lastOptions.account_id, {}, cb)
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    if (!this.lastOptions) {
      return;
    }

    const ask = confirm('Вы действительно хотите удалить транзакцию?');

    
    if (ask) {
      Transaction.remove(id, {}, (error, response) => {
        if (response) {
          App.update();
        }
        else {
          console.log(error);
  
        }  
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options = null) {

    if (!options) {
      return
    }

    this.lastOptions = options;

    Account.get(options.account_id, '', (err, response) => {
      if (response) {
        this.renderTitle(response.data.name);
      }
      else {
        console.log(err);
      }
    })

    Transaction.list(options, (err, response) => {
      this.renderTransactions(response.data);
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTitle("Название счёта");
    this.renderTransactions([]);
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) { 
    return `${new Date(date).toLocaleString('ru', { day: '2-digit', month: 'long', year: 'numeric' })} в ${new Date(date).toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})}`;

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>
    `

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    this.element.querySelector('.content').innerHTML = '';
    data.forEach((item) => {
      this.element.querySelector('.content').innerHTML += this.getTransactionHTML(item);
    })

  }
}
