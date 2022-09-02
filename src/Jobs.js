import React, {useState, useEffect, useContext} from 'react';
import { JoblyApi } from './api';
import JobCard from './JobCard';
import JobsSearchForm from './JobsSearchForm';
import UserInfoContext from './UserInfoContext';
import { Redirect } from 'react-router-dom';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('');
    const userInfo = useContext(UserInfoContext);
    const [applications, setApplications] = useState([])
    

    if(!userInfo.token) return <Redirect to='/login'/>

    
    function addFilter(filter){
        setFilter(filter)
    }

    function handleApplication(jobId){
        
        setApplications([...applications, jobId])
        const localStorageUserInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        localStorageUserInfo.applications.push(jobId)
        localStorage.setItem('userInfo',JSON.stringify(localStorageUserInfo))
           }
    
    useEffect(() => {
        console.log('Jobs -> useEffect getFilteredJobs')
        async function getFilteredJobs(){
         const filteredJobs = await JoblyApi.getFilteredJobs(filter)
         setJobs(filteredJobs)
        } 
        getFilteredJobs()
     }, [filter])



    useEffect(() => {
        console.log('in Jobs.js -> useEffect for getjobs()')
        async function getJobs() {
            const jobsInfo = await JoblyApi.getJobs();
            setJobs(jobsInfo)
        }
        getJobs()
        
    }, [])



  

    return(
        <div className='Jobs'>
            <JobsSearchForm addFilter={addFilter}/>
          {jobs.map((j,idx) => <JobCard key={idx} job={j} handleApplication={handleApplication} />)}
        </div>
    )
   
}

export default Jobs