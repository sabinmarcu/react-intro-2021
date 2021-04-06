import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { BackButton } from './components/BackButton';
import { Button } from './components/Button';
import { Container } from './components/Layout';
import { NavBar } from './components/NavBar';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { ThemeProvider } from './contexts/theme';

import { HomePage } from './pages/Home';
import { MoviePage } from './pages/Movie';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar>
            <Container direction="horizontal" split>
              <div>
                <Button exact to="/">Home</Button>
                <BackButton>Back</BackButton>
              </div>
              <ThemeToggleButton />
            </Container>
          </NavBar>
          <Container direction="vertical">
            <Switch>
              <Route exact path="/movie/:id" component={MoviePage} />
              <Route path="/movie">
                <Redirect to="/" />
              </Route>
              <Route exact path="/" component={HomePage} />
              <Route path="/">
                <h1>404</h1>
              </Route>
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
