import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

const CompanyCard = ({ company }) => {
    const history = useHistory();
    const { name, description, handle } = company;


    return (
        <Card onClick={() => history.push(`/companies/${handle}`)} >
            <CardBody>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardText>
                    {description}
                </CardText>
            </CardBody>
        </Card>
    )
}


export default CompanyCard