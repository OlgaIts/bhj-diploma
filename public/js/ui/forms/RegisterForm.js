/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const callback = (err, res) => {
      if (res.user) {
        this.element.reset();
        App.setState("user-logged");
        App.getModal("register").close();
      } else {
        alert(err, "ошибка");
      }
    };
    User.register(data, callback);
  }
}
