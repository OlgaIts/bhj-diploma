/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const callback = (err, res) => {
      const accSelect = this.element.querySelector(".accounts-select");
      accSelect.innerHTML = ``;
      if (res.success) {
        res.data.map((account) => {
          accSelect.innerHTML += `<option value="${account.id}">${account.name}</option>`;
        });
      } else {
        alert(err);
      }
    };
    Account.list({}, callback);
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const callback = (err, res) => {
      if (res.success) {
        App.update();
        this.element.reset();
        App.getModal("newIncome").close();
        App.getModal("newExpense").close();
      } else {
        alert(err);
      }
    };
    Transaction.create(data, callback);
  }
}
