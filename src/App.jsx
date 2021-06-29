import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin";
import ListConferenceDetail from './pages/Editor/ListDetail';
import AddConferenceDetail from './pages/Editor/AddDetail'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <section>
          <Switch>
            <Route exact path="/" component={AdminLoginPage} />
           <Layout>
              <Route path ="/home" component={AdminHome}/>
              <Route path ="/editor" component={ListConferenceDetail}/>
              <Route path ="/editor-add" component={AddConferenceDetail}/>
           </Layout>
            
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}
