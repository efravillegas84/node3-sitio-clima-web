const request = require('request')

const climaCordenadas = (latitud, longitud, callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + longitud + '&appid=' + process.env.CLIMA_KEY + '&units=metric&lang=es'
    
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