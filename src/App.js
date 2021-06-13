import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Forms from './component/Forms';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locData: '',
      errorMsg: '',
      displayErrMsg: false,
      displayMap: false
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

  }


  getMap = async () => {

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=pk.7997b5fb49bb59f5e576e07f957b02bf&center=${this.state.locData.lat},${this.state.locData.lon}&zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`
    let mapResult = await axios.get(mapURL)
    this.setState({
      displayMap: true,
    })


  }



  render() {
    return (
      <div>
        <Header />
        <Forms getInfo={this.getInfo} />
        <p>{this.state.locData.display_name}</p>
        <p>{this.state.locData.lon}</p>
        <p>{this.state.locData.lat}</p>
        {this.state.displayErrMsg && this.state.errorMsg}
        {this.state.displayMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.7997b5fb49bb59f5e576e07f957b02bf&center=${this.state.locData.lat},${this.state.locData.lon}&zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`} alt='map' />}

      </div>

    )



  }








}
export default App