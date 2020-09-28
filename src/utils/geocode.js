const request=require('request')

const geocode = (direccion, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + direccion + '.json?access_token=' + process.env.GEOCODE_KEY + '&limit=1&language=es'

    request({url, json:true}, (error, {body}={})=>{
        if(error){
            callback('servicio no se pudo contactar:['+error+']', undefined);
        }
        else if(body.features.length == 0){
            callback('ERROR EN PETICION'+((body.message)?':['+body.message+']':''), undefined);
        }
        else{
            latitud = body.features[0].center[1]
            longitud = body.features[0].center[0]
            nombre = body.features[0].place_name
            callback(undefined, {
                latitud,
                longitud,
                nombre
            });
        }
    })
}

module.exports = geocode