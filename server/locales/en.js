// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Incorrect email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User successfully registered',
        },
        edit: {
          error: {
            wrongAuth: 'You cannot edit or delete another user',
            noAuth: 'Access denied! Please log in.',
            edit: 'Failed to edit user',
          },
          success: 'User successfully edited',
        },
        delete: {
          error: {
            auth: 'You cannot edit or delete another user',
            default: 'Failed to delete user',
          },
          success: 'User successfully deleted',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create status',
          success: 'Status successfully created',
        },
        edit: {
          error: 'Failed to edit status',
          success: 'Status successfully edited',
        },
        delete: {
          error: 'Failed to delete status',
          success: 'Status successfully deleted',
        },
      },
      labels: {
        create: {
          error: 'Failed to create label',
          success: 'Label successfully created',
        },
        edit: {
          error: 'Failed to edit label',
          success: 'Label successfully edited',
        },
        delete: {
          error: 'Failed to delete label',
          success: 'Label successfully deleted',
        },
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task successfully created',
        },
        edit: {
          error: 'Failed to edit task',
          success: 'Task successfully edited',
        },
        delete: {
          error: 'Only the author can delete the task',
          success: 'Task successfully deleted',
        },
      },
      authError: 'Access denied! Please log in.',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        statuses: 'Statuses',
        tasks: 'Tasks',
        labels: 'Labels',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Sign In',
          submit: 'Sign In',
          emailPlaceholder: 'Email',
          passwordPlaceholder: 'Password',
        },
      },
      forms: {
        email: 'Email',
        password: 'Password',
        lastName: 'Last Name',
        firstName: 'First Name',
        name: 'Name',
        description: 'Description',
        statusId: 'Status',
        executorId: 'Executor',
        label: 'Labels',
        executor: 'Executor',
        status: 'Status',
      },
      users: {
        id: 'ID',
        fullName: 'Full Name',
        email: 'Email',
        createdAt: 'Creation Date',
        actions: 'Actions',
        title: 'Users',
        act: {
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          edit: 'Edit User',
        },
        new: {
          submit: 'Save',
          signUp: 'Sign Up',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Creation Date',
        actions: 'Actions',
        title: 'Statuses',
        createStatusButton: 'Create Status',
        act: {
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          title: 'Edit Status',
          submit: 'Edit',
          error: 'Failed to edit status',
        },
        new: {
          title: 'Create Status',
          submit: 'Create',
          create: 'Create',
        },
      },
      labels: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Creation Date',
        actions: 'Actions',
        title: 'Labels',
        createLabelButton: 'Create Label',
        act: {
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          title: 'Edit Label',
          submit: 'Edit',
          error: 'Failed to edit label',
        },
        new: {
          title: 'Create Label',
          submit: 'Create',
          create: 'Create',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Creation Date',
        actions: 'Actions',
        title: 'Tasks',
        createTaskButton: 'Create Task',
        status: 'Status',
        creator: 'Author',
        executor: 'Executor',
        act: {
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          title: 'Edit Task',
          submit: 'Edit',
          error: 'Failed to edit task',
        },
        new: {
          title: 'Create Task',
          submit: 'Create',
          create: 'Create',
        },
        view: {
          creator: 'Author',
          executor: 'Executor',
          createdAt: 'Creation Date',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Practical programming courses',
          more: 'Learn More',
        },
      },
    },
  },
};
