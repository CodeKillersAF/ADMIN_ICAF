import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin";
import Attendees from "./pages/Attendees/functionsOfAttendees";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <section>
          <Switch>
            <Route exact path="/" component={AdminLoginPage} />
           
           <Layout>
              <Route path ="/home" component={AdminHome}/>
              <Route path ="/attendees" component={Attendees} />
           </Layout>
           
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}
