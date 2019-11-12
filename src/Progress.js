import React, { Component } from "react";

const Progress = ({width}) => (
    <>
    <div class="progress-bar">
        <div
            class="value-progress-bar"
            style={{
                width: width + "%"
            }}
        >
        </div>
    </div>
    <br/>
    </>
    )
export default Progress;