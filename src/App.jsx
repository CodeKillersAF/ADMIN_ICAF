import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddConferenceInfo from "./components/ConferenceInfo/AddConferenceInfo";
import Layout from "./components/Layout/Layout";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin";
import EditorMain from './pages/Editor/Edior';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <section>
          <Switch>
            <Route exact path="/" component={AdminLoginPage} />
           <Layout>
              <Route path ="/home" component={AdminHome}/>
              <Route path ="/editor" component={EditorMain}/>
              <Route path ="/editor-add" component={AddConferenceInfo}/>
           </Layout>
            
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}
