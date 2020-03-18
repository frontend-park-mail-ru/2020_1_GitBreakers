// import paths from '../modules/paths';


// export function createMainPage() {
//   console.log('показываем страницу Main');

//   this.root = document.getElementById('root');
//   this.root.innerHTML = '';
//   const msg = document.createElement('div');
//   msg.textContent = 'главная страница';
//   this.root.appendChild(msg);


//   const but = document.createElement('button');
//   but.type = 'submit';
//   but.dataset.section = paths.signup;
//   but.textContent = 'Кнопка signup, которая почему-то посреди страницы';
//   this.root.appendChild(but);

//   const newLine1 = document.createElement('div');
//   const normalLink = document.createElement('a');
//   normalLink.display = 'block';
//   normalLink.dataset.section = paths.login;
//   normalLink.textContent = 'Ссылка login';
//   this.root.appendChild(newLine1);
//   this.root.appendChild(normalLink);

//   const newLine2 = document.createElement('div');
//   const link = document.createElement('a');
//   link.dataset.section = paths.repository;
//   link.dataset.rep = 'my_super_repository_name';
//   link.textContent = 'Ссылка на чей-то репозиторий';
//   this.root.appendChild(newLine2);
//   this.root.appendChild(link);
// }
