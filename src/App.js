import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddEmployee from "./components/AddEmployee";
import EmployeesList from "./components/EmployeesList";
import NotFound from "./components/NotFound";
function App() {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={EmployeesList} />
          <Route path="/add" component={AddEmployee} />
          <Route path="/employees/edit/:id" component={AddEmployee} />
          <Route  path="*" component={NotFound} />
        </Switch> 
      </div>
    </Router>
  )
}

export default App;