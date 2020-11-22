/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      //this.closers = element.querySelectorAll('button[data-dismiss="modal"]')

    } else {
      throw new Error('такого элемента не существует')
    }
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const all = this.element.querySelectorAll('button[data-dismiss="modal"]')
    all.forEach(item => {
      item.addEventListener('click', (e) => {
        this.onClose(e);
      });
    });
  };

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    e.preventDefault(); 
    this.close();
    this.unregisterEvents();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const all = this.element.querySelectorAll('button[data-dismiss="modal"]')
    all.forEach(item => {
      item.removeEventListener('click', (e) => {
        this.onClose(e);
      });
    });
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.removeAttribute('style');
  }
}
