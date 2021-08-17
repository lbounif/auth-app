import React, { useState} from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from '../components/Header'
import FirstStep from '../components/FirstStep'
import SecondStep from '../components/SecondStep'
import ThirdStep from '../components/ThirdStep'
import Login from '../components/Login'

const AppRouter = () => {
    const [user, setUser] = useState({})

    const updatedUser = (data) => {
        setUser((prevUser) => ({ ...prevUser, ...data}))
    }

    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Switch>
                    <Route 
                        path="/"
                        exact
                        render={(props)=> {
                            <FirstStep 
                                {...props} 
                                user={user} 
                                updatedUser={updatedUser} />
                        }}/>
                    <Route 
                        path="/second"
                        exact
                        render={(props)=> {
                            <SecondStep 
                                {...props}
                                user={user} 
                                updatedUser={updatedUser} />
                        }}/>
                    <Route 
                        path="/third"
                        exact
                        render={(props)=> {
                            <ThirdStep 
                                {...props}
                                user={user} 
                                updatedUser={updatedUser} />
                        }}/>
                    <Route path="/login" component={Login}/>
                    <Route render={()=> <Redirect to="/" />}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default AppRouter

