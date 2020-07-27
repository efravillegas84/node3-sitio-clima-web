const request = require('request')

const climaCordenadas = (latitud, longitud, callback)=>{
    // const url='http://api.weatherstack.com/current?access_key=f6f2c88157bd2b59b0a0133837b8c1e6&query=-33.433612,-70.638696'
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+latitud+'&lon='+longitud+'&appid=64622ffc08658773de518be75b5c3b2a&units=metric&lang=es'
    
    request({url, json:true}, (error, {body}={})=>{
        if(error){
            callback('servicio no se pudo contactar:['+error+']', undefined);
        }
        else if(body.message ){
            callback('ERROR EN PETICION:['+body.message+']', undefined);
        }
        else{
            callback(undefined,{
                clima: body.weather[0].description,
                temp: body.main.temp,
                temp_min: body.main.temp_min,
                temp_max: body.main.temp_max,
                presion: body.main.pressure,
                humedad: body.main.humidity,
            })
        }
    })
}

module.exports = climaCordenadas