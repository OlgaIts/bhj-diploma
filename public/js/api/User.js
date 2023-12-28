/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";

  static setCurrent(user) {
    const userString = JSON.stringify(user);
    localStorage.setItem("user", userString);
  }

  static unsetCurrent() {
    localStorage.removeItem("user");
  }
  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + "/current",
      method: "GET",
      // data,
      callback: (err, res) => {
        if (res && res.user) {
          this.setCurrent(res.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, res);
      },
    });
  }
  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + "/login",
      method: "POST",
      data,
      callback: (err, res) => {
        if (res && res.user) {
          this.setCurrent(res.user);
        }
        callback(err, res);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + "/register",
      data,
      method: "POST",
      callback: (err, res) => {
        if (res && res.user) {
          this.setCurrent(res.user);
        }
        callback(err, res);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + "/logout",
      method: "POST",
      callback
    });
  }
}
