/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    const callback = (err, res) => {
      if (res.success) {
        App.update();
        this.element.reset();
        App.getModal("createAccount").close();
      } else {
        alert(err);
      }
    };
    Account.create(data, callback);
  }
}
