import React, {useState, useEffect, useContext } from 'react';
import CompaniesSearchForm from './CompaniesSearchForm';
import { JoblyApi } from './api';
import CompanyCard from './CompanyCard';
import UserInfoContext from './UserInfoContext';
import { Redirect } from 'react-router-dom';



const Companies = () => {
    
    const [companies, setCompanies] = useState([]);
    const [filter, setFilter] = useState('')
    const {token} = useContext(UserInfoContext)
    

    if(!token) return <Redirect to='/login' />

 
    function addFilter(filter){
        setFilter(filter)
    }



    useEffect(() => {
       async function getFilteredCompanies(){
       const filteredCompanies = await JoblyApi.getFilteredCompanies(filter, token)
        setCompanies(filteredCompanies)
       } 
       getFilteredCompanies()
    }, [filter])



    useEffect(() => {

        async function getCompanies() {
            const companiesInfo = await JoblyApi.getCompanies(token);
            setCompanies(companiesInfo)
        }
        getCompanies()
    }, [])



    return (
        <div className='Companies'>
            <CompaniesSearchForm addFilter={addFilter} />
            <div className='Companies-CompanyCard-list'>
                {companies.map((company,idx) => <CompanyCard company={company} key={idx} />)}
            </div>


        </div>
    )
}

export default Companies