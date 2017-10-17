import {
  Login,
  NoMatch,
  Vehicle,
  Chat,
  Contact,
} from '../containers/pages';
import App from '../containers/App';

const routes = [
  {
    component: App,
    // requireLogin: '/login',
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
        path: '/vehicles',
        exact: true,
        component: Vehicle
      },
      {
        path: '/contacts',
        exact: true,
        component: Contact
      },
      {
        path: '/chat/:id',
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
