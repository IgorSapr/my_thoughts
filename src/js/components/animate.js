document.addEventListener('DOMContentLoaded', () => {
  //Массив чата
  const chatArr = [
    {
      img: 'img/avatar-1.png',
      textUser: 'Впереди рабочий день — много всего надо сделать...',
      textAdmin:
        'Понимаю, это может вызывать тревогу. А какие мысли приходят вам в голову, когда вы думаете о предстоящем рабочем дне?',
    },
    {
      img: 'img/avatar-2.png',
      textUser: 'Я не умею заводить друзей...',
      textAdmin:
        'Поделитесь, пожалуйста, что именно вас беспокоит в процессе знакомства? Какие эмоции вы при этом испытываете?',
    },
    {
      img: 'img/avatar-3.png',
      textUser: 'Я никому не нужен...',
      textAdmin:
        'Это может быть очень тяжелым ощущением. Если вы не возражаете, расскажите, какие обстоятельства привели вас к такой мысли?',
    },
    {
      img: 'img/avatar-4.png',
      textUser: 'Уже давно у меня нет отношений...',
      textAdmin:
        'Не могли бы вы поделиться, как вы думаете, всегда ли прошлый опыт определяет наше будущее?',
    },
    {
      img: 'img/avatar-5.png',
      textUser: 'Наверное, я что-то делаю не так...',
      textAdmin:
        'Как вы считаете, что именно могло пойти не так? Есть ли конкретные моменты, которые вызывают у вас такие мысли?',
    },
  ];

  // Время смены блоков с чатом в мс.
  const delay = 20000;

  //Функция, возвращающает блок с чатом
  function getChat(chat) {
    const chatWrap = document.createElement('div');
    chatWrap.classList.add('chat');
    chatWrap.style.visibility = 'hidden';
    chatWrap.style.opacity = 0;

    if ((chatWrap.style.visibility = 'hidden')) {
      chatWrap.classList.add('animate__animated', 'animate__fadeInDown');

      chatWrap.style.visibility = 'visible';
      chatWrap.style.opacity = 1;
    }

    if ((chatWrap.style.visibility = 'visible')) {
      setTimeout(() => {
        chatWrap.classList.remove('animate__animated', 'animate__fadeInDown');

        chatWrap.style.visibility = 'hidden';
        chatWrap.style.opacity = 0;
        chatWrap.style.animation = 'closing 2s ease-in-out';
      }, delay - 4000);
    }

    // User
    const chatUser = document.createElement('div');
    chatUser.classList.add('chat__message', 'chat__user');

    const chatUserImg = document.createElement('img');
    chatUserImg.classList.add('chat__image', 'chat__user-image');
    chatUserImg.src = chat.img;

    const chatUserBlock = document.createElement('div');
    chatUserBlock.classList.add('chat__block', 'chat__user-block');

    const chatUserText = document.createElement('p');
    chatUserText.classList.add('text', 'chat__user-text');
    chatUserText.textContent = chat.textUser;

    // Admin
    const chatAdmin = document.createElement('div');
    chatAdmin.classList.add(
      'chat__message',
      'chat__admin',
      'animate__animated',
      'animate__fadeIn',
      'animate__delay-3s',
      'animate__slow'
    );

    const chatAdminImg = document.createElement('img');
    chatAdminImg.classList.add('chat__image', 'chat__admin-image');
    chatAdminImg.src = 'img/logo-chat.svg';

    const chatAdminBlock = document.createElement('div');
    chatAdminBlock.classList.add('chat__block', 'chat__admin-block');

    const chatAdminText = document.createElement('p');
    chatAdminText.classList.add('text', 'chat__admin-text');

    // Анимация текста
    let line = 0;
    let count = 0;
    let out = '';

    function typeLine(text, element) {
      let interval = setTimeout(() => {
        out += text[line][count];
        element.innerHTML = out + '|';
        count++;

        if (count >= text[line].length) {
          count = 0;
          line++;
          if (line == text.length) {
            clearTimeout(interval);
            element.innerHTML = out;
            return true;
          }
        }
        typeLine(text, element);
      }, getRandomInt(getRandomInt(100 * 3.0)));
    }

    setTimeout(() => {
      typeLine(chat.textAdmin, chatAdminText);
    }, 4000);

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    // Добавляем элементы
    chatAdminBlock.append(chatAdminText);
    chatAdmin.append(chatAdminImg, chatAdminBlock);
    chatUserBlock.append(chatUserText);
    chatUser.append(chatUserImg, chatUserBlock);
    chatWrap.append(chatUser, chatAdmin);

    return chatWrap;
  }

  const heroRight = document.querySelector('.hero__right');

  // Запускаем чаты
  function showChat() {
    if (document.visibilityState !== 'visible') return;

    for (let i = 0; i < chatArr.length; i++) {
      setTimeout(() => {
        heroRight.append(getChat(chatArr[i]));
        setTimeout(() => {
          heroRight.firstChild.remove();
        }, delay - 2000);
      }, delay * i);
    }
  }

  document.addEventListener('visibilitychange', showChat);

  //  Бесконечный вызов функции чатов сразу
  function robustSetInterval(func, interval) {
    function wrapper() {
      func();
      setTimeout(wrapper, interval);
    }
    wrapper();
  }

  robustSetInterval(showChat, delay * 5);

  // Перезагрузка страницы при повторном заходе
  function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      location.reload();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
});
