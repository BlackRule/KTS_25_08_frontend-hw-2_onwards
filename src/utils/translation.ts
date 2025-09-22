export type Language = 'en' | 'ru'

export const translation={
  en: {
    'Invalid identifier or password':'Invalid login credentials',
    TodoList:'Todo list',
    add_image:'Add image',
    add_task:'Add task',
    add_todo:'add todo',
    'auth/email-already-in-use':'Email already in use',
    delete:'delete',
    email:'Email',
    login_label:'Login',
    forgot_password:'Forgot password?',
    haveAcc:'Already have an account?',
    language: 'language',
    login: 'sign in',
    logout:'logout',
    noAcc:'No account yet?',
    password:'Password',
    password_reset_email_sent:'Password reset email sent!',
    send_password_reset_email:'send password reset email',
    signUp:'sign up',
    todo_text:'Todo text'
  },
  ru: {
    TodoList:'Список дел',
    add_image:'Добавить изображение',
    add_task:'Добавить задачу',
    add_todo:'добавить задачу',
    'auth/email-already-in-use':'Этот адрес электронной почты уже занят',
    'auth/invalid-login-credentials':'Неверные логин или пароль',
    delete:'удалить',
    email:'Эл. почта',
    login_label:'Логин',
    forgot_password:'Забыли пароль?',
    haveAcc:'Уже есть аккаунт?',
    language: 'язык',
    login: 'войти',
    logout:'выйти',
    noAcc:'Пока нет аккаунта?',
    password:'Пароль',
    password_reset_email_sent:'Письмо для сброса пароля отправлено!',
    send_password_reset_email:'отправить электронное письмо для сброса пароля',
    signUp:'Зарегистрироваться',
    todo_text:'Текст задачи'
  }

} as Record<Language, Record<string, string>>