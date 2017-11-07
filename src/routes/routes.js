import {
  Login,
  NoMatch,
  Chat,
  Contact,
} from '../containers/pages';
import App from '../containers/App';

const routes = [
  {
    component: App,
    requireLogin: '/login',
    home: '/',
    routes: [
      {
        path: '/',
        exact: true,
        component: Contact
      },
      {
        path: '/login',
        exact: true,
        component: Login
      },
      {
        path: '/contacts',
        exact: true,
        component: Contact
      },
      {
        path: '/conversation/:id',
        exact: true,
        component: Chat
      },
      {
        component: NoMatch
      }
    ]
  }
];

export default routes;
