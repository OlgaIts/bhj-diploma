/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const callback = (err, res) => {
      if (res.success) {
        this.element.reset();
        User.setCurrent(res.user)
        App.setState('user-logged');
        App.getModal('login').close();
      } else {
        alert(err)
      }
    };
    User.login(data, callback);
  }
}
