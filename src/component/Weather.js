
import React from 'react';
import Card from 'react-bootstrap/Card'


class Weather extends React.Component {

    render() {
        return (
            <div className='weather'>
                <Card className='card' style={{ width: '50em' }}>

                    <Card.Body>
                       
                        <Card.Text>
                            <Card.Body className='name' ><p>{this.props.weatherData.description}</p></Card.Body>
                            <Card.Body className='lon'><p>{this.props.weatherData.date}</p></Card.Body>
                          

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>
        )
    }

}
export default Weather