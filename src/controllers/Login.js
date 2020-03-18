
import LoginView from '../views/login';
import eventBus from '../modules/eventBus';

export default function createLoginPage() {
  console.log('показываем страницу LogIn');

  const root = document.getElementById('root');
  const loginView = new LoginView(root, eventBus);
  loginView.render();
}
