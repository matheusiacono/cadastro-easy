import './main.scss';
import './favicon.ico';
import { App, VirtualNode, createVNode } from './app/lib';
import { Route, location } from './app/lib/components/router';

import UserList from './app/containers/user-list';
import UserCreate from './app/containers/user-create';
import UserEdit from './app/containers/user-edit';

import Db from './app/utils/db';
import getUsers from './app/utils/get-users';
import actions from './app/actions';
import state from './app/state';

const db = new Db('Aplicacao', 1, 'Cadastros');

class Main extends VirtualNode {
  static render() {
    return (
      <div>
        <Route path="/" render={UserList} />
        <Route path="/create" render={UserCreate} />
        <Route path="/edit/:id" render={UserEdit} />
      </div>
    );
  }
}

VirtualNode.setState(state);
VirtualNode.setActions({ ...location, ...actions(db, getUsers) });

const { loadUsers, subscribeRouter } = VirtualNode.getActions();
subscribeRouter();
loadUsers();

const app = new App(Main, document.getElementById('app'));
app.run();
