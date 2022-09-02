import React, {useContext} from 'react';
import userInfoContext from './UserInfoContext';


const Home = () => {
const userInfo = useContext(userInfoContext)


    return (
        <>
            {userInfo.token ?
                <h1>Home page, you are logged in!</h1>
                :
                <h1>Home page not logged in</h1>
                
        }
        </>
    )
}

export default Home