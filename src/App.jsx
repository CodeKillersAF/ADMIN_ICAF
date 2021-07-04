import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddKeynote from "./pages/AddKeynote/AddKeynote";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin";
import ListConferenceDetail from './pages/Editor/ListDetail';
import AddConferenceDetail from './pages/Editor/AddDetail'
import EditConferenceInfo from "./components/ConferenceInfo/EditConferenceInfo";
import ApproveDetail from "./pages/Editor/ApproveDetail";
import Registeruser from './pages/RegisterUser/registeruser';
import AdminView from './pages/AdminView/adminview';
import RoleChange from './components/AdminViewUser/AdminEditRole/admineditrole';
import DataChange from './components/AdminViewUser/AdminEditData/admineditdata';
import ApprovedKeynote from "./pages/ApprovedKeynote/Approvedkeynote";
import PendingKeynote from "./pages/PendingKeynote/PendingKeynote";
import UpdateKeynote from "./pages/UpdateKeynote/UpdateKeynote";
import Attendees from "./pages/Attendees/functionsOfAttendees";
import AddTemplatepage from './pages/TemplatePage/AddTemplatePage/addTemplatepage';
import ViewTemplatePage from './pages/TemplatePage/ViewTemplatePage/viewTemplatepage';
import UpdateTemplatePage from './pages/TemplatePage/EditTemplatePage/editTemplatepage';
import WorkshopConductor from "./pages/WorkShopConductors/functionalitiesOfWorkShopConductors";
import ResearchPaper from "./pages/ResearchPaperPublish/functionalitiesOFRPublishers";


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
              <Route path ="/approved-keynote" component={ApprovedKeynote}/>
              <Route path ="/add-keynote" component={AddKeynote}/>
              <Route path ="/pending-keynote" component={PendingKeynote}/>
              <Route path ="/update-keynote/:id" component={UpdateKeynote}/>
              <Route path ="/attendees" component={Attendees} />
              <Route path="/editor/:id" component={EditConferenceInfo} />
              <Route exact path="/editor" component={ListConferenceDetail} />
              <Route path="/editor-add" component={AddConferenceDetail} />
              <Route path="/editor-admin" component={ApproveDetail} />
              <Route path="/add-template" component={AddTemplatepage} />
              <Route path="/view-template" component={ViewTemplatePage} />
              <Route path="/update-template/:id" component={UpdateTemplatePage} />
              <Route path ="/workshop-conductors" component={WorkshopConductor} />
              <Route path ="/research-paper" component={ResearchPaper} />
           </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}
