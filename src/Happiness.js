import React, { Component } from "react";
import cute from "./cute.png";

const Happiness = ({happiness}) => {
    let hap = [];
    for (let i = 0; i < happiness; i++) {
      hap.push(
        <img class="cute-img" src={cute} alt="emotion" />
      );
    }
    return hap;
  };
export default Happiness;