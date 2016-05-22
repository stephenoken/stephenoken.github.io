const data1 = {
  "city": {
    "id": 2643743,
    "name": "London",
    "coord": {
      "lon": -0.12574,
      "lat": 51.50853
    },
    "country": "GB",
    "population": 0
  },
  "cod": "200",
  "message": 0.0132,
  "cnt": 7,
  "list": [
    {
      "dt": 1463310000,
      "temp": {
        "day": 10.63,
        "min": 4.37,
        "max": 10.63,
        "night": 4.37,
        "eve": 10.63,
        "morn": 10.63
      },
      "pressure": 1027.27,
      "humidity": 56,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 3.58,
      "deg": 9,
      "clouds": 92
    },
    {
      "dt": 1463396400,
      "temp": {
        "day": 14.1,
        "min": 4.62,
        "max": 15.68,
        "night": 6.62,
        "eve": 15.01,
        "morn": 4.62
      },
      "pressure": 1026.57,
      "humidity": 72,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "02d"
        }
      ],
      "speed": 4.21,
      "deg": 298,
      "clouds": 8
    },
    {
      "dt": 1463482800,
      "temp": {
        "day": 17.64,
        "min": 6.03,
        "max": 19.79,
        "night": 14.03,
        "eve": 18.72,
        "morn": 6.03
      },
      "pressure": 1023.37,
      "humidity": 64,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "speed": 4.21,
      "deg": 263,
      "clouds": 0
    },
    {
      "dt": 1463569200,
      "temp": {
        "day": 11.68,
        "min": 9.73,
        "max": 14.33,
        "night": 9.73,
        "eve": 13.74,
        "morn": 12.99
      },
      "pressure": 1009.83,
      "humidity": 83,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 7.18,
      "deg": 257,
      "clouds": 100,
      "rain": 2.1
    },
    {
      "dt": 1463655600,
      "temp": {
        "day": 16.42,
        "min": 10.97,
        "max": 18.49,
        "night": 13.85,
        "eve": 16.72,
        "morn": 10.97
      },
      "pressure": 1015.74,
      "humidity": 72,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 8.86,
      "deg": 235,
      "clouds": 80,
      "rain": 0.36
    },
    {
      "dt": 1463742000,
      "temp": {
        "day": 17.19,
        "min": 12.46,
        "max": 17.19,
        "night": 12.46,
        "eve": 16.12,
        "morn": 13.63
      },
      "pressure": 1015.57,
      "humidity": 0,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 7.93,
      "deg": 216,
      "clouds": 83,
      "rain": 1.75
    },
    {
      "dt": 1463828400,
      "temp": {
        "day": 16.87,
        "min": 11.62,
        "max": 16.87,
        "night": 12.65,
        "eve": 16.37,
        "morn": 11.62
      },
      "pressure": 1016.06,
      "humidity": 0,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 7.58,
      "deg": 218,
      "clouds": 25,
      "rain": 0.73
    }
  ]
};

// const temperatures = data.list.map((day)=>{return day.temp.day;});
//  // for (var i = 0; i < data.list.length; i++) {
//  //   temperatures.push(data.list[i].temp.day);
//  // }
// const sumOfTemps = temperatures.reduce((prev,curr)=>{return prev+curr;});
// const averageTemp = sumOfTemps/temperatures.length;
// // console.log(averageTemp);
//
// const rainyDays = data.list.filter((day) => {return day.weather[0].main === "Rain" && day.rain !== undefined});
// console.log(rainyDays[0].weather);
// const sumOfRainfall = rainyDays.map((day) => {return day.rain;}).reduce((prev, curr) => {return prev+curr;});
// console.log(sumOfRainfall);
//
// const averageRainfall = sumOfRainfall/rainyDays.length;
//
function zip(arr1,arr2) {
  if (arr1.length <= arr2.length) {
    return arr1.map((x,i)=>{return [x,arr2[i]];});
  }else {
    return arr2.map((x,i)=>{return [arr1[i],x];});
  }
}
//
// // console.log(zip([1,2,9],[3,4,5,6]));
//
// const minMaxTemps = zip(data.list.map((day)=>{return day.temp.min;}),data.list.map((day)=>{return day.temp.max;}))
// console.log(minMaxTemps);

function summeriseWeather(data){
  const temperatures = data.list.map((day)=>{return day.temp.day;});
  const sumOfTemps = temperatures.reduce((prev,curr)=>{return prev+curr;});
  const averageTemp = sumOfTemps/temperatures.length;
  const rainyDays = data.list.filter((day) => {return day.weather[0].main === "Rain" && day.rain !== undefined});
  const sumOfRainfall = rainyDays.map((day) => {return day.rain;}).reduce((prev, curr) => {return prev+curr;});
  const averageRainfall = sumOfRainfall/rainyDays.length;
  const minMaxTemps = zip(data.list.map((day)=>{return day.temp.min;}),data.list.map((day)=>{return day.temp.max;}));
  return {
    averageTemp:averageTemp,
    averageRainfall:averageRainfall,
    minMaxTemps:minMaxTemps
  }
}

console.log(summeriseWeather(data1));
