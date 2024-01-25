// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: {
            wrongAuth: 'Вы не можете редактировать или удалять другого пользователя',
            noAuth: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
            edit: 'Не удалось изменить пользователя'
          },
          success: 'Пользователь успешно изменён',
        },
        delete: {
          error: 'Вы не можете редактировать или удалять другого пользователя',
          success: 'Пользователь успешно удалён',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        edit: {
          error: 'Не удалось изменить статус',
          success: 'Статус успешно изменён',
        },
        delete: {
          error: 'Вы не можете редактировать или удалять несуществующий статус',
          success: 'Статус успешно удалён',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        statuses: 'Статусы',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
          emailPlaceholder: 'Email',
          passwordPlaceholder: 'Пароль',
        },
      },
      forms: {
        email: 'Email',
        password: 'Пароль',
        lastName: 'Фамилия',
        firstName: 'Имя',
        name: 'Наименование',
      },
      users: {
        id: 'ID',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        actions: 'Действия',
        title: 'Пользователи',
        act: {
          delete: 'Удалить',
          edit: 'Изменить',
        },
        edit: {
          edit: 'Изменение пользователя',
        },
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Полное имя',
        createdAt: 'Дата создания',
        actions: 'Действия',
        title: 'Статусы',

        act: {
          delete: 'Удалить',
          edit: 'Изменить',
        },
        edit: {
          title: 'Изменение статуса',
          submit: 'Изменить',
          error: 'Не удалось изменить статус'
        },
        createStatusButton: 'Создать статус',
        new: {
          title: 'Создание статуса',
          submit: 'Создать',
          create: 'Создать',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
