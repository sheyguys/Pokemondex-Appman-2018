import React, { Component } from "react";
import icon from "./search.png";
import cute from "./cute.png";
import Axios from "axios";
import Service from "./service.js";
import Progress from "./Progress.js";
import Happiness from "./Happiness";
import "./App.css";

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
};

class App extends Component {
  constructor(props) {
    super(props);
    this.saveTomydex = this.saveTomydex.bind(this);
    this.state = {
      modal: false,
      displaystatus: "none",
      displayADdBut: "none",
      dexphoto: [],
      mydex: [],
      index: 0
    };
    Service.getpokedex().then(res => {
      res.cards.forEach(newRes => {
        this.state.dexphoto.push(this.checkHappiness(newRes));
      });
      this.setState({ dexphoto: this.state.dexphoto });
    });
  }
  // CAL PROGRESS BAR HP
  CalHP = hp => {
    let thisHp = 0;
    if (!hp || hp === "None") {
      thisHp = 0;
    } else if (hp >= 100) {
      thisHp = 100;
    } else {
      thisHp = hp;
    }
    return thisHp;
  };
  // CAL PROGRESS BAR STR
  CalSTR = attacks => {
    let thisStr = 0;
    if (attacks && attacks.length !== 0) {
      thisStr = attacks.length * 50;
    }
    return thisStr;
  };
  // CAL PROGRESS BAR WEAKNESSES
  CalWEAK = weaknesses => {
    let thisWeak = 0;
    if (weaknesses && weaknesses !== 0) {
      thisWeak = weaknesses * 100;
    }
    return thisWeak;
  };

  createHappiness = happiness => {
    let hap = [];
    for (let i = 0; i < happiness; i++) {
      hap.push(<img class="cute-img" src={cute} alt="emotion" />);
    }
    return hap;
  };
  checkHappiness = res => {
    console.log("Res = " + res);
    console.log("In Check");
    // this.state.mydex.forEach((res, key) => {
    let thisHp = 0;
    let thisAttack = 0;
    let thisWeakness = 0;
    let thisHappiness;
    //check hp
    if (!res.hp || res.hp === "None") {
      thisHp = 0;
    } else if (res.hp >= 100) {
      thisHp = 100;
    } else {
      thisHp = res.hp;
    }

    //check attack
    if (!res.attacks) {
      console.log("isn't Attack");
      thisAttack = 0;
    } else {
      console.log("is Attack");
      res.attacks.forEach(att => {
        console.log("in loop  Attack");
        if (att.damage !== "") {
          if (Number.isInteger(att.damage[att.damage.length - 1])) {
            console.log("ข้างหลังเป็นเลข" + att.damage);
            thisAttack = thisAttack + parseInt(att.damage);
          } else {
            console.log("ข้างหลังไมใช่เลข" + att.damage);
            thisAttack =
              thisAttack + parseInt(att.damage.substring(0, att.damage.length));
          }
        }
      });
    }

    //check weaknessnes
    if (res.weaknessnes && res.weaknessnes.length !== 0) {
      thisWeakness = res.weaknessnes.length * 50;
    }

    //calculate
    // ((HP / 10) + (Damage /10 ) + 10 - (Weakness)) / 5
    thisHappiness = Math.ceil(
      Math.abs((thisHp / 10 + thisAttack / 10 + 10 - thisWeakness) / 5)
    );
    // Object.assign(this.state.dexphoto[key], {"happiness": thisHappiness})
    // this.setState({dexphoto: this.state.dexphoto})
    console.log("This Hp " + thisHp);
    console.log("This Attack " + thisAttack);
    console.log("This Weakness " + thisWeakness);
    // console.log("New tag happiness: " + this.state.dexphoto[key].happiness)
    // });
    console.log(Object.assign(res, { happiness: thisHappiness }));
    console.log(Object.assign(res, { index: this.state.index }));
    this.setState({ index: ++this.state.index });
    return res;
  };

  saveTomydex = pokemon => () => {
    // console.log(pokemon);
    this.setState({ mydex: [...this.state.mydex, pokemon] });
    this.state.dexphoto.forEach((res, key) => {
      // console.log("add in" + key, res);
      if (res.id === pokemon.id) {
        this.state.dexphoto.splice(key, 1);
        this.setState({ dexphoto: this.state.dexphoto });
        // this.checkHappiness();
      }
    });
  };

  search = keyword => {
    console.log(keyword);
    var dexArray = [];
    const url = "http://localhost:3030/api/cards?name=" + keyword;
    Axios.get(url).then(result => {
      result.data.cards.forEach(dex => {
        if (this.state.mydex.length !== 0) {
          this.state.mydex.forEach(myDex => {
            if (dex.id !== myDex.id) {
              console.log(dex);
              dexArray.push(this.checkHappiness(dex));
              console.log(dexArray);
            }
          });
        } else {
          dexArray.push(this.checkHappiness(dex));
        }
      });
      this.setState({ dexphoto: dexArray });
    });
  };

  toggle = () => {
    this.setState({ displaystatus: "grid" });
  };

  closedisplay = e => {
    console.log("Doing");
    var modal = document.getElementById("modal");
    if (e.target === modal) {
      this.setState({ displaystatus: "none" });
    }
    console.log();
  };

  delfromdex = (res, key) => () => {
    console.log(key);
    this.state.dexphoto.splice(key, 0, res);
    this.setState({ dexphoto: this.state.dexphoto });
    this.state.mydex.splice(key, 1);
    this.setState({ mydex: this.state.mydex });
  };

  changeButton = () => {
    this.setState({ displayADdBut: "block" });
  };
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <div class="header">
              <div>
                <center>
                  <h1>My Pokedex</h1>
                </center>
              </div>
              <div class="my-dex" id="style-1">
                {this.state.mydex.map((res, key) => (
                  <div key={res.id}>
                    <div class="box-mycard">
                      <div>
                        <img src={res.imageUrl} class="my-img" />
                      </div>
                      <div class="my-dex-power">
                        <h1 class="name">{res.name}</h1>
                        <div class="type">
                          <div class="text">HP</div>
                          <div class="tap">
                            <Progress 
                            width={this.CalHP(res.hp)}
                            ></Progress>
                          </div>
                          <div class="text">STR</div>
                          <div class="tap">
                            <Progress
                              width={this.CalSTR(res.attacks)}
                            ></Progress>
                          </div>
                          <div class="text">WEAK</div>
                          <div class="tap">
                            <Progress
                              width={this.CalWEAK(res.weaknesses)}
                            ></Progress>
                          </div>
                        </div>
                        <div class="box-Happiness">
                          {/* {this.createHappiness(res.happiness)} */}
                          <Happiness happiness={res.happiness}></Happiness>
                        </div>
                      </div>
                      <div class="close" onClick={this.delfromdex(res, key)}>
                        X
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div class="footer">
                <div class="circlecontainer" onClick={this.toggle}>
                  <div class="circle">+</div>
                </div>
              </div>
            </div>
            <div
              id="modal"
              onClick={event => this.closedisplay(event)}
              class="boxOverray"
              style={{ display: this.state.displaystatus }}
            >
              <div
                class="boxModal"
                style={{ display: this.state.displaystatus }}
              >
                <div class="headermodal">
                  <div class="box-input">
                    <input
                      class="input"
                      type="text"
                      placeholder="Find Pokemon..."
                      onChange={event => {
                        this.search(event.target.value);
                      }}
                    ></input>
                    <div class="box-search">
                      <img
                        class="search-img"
                        src={icon}
                        onClick={this.ClickSearch}
                      ></img>
                    </div>
                  </div>
                </div>
                <div class="boxDex" id="style-1">
                  {this.state.dexphoto.map(res => (
                    <div class="empty" key={res.id}>
                      <div class="container">
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
                                <div class="text">HP</div>
                                <div class="progress-bar">
                                  <div
                                    class="value-progress-bar"
                                    style={{
                                      width:
                                        res.hp >= 100
                                          ? "100"
                                          : res.hp === "None"
                                          ? "0"
                                          : !res.hp
                                          ? "0"
                                          : res.hp + "%"
                                    }}
                                  >
                                    {res.hp}
                                  </div>
                                </div>
                                <div class="text">STR</div>
                                <div class="progress-bar">
                                  <div
                                    class="value-progress-bar"
                                    style={{
                                      width:
                                        (res.attacks ? res.attacks.length : 0) *
                                          50 +
                                        "%"
                                    }}
                                  >
                                    {res.attacks ? res.attacks.length : 0}
                                  </div>
                                </div>
                                <div class="text">WEAK</div>
                                <div class="progress-bar">
                                  <div
                                    class="value-progress-bar"
                                    style={{
                                      width:
                                        (res.weaknesses
                                          ? res.weaknesses.length
                                          : 0) *
                                          100 +
                                        "%"
                                    }}
                                  >
                                    {res.weaknesses ? res.weaknesses.length : 0}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div>
                            {this.createHappiness(res.happiness)}
                            {/* <Happiness happiness={res.happiness}></Happiness> */}
                          </div>
                        </div>
                        <div
                          class="box"
                          id="box3"
                          onClick={this.saveTomydex(res)}
                        >
                          <h1 class="pointer isHover">Add</h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
