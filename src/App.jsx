import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddKeynote from "./pages/AddKeynote/AddKeynote";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin";
import ApprovedKeynote from "./pages/ApprovedKeynote/Approvedkeynote";
import PendingKeynote from "./pages/PendingKeynote/PendingKeynote";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <section>
          <Switch>
            <Route exact path="/" component={AdminLoginPage} />
           <Layout>
              <Route path ="/home" component={AdminHome}/>
              <Route path ="/approved-keynote" component={ApprovedKeynote}/>
              <Route path ="/add-keynote" component={AddKeynote}/>
              <Route path ="/pending-keynote" component={PendingKeynote}/>
           </Layout>
            
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}
