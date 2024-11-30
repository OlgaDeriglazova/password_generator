//генерация случайной цифры от 0 до 9.
function getRandomInt () {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//генерация случайной строчной буквы.
function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//генерация случайной заглавной буквы.
function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//генерация случайного символа.
function getRandomSymbol() {
    return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}

//объект с фунциями генерации различных символов (не учитываем длину).
 const random = {
    number: getRandomInt,
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    symbol: getRandomSymbol,
 };

 // обработчик события для кнопки, генерирующий пароль.
 const generate = document.getElementById("generatePass");
 generate.addEventListener("click", () => {
    const length = Number(document.getElementById("passwordLength").value);
    const upper = document.getElementById("uppercase").checked;
    const lower = document.getElementById("lowercase").checked;
    const number = document.getElementById("numbers").checked;
    const symbol = document.getElementById("symbols").checked;
    generatePassword(length, upper, lower, number, symbol);
 });
  
function generatePassword(length, upper, lower, number, symbol) {
    let generatedPassword = ""; //строка для пароля.
    const typesCount = upper + lower + number + symbol; //считаем, сколько символов выбрано.
   //если человек не выбрал ни один тип символов
    if (typesCount === 0) {
        alert("Выберите хотя бы один тип символов.");
        return;
    }
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter((item) => Object.values(item)[0]); //фильтрация массива. Оставляем только true.

    //Добавляем по 1 символу из выбраных типов.
    typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += random[funcName]();  // добавляем один символ для каждого выбранноготипа.
    });

    //Заполняем оставшуюся длину пароля случайными символами.
    for (let i = generatedPassword.length; i < length; i++) {
        const randomFuncObj = typesArr[Math.floor(Math.random() * typesArr.length)];
        const funcName = Object.keys(randomFuncObj)[0];
        generatedPassword += random[funcName](); // Добавляем случайный символ,
    }
        const finalPassword = generatedPassword.slice(0, length);
        const result = document.getElementById("passwordResult").innerHTML = finalPassword;
 }

 document.getElementById("copyPass").addEventListener("click", () => {
    // Получение сгенерированного пароль и копирование в буфер.
    navigator.clipboard.writeText(document.getElementById("passwordResult").textContent)
      .then(() => alert("Пароль скопирован в буфер обмена!"))
      .catch(err => console.error("Ошибка при копировании: ", err));
  });
  


 
