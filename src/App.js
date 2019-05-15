import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


class App extends Component {
  state = {
    products:null
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    let data = []
    axios.get('http://localhost:3001/jsonData').then(res => {
      Object.keys(res.data.data.products).forEach(key=>{
        data.push(res.data.data.products[key])
      })
      let sortedData = data.sort((a,b)=>{
        return b['popularity'] - a['popularity']
      })
      this.setState({products:sortedData})
    }).catch(err => {
      console.log(err)
    })
  }
  getStyle = (price) => {
    console.log(price)
    return {
      boxShadow: '0 4px 8px 4px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      width: '250px',
      height: '200px',
      margin: '20px',
      backgroundColor: price >= 0 && price <= 9999 ? '#99e699': price >= 10000 && price <=  19999 ? '#ede853': price >= 20000 && price <=  29999 ? '#ea696d' : '#68afea'
    }
  }
  render() {
    if (this.state.products) {
      return this.state.products.map(item => (
        <div className="container">
          <div style={this.getStyle(item.price)}>
          <div className="title"><b>{item.title}</b></div><br></br>
          <div className="price">{'Rs. '+ item.price}</div><br></br>
          <div className="popularity"><img src={require('./people.png')} width= '30px' height= '20px'></img>{item.popularity}</div>
          </div>
        </div>
      ))
    }
    else{
      return <img alt= "Loading..." style = {loader} src= {require ('./loader.gif')}/>
    }
  }
}

const loader = {
  display: 'block',
  width: '5%',
  height: '5%',
  marginTop: '50px',
  marginLeft: 'auto',
  marginRight: 'auto'
}
export default App;
