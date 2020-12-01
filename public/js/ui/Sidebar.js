/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarButton = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar-mini');
    const sidebarToggle = (event) => {
      event.preventDefault();
      sidebar.classList.toggle('sidebar-open');
      sidebar.classList.toggle('sidebar-collapse');
    }
    sidebarButton.addEventListener('click', sidebarToggle)

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginButton = document.querySelector('.menu-item_login');
    const registerButton = document.querySelector('.menu-item_register');
    const logoutButton = document.querySelector('.menu-item_logout')

    const openLoginModal = function (event) {
      event.preventDefault();
      App.getModal('login').open(); 
    }

    const openRegisterModal = function (event) {
      event.preventDefault();
      App.getModal('register').open(); 
    }

    const logout = function (event) {
      event.preventDefault();
      const data = User.current()
      User.logout(data, (error, response) => {
        if (response) {
          App.setState('init')
        } else {
          console.log(error)
        }
      }) 

    }



    loginButton.firstElementChild.addEventListener('click', openLoginModal)
    registerButton.firstElementChild.addEventListener('click', openRegisterModal)
    logoutButton.firstElementChild.addEventListener('click', logout)


  }

}
