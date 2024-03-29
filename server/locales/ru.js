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
            edit: 'Не удалось изменить пользователя',
          },
          success: 'Пользователь успешно изменён',
        },
        delete: {
          error: {
            auth: 'Вы не можете редактировать или удалять другого пользователя',
            default: 'Не удалось удалить пользователя',
          },
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
          error: 'Не удалось удалить статус',
          success: 'Статус успешно удалён',
        },
      },
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        edit: {
          error: 'Не удалось изменить метку',
          success: 'Метка успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Метка успешно удалена',
        },
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        edit: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно изменена',
        },
        delete: {
          error: 'Задачу может удалить только её автор',
          success: 'Задача успешно удалёна',
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
        tasks: 'Задачи',
        labels: 'Метки',
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
        description: 'Описание',
        statusId: 'Статус',
        executorId: 'Исполнитель',
        label: 'Метки',
        executor: 'Исполнитель',
        status: 'Статус',
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
        createStatusButton: 'Создать статус',
        act: {
          delete: 'Удалить',
          edit: 'Изменить',
        },
        edit: {
          title: 'Изменение статуса',
          submit: 'Изменить',
          error: 'Не удалось изменить статус',
        },
        new: {
          title: 'Создание статуса',
          submit: 'Создать',
          create: 'Создать',
        },
      },
      labels: {
        id: 'ID',
        name: 'Полное имя',
        createdAt: 'Дата создания',
        actions: 'Действия',
        title: 'Метки',
        createLabelButton: 'Создать метку',
        act: {
          delete: 'Удалить',
          edit: 'Изменить',
        },
        edit: {
          title: 'Изменение статуса',
          submit: 'Изменить',
          error: 'Не удалось изменить статус',
        },
        new: {
          title: 'Создание метки',
          submit: 'Создать',
          create: 'Создать',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        actions: 'Действия',
        title: 'Задачи',
        createTaskButton: 'Создать задачу',
        status: 'Статус',
        creator: 'Автор',
        executor: 'Исполнитель',
        act: {
          delete: 'Удалить',
          edit: 'Изменить',
        },
        edit: {
          title: 'Изменение задачи',
          submit: 'Изменить',
          error: 'Не удалось изменить задачу',
        },
        new: {
          title: 'Создание задачи',
          submit: 'Создать',
          create: 'Создать',
        },
        view: {
          creator: 'Автор',
          executor: 'Исполнитель',
          createdAt: 'Дата создания',
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
