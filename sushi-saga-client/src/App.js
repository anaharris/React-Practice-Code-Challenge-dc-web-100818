import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor() {
    super()
    this.state = {
      allSushi: [],
      budget: 100,
      tableSushiId: 4,
      eatenSushi: [],
      currentSushi: []
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer currentSushi={this.state.currentSushi} tableSushiId={this.state.tableSushiId} moreSushi={this.moreSushi} buySushi={this.buySushi} eatenSushi={this.state.eatenSushi} addMoney={this.addMoney}/>
        <Table budget={this.state.budget} eatenSushi={this.state.eatenSushi}/>
      </div>
    );
  }

  componentDidMount() {
    fetch(`${API}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          allSushi: data,
          currentSushi: data.slice(0, 4)
        })
      })
  }

  buySushi = (sushi) => {
    if (this.state.budget >= sushi.price) {
      let newBudget = this.state.budget - sushi.price
      let eaten = [sushi]
      this.state.eatenSushi.forEach(obj => eaten.push(obj))
      this.setState({ budget: newBudget, eatenSushi: eaten })
    }
  }


  moreSushi = () => {
    let sushiId = 0
    if (this.state.tableSushiId <= 96) {
      sushiId = this.state.tableSushiId + 4
    } else {
      sushiId = 4
    }
    let sushiArr = this.state.allSushi.slice(sushiId - 4, sushiId)
    this.setState({
      tableSushiId: sushiId,
      currentSushi: sushiArr
    })
  }

  addMoney = () => {
    let newBudget = this.state.budget + 50
    this.setState({ budget: newBudget })
  }

}

export default App;
