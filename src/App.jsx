import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin";
import Registeruser from './pages/RegisterUser/registeruser';
import AdminView from './pages/AdminView/adminview';
import RoleChange from './components/AdminViewUser/AdminEditRole/admineditrole';
import DataChange from './components/AdminViewUser/AdminEditData/admineditdata';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <section>
          <Switch>
            <Route exact path="/" component={AdminLoginPage} />
           <Layout>
              <Route path ="/home" component={AdminHome}/>
              <Route path ="/register-page" component={Registeruser} />
              <Route path ="/view-user" component={AdminView} />
              <Route path="/roleChange/:id" component={RoleChange} />
              <Route path="/updateData/:id" component={DataChange} />
           </Layout>

            {/* new path for test register */}

          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}
