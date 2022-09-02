import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'
import Routes from './Routes';
import UserInfoContext from './UserInfoContext';
import { JoblyApi } from './api'
import useLocalStorage from './useLocalStorage';




function App() {
    const [userInfo, setUserInfo, clearUserInfo] = useLocalStorage();


    function registerUser(newUserRegistrationInfo) {
        async function registerNewUser() {
            try {
                const token = await JoblyApi.register(newUserRegistrationInfo);
                setUserInfo(newUserRegistrationInfo.username, token)
            } catch (err) {
                alert(err)
            }
        }
        registerNewUser();
    }

    function loginUser(userLoginInfo) {
        async function getToken() {
            const token = await JoblyApi.login(userLoginInfo);
            setUserInfo(userLoginInfo.username, token)
            console.log(userInfo)
        }

        getToken()
    }

    function logout() {
        clearUserInfo();
    }

    function updateUserInfo(newUserInfo) {

        async function updateUserWithNewInfo() {
            await JoblyApi.updateUser(newUserInfo, userInfo.username, userInfo.token);
            setUserInfo(userInfo.username, userInfo.token)
        }
        updateUserWithNewInfo()

    }

    return (
        <div className="App">
            <BrowserRouter>
                <UserInfoContext.Provider value={userInfo}>
                    <NavBar />
                    <Routes updateUserInfo={updateUserInfo} registerUser={registerUser} loginUser={loginUser} logout={logout} />
                </UserInfoContext.Provider>
            </BrowserRouter>

        </div>
    );
}

export default App;
