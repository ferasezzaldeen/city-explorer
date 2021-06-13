import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



class Forms extends React.Component {



    render() {
        return (
            <div>
                <Form onSubmit={this.props.getInfo}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control className='field' type='text' placeholder='city name' name='searchQuery' />
                   
                        <Button type='submit' variant="primary" size="lg">
                            Explore !!
                        </Button>{' '}
                    </Form.Group>
                </Form>
            </div>
        )
    }


}

export default Forms