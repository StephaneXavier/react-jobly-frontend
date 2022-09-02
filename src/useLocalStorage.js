import { useState } from 'react';
import { JoblyApi } from './api'

/*
function currently works. But re-factor the else clause, as it works the way it is now but appears clunky
*/

const useLocalStorage = () => {
    const initialState = JSON.parse(window.localStorage.getItem('userInfo')) || { username: '', token: '', firstName: '', lastName: '', email: '', isAdmin: '', applications: [] };

    const [userInfo, setUserInfo] = useState(initialState);

    async function getUserDetails(username, token) {
        const userDetails = await JoblyApi.getUser(username, token);

        const completeUserInfo = {
            username: username,
            token: token,
            isAmin: userDetails.isAmin,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            applications: userDetails.applications
        }
        window.localStorage.setItem('userInfo', JSON.stringify(completeUserInfo))
        setUserInfo(completeUserInfo)
    }


    function clearUserInfo() {
        window.localStorage.clear();
        setUserInfo({})
    }



    return [userInfo, getUserDetails, clearUserInfo]

}

export default useLocalStorage;



























// function getAndSetUserInfo(providedInfo) {
    //     console.log('getAndSetUserInfo')
    //     if (providedInfo) {
    //         setUserInfo(providedInfo);
    //         window.localStorage.setItem('userInfo', JSON.stringify(providedInfo))
    //     } else {

    //         const fetchedUserInfo = JSON.parse(window.localStorage.getItem('userInfo')) || { username: '', token: '', firstName: '', lastName: '', email: '', isAdmin: '' }
    //         setUserInfo(fetchedUserInfo)
    //     }

    // }