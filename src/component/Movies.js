
import React from 'react';
import Card from 'react-bootstrap/Card'


class Movies extends React.Component {

    render() {
        return (
            <div className='Movies'>
                <Card className='card' style={{ width: '50em' }}>

                    <Card.Body>
                       
                        <Card.Text>
                            <Card.Body className='lon' >  <p>Tottal: {this.props.movieData.title}</p></Card.Body>
                            <Card.Body className='lon'> <p>Overview: {this.props.movieData.overview}</p></Card.Body>
                            <Card.Body className='lon' > <p>Average votes: {this.props.movieData.average_votes}</p></Card.Body>
                            <Card.Body className='lon'> <p>Total votes: {this.props.movieData.total_votes}</p></Card.Body>
                            <Card.Body className='lon' > <p>Popularity: {this.props.movieData.popularity}</p></Card.Body>
                            <Card.Body className='lon'> <p>Released date: {this.props.movieData.release_date}</p></Card.Body>
                            <Card.Body className='lon'>  <img src={this.props.movieData.image_url} alt={'pic'} /> </Card.Body>

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>
        )
    }

}
export default Movies