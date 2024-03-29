import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavSeachbar from '../layout/NavSearchbar/NavSeachbar';
import TodoListsPage from '../../pages/TodoListsPage';
import TodoEditPage from '../../pages/TodoEditPage';
import NotFound from '../../pages/NotFound';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import { Provider } from 'react-redux';
import store from '../../store';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Fragment>
            <NavSeachbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={TodoListsPage} />
                <Route exact path='/todo/:id?' component={TodoEditPage} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
