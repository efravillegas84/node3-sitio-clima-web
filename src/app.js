const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const climaCordenadas = require('./utils/climaService')
const verificarCaptcha = require('./utils/recaptchav2')

const app = express()

const port= process.env.PORT || 3000

//definicion de rutas para configuracion de express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//configuracion de handlebars y hubicaion de views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

//configuracion de contenido estatico
app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render('index', {
        titulo: 'Clima',
        nombre: 'Efrain Villegas'
    })
})

app.get('/acerca',(req, res)=>{
    res.render('acerca', {
        titulo: 'Acerca de Mi',
        nombre: 'Efrain Villegas'
    })
})

app.get('/ayuda',(req, res)=>{
    res.render('ayuda', {
        titulo: 'AYUDA',
        nombre: 'Efrain Villegas',
        msg: '¿nesesita ayuda?'
    })
})

app.get('/clima', (req, res)=>{
    if(!req.query.direccion){
        return res.send({
            error: 'debe proporcionar una direccion para buscar'
        })
    }

    if(!req.query.recapcharesponse){
        return res.send({
            error: 'debe completar captcha'
        })
    }

    try {
        verificarCaptcha(req.query.recapcharesponse, (resp)=>{
            if(resp === false){
                return res.send({
                    error: 'verificación captcha ha fallado intente de nuevo por favor'
                })
            }
        })
    } catch (error) {
        return res.send({
            error: 'verificación captcha ha fallado intente de nuevo por favor'
        })
    }

    geocode(req.query.direccion, (error, {latitud, longitud, nombre}={})=>{
        if (error) {
            return res.send({error})  
        }
        climaCordenadas(latitud, longitud, (error, climaData)=>{
            if (error) {
                return res.send({error})  
            }

            res.send({
                ciudad: nombre,
                clima: climaData,
                direccion: req.query.direccion
            })

        })
    })
})

app.get('/productos', (req, res)=>{
    if(!req.query.busqueda){
        return res.send({
            error: 'se debe proveer una busqueda'
        })
    }
    res.send({
        productos: []
    })
})

app.get('/ayuda/*', (req, res)=>{
    res.render('404page', {
        titulo: '404',
        nombre: 'Efrain Villegas',
        msg404: 'Sitio de ayuda no encontrado'
    })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        titulo: '404',
        nombre: 'Efrain Villegas',
        msg404: 'Sitio no encontrado'
    })
})

app.listen(port, ()=>{
    console.log('server esta funcionando en puerto '+port)
})