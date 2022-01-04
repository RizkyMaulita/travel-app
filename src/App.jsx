import './App.css';
import { HomePage, LoginPage, RegisterPage, ProfilePage } from './pages'
import Navbar from './components/Navbar.jsx';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={'/'} exact render={props => <HomePage {...props}/>} />
        <Route path={'/login'} exact render={props => <LoginPage {...props}/>} />
        <Route path={'/register'} exact render={props => <RegisterPage {...props}/>} />
        <Route path={'/profile'} exact render={props => <ProfilePage {...props}/>} />
      </Switch>
    </div>
  );
}

export default App;
