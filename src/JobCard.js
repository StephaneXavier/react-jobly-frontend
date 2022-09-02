import React, { useContext } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import UserInfoContext from './UserInfoContext';
import { JoblyApi } from './api';


const JobCard = ({ job,handleApplication }) => {
    const { title, salary, equity, id } = job
    const { token, username, applications } = useContext(UserInfoContext)

    function handleClick(e) {
        e.preventDefault();
        async function apply() {
            const application = await JoblyApi.applyToJob(username, id, token)
            applications.push(application)
            handleApplication(application)

        }
        apply()
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardText>
                    Salaray: {salary} <br />
                    Equity: {equity ? equity : null}
                </CardText>
                {applications.includes(id)? <Button color='success' size='sm'>Applied</Button>: <Button color='primary' size='sm' onClick={handleClick}>Apply</Button>}
                
            </CardBody>
        </Card>
    )
}

export default JobCard
