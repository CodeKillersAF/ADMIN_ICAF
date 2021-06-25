import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage'
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage'


export default function App() {
    return (
        <div>
            <BrowserRouter>
            <section>
                <Switch>
                    <Route exact path  = "/" component={AdminLoginPage}/>
                    <Route path="/dashboard" component={AdminDashboardPage}/>
                </Switch>
            </section>
            </BrowserRouter>
        </div>
    )
}
