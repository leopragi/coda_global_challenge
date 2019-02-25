import React, { Component } from 'react';
import { Radio, Button, Slider } from 'antd';

export default function Filter (props){
    let {name, value, display, onChange,step, min, max} = props;
    return (
        <div>
            <div style={{
                height: 300,
            }}>
                <Slider value={value} onChange={onChange(name)} min={min} max={max} range vertical step={step} />
            </div>
            <div style={{color:'#fff', writingMode:'vertical-lr', position:'absolute', top:'30%', left:20}}>{display}</div>
        </div>
    )
}