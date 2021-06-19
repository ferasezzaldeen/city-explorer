import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import Weather from './component/Weather';
import Forms from './component/Forms';
import Movies from './component/Movies';
import Card from 'react-bootstrap/Card'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locData: '',
      errorMsg: '',
      displayErrMsg: false,
      displayMap: false,
      city:'',
      weatherData: [],
      movieData:[],
    }



  }



  getInfo = async (event) => {
    event.preventDefault();
    let cityName = event.target.searchQuery.value
    let url = `https://us1.locationiq.com/v1/search.php?key=pk.7997b5fb49bb59f5e576e07f957b02bf&q=${cityName}&format=json`
    try {
      let result = await axios.get(url)
      console.log(result.data);
      this.setState({
        locData: result.data[0],
        displayErrMsg: false,
        city: cityName,
      })
      this.getMap();
    }
    catch {
      this.setState({
        errorMsg: 'there is an error',
        displayErrMsg: true,
        displayMap: false,
        locData: '',
      
      })
    }
    this.getWeather();
    this.getMovie();
  }


  getMap = async () => {

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=pk.7997b5fb49bb59f5e576e07f957b02bf&center=${this.state.locData.lat},${this.state.locData.lon}&zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`
    let mapResult = await axios.get(mapURL)
    this.setState({
      displayMap: true,
    })


  }



  getWeather= async()=>{

    let wethURL= process.env.REACT_APP_SERVER;
    let url=`${wethURL}/weather?lat=${this.state.locData.lat}&lon=${this.state.locData.lon}&searchQuery=${this.state.city}`;
    // let url=`http://localhost:1996/weather?lat=${this.state.locData.lat}&lon=${this.state.locData.lon}&searchQuery=${this.state.city}`;

    let weather=await axios.get(url);
    console.log(weather);
    this.setState({

      weatherData: weather.data[0],
    })
   console.log(this.state.weatherData)
  }

  getMovie= async()=>{
    let movURL=process.env.REACT_APP_SERVER;
    let url=`${movURL}/movies?searchQuery=${this.state.city}`
    // let url=`http://localhost:1996/movies?searchQuery=${this.state.city}`

    let movies=await axios.get(url);
    console.log(movies);
    this.setState({
      movieData: movies.data,

    })
    console.log(this.state.movieData)
  }





  render() {
    return (
      <div>
        <Header />
        <Forms getInfo={this.getInfo} />

        <Card className='card' style={{ width: '50em' }}>

          <Card.Body>
            <Card.Title className='title'>Result</Card.Title>
            <Card.Text>
              <Card.Body className='name' ><p>{this.state.locData.display_name}</p></Card.Body>
              <Card.Body  className='lon'><p>{this.state.locData.lon}</p></Card.Body>
              <Card.Body  className='lat'><p>{this.state.locData.lat}</p></Card.Body>
              <Card.Body className='error'> {this.state.displayErrMsg && this.state.errorMsg}</Card.Body>


             
              {this.state.displayMap && <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.7997b5fb49bb59f5e576e07f957b02bf&center=${this.state.locData.lat},${this.state.locData.lon}&zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`} />}
            </Card.Text>

          </Card.Body>
        </Card>
        <Weather weatherData={this.state.weatherData} displayMap={this.state.displayMap} />
        {
          this.state.movieData.map((idx)=>{
            return(
              < Movies movieData={idx}  />
          )
          })
        }
        

     
      </div>

    )



  }








}
export default App