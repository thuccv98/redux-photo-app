import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from 'react-router-dom';
import './App.scss';
import NotFound from './components/NotFound';

// Lazy load - code splitting
const Photo = React.lazy(() => import('./features/Photo'));

function App() {
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          {/* Todo: Remove after testing */}
          <ul>
            <li>
              <Link to="/photos">Go to photo app</Link>
            </li>
            <li>
              <Link to="/photos/add">Go to add new Photo</Link>
            </li>
            <li>
              <Link to="/photos/edit">Go to Edit photo</Link>
            </li>
          </ul>

          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
