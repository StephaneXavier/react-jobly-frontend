import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


const JobsSearchForm = ({ addFilter }) => {
    const [searchVal, setSearchVal] = useState('');
    

    function handleChange(e) {
        setSearchVal(e.target.value)
    }



    function handleSubmit(e) {
        e.preventDefault();
        addFilter(searchVal)

    }

    return (
        <Form onSubmit={handleSubmit} >
            <FormGroup >
                <Label for="search"></Label>
                <Input
                    
                    value={searchVal}
                    onChange={handleChange}
                    id="search"
                    name="search"
                    placeholder="enter job name here"
                    type="text"
                />
                <Button>
                    Submit
                </Button>
            </FormGroup>

        </Form>
    )
}

export default JobsSearchForm