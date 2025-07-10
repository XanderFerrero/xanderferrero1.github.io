let target, val,unitval, convertto

target = document.getElementById("answer");
val = document.getElementById("value");
unitval = document.getElementById("unit");
convertto = document.getElementById("convertTo");

const convert = (value,unit) => {
    return (value * 10)/(unit * 10);
};

const dict = {
    "millimeters (mm)":0.001,
    "centimeters (cm)":0.01,
    "meters (m)":1.0,
    "kilometers (km)":1000.0,
    "inches (in)":0.0254,
    "feet (ft)":0.3048
};

const conversions = {
};

for(let [a, b]of Object.entries(dict)){
    part = {};
    for(let [i,j] of Object.entries(dict)){
        part[i] =  (j * 10)/(b * 10);
    }
    conversions[a] = part;
};

for(let i of Object.keys(dict)){
    unitval.appendChild(new Option(i,i))
    convertto.appendChild(new Option(i,i))
}

document.getElementById("submit").onclick = function() {
    target.value = convert(Number(val.value),conversions[unitval.value][convertto.value]);
    if(target.value === 'NaN'){
        target.value = "Error: Enter numbers only";
    };
};