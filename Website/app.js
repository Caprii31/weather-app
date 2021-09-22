//open weather map variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=24e6b68ff48d96550ba956b1b675ed7e&units=metric';
const generateBtn = document.getElementById('generate')

//get date 
const dddd = new Date();
const todayData = `${dddd.getDate()}/${dddd.getMonth()+1}/${dddd.getFullYear()}`


// create a function to get and post when click generate 

generateBtn.addEventListener('click',generate);

async function generate (){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;


    getWeather(baseURL,zipCode,apiKey)
    .then(function(data){
      postWeatherInfo('http://localhost:3000/serverPost', {temperture: data.main.temp, emo: feelings, date: todayData})
    })
   .then(function(dataII){
       updateUI();
   })
   
};

// get request from weather map api

const getWeather = async(url,zipcode,key)=>{
    const respond = await fetch(url+zipcode+key)
    try{
        const data = await respond.json();
        console.log(data)
        return data
    }catch(error){
        console.log('error',error);
    }
}

// create post request to local server

const postWeatherInfo = async(url='', data={})=>{
    console.log(data);
    const respond = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
           
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const postData = await respond.json()
        return postData
    }catch(error){
        console.log('error',error)
     }
    }


    //function to update UI 

   const updateUI = async () => {
       const getData = await fetch('http://localhost:3000/serverGet');
       try{
           const arrivedData = await getData.json()
           console.log(arrivedData);
           document.getElementById('date').innerHTML=`Date: ${arrivedData.date}`;
           document.getElementById('temp').innerHTML=`The weather is: ${arrivedData.weather} celsius`;
           document.getElementById('emo').innerHTML=`You feel: ${arrivedData.feelings}`;
       }catch(error){
           console.log('error',error)
       }
   }
