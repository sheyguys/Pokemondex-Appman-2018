import React, { Component } from 'react'
import icon from './search.png'
import cute from './cute.png'
import Axios from 'axios'
import Service from './service.js'

import './App.css'


const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      displaystatus: 'none',
      dexphoto: [],
      mydex: [],
    }
  }

  saveTomydex = (id) => {
    console.log("aaa")
    console.log(id)
  }

  search = (keyword) => {
    console.log(keyword)
    var dexArray = []
    var url = "http://localhost:3030/api/cards?limit=20&name=" + keyword
    Axios.get(url).then(result => {
      console.log(JSON.stringify(result.data.cards))
      result.data.cards.forEach(dex => {
        dexArray.push(dex)
      })
      this.setState({ dexphoto: dexArray })
    })
  }


  toggle = () => {
    this.setState({ displaystatus: 'grid' })
    Service.getpokedex().then((res) => {
      this.setState({ dexphoto: res.cards });
    })
  }

  closedisplay = (el) => {
    // this.setState({ displaystatus: 'none' })
    // el !== this.refs.xx
    console.log(el)
  }

  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <div class="header">
              <div>
                <center>
                  <h1 class="header">My Pokedex</h1>
                </center>
              </div>
              <div class="my-dex">

              </div>
            </div>
            <div>
              <div class="footer">
                <div class="circlecontainer" onClick={this.toggle}>
                  <div class="circle">+</div>
                </div>
              </div>
            </div>
            <div class="boxOverray" style={{ display: this.state.displaystatus }}>
              <div class="boxModal" style={{ display: this.state.displaystatus }} >
                <div class="headermodal">
                  <div class="box-input">
                    <input class="input" type="text" placeholder="Find Pokemon..." onChange={event => { this.search(event.target.value) }}></input>
                    <div class="box-search">
                      <img class="search-img" src={icon} onClick={this.ClickSearch}></img>
                    </div>
                  </div>
                </div>
                <br />
                <div class="boxDex">
                  {this.state.dexphoto.map((res) => (
                    <div class="empty">
                      <div class="container" key={res.id}>
                        <div class="box" id="box1">
                          <img src={res.imageUrl} alt="logo" />
                        </div>
                        <br />
                        <div class="box" id="box2">
                          <div class="pokemonname">
                            <h1>{res.name}</h1>
                          </div>
                          <div class="box-powerbar">
                            <div class="box-power">
                              <div class="power-line">
                                <div class="line">HP</div>
                                <div class="progress-bar">
                                  <div class="value-progress-bar" style={{ width: (res.hp >= 100) ? '100' : (res.hp === 'None') ? '0' : res.hp + '%' }}>{res.hp}</div>
                                </div>
                                <div class="line">STR</div>
                                <div class="progress-bar">
                                  <div class="value-progress-bar" ></div>
                                </div>
                                <div class="line">WEAK</div>
                                <div class="progress-bar">
                                  <div class="value-progress-bar" style={{ width: res.damage }}>{res.damage}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div class="box-Happiness">
                            <img class="cute-img" src={cute} alt="emotion" />
                            <img class="cute-img" src={cute} alt="emotion" />
                            <img class="cute-img" src={cute} alt="emotion" />
                          </div>
                        </div>
                        <div class="box" id="box3">
                          <h1>Add</h1>
                        </div>
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
