const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  //извелкаем параметры запроса
  let { url, data, method = "GET", callback } = options;
  //для отправки данных в запросе
  let formData = new FormData();

  // если метод GET, формируем параметр запроса
  if (method === "GET") {
    //GET - query-параметры  // account/i   account?id=2&user=Вася&...
    url = url + "?";
    for (let key in data) {
      url += key + "=" + data[key] + "&";
    }
    url = url.slice(0, -1);
  } else {
    // POST / DELETE / PUT / PATCH - body в формате JSON
    //добавляем данные в объект formData для других методов
    for (let key in data) {
      formData.append(key, data[key]);
    }
  }
  xhr.open(method, url);
  xhr.send(formData);

  try {
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          callback(null, xhr.response);
        } else {
          callback(new Error(`Request failed with status ${xhr.status}`));
        }
      }
    });
  } catch (error) {
    callback(error);
  }
};
