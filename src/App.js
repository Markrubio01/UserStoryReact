import Login from './components/Login'
import SignUp from './components/SignUp'
import UserContactInfo from './components/UserContactInfo'
import { BrowserRouter, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <NavLink
            className="App-link"
            to="/"
            exact
            activeClassName="Link-active-style"
          />
          <Route
            path="/UserContactInfo/:id"
            exact
            render={({ match }) => {
              return <UserContactInfo Id={match.params.id}></UserContactInfo>
            }}
          />
          <Route
            path="/SignUp"
            exact
            component={SignUp}
          />
        <Route path="/" exact component={Login} />
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
