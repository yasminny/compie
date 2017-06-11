import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';
import './assets/styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import myLocation from './components/myLocation/myLocation';
import Results from './components/results/results';
// import Root from './components/root/root';

render(
  <BrowserRouter>
    <main>
    <Switch>
      <Route exact path="/" component={() => {
        return <Redirect to="/myLocation"/>
      }}/>
      <Route path="/myLocation" component={ myLocation }/>
      <Route exact path="/results" component={ () => {
        return <Redirect to="/myLocation"/>
      }}/>
      <Route path="/results/:myLocation" component={ Results }/>
    </Switch>
    </main>
  </BrowserRouter>,
  document.querySelector('#app')
);

// // Enables hot-reload without page refresh. Removed during `build`
// if (module.hot) {
//   module.hot.accept();
// }
