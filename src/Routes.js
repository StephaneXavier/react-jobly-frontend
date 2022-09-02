import React from 'react';
import Home from './Home';
import Companies from './Companies';
import Login from './Login';
import Register from './Register';
import Profile from './Profile'
import Jobs from './Jobs';
import CompanyDetails from './CompanyDetails';
import { Route, Switch } from 'react-router-dom';
import Logout from './Logout';

const Routes = ({ loggedIn, registerUser, loginUser,logout, updateUserInfo }) => {

    return (
        <div>
            <Switch>
                <Route exact path='/companies'> <Companies /></Route>
                <Route exact path='/companies/:name'> <CompanyDetails /></Route>
                <Route exact path='/jobs'> <Jobs /></Route>
                <Route exact path='/login'> <Login loginUser={loginUser} /></Route>
                <Route exact path='/logout'> <Logout logout={logout} /></Route>
                <Route exact path='/profile'> <Profile updateUserInfo={updateUserInfo}/></Route>
                <Route exact path='/register'> <Register registerUser={registerUser} /></Route>
                <Route exact path='/'><Home loggedIn={loggedIn} /></Route>
            </Switch>
        </div>


    )
}

export default Routes