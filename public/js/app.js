const climaForm = document.querySelector('form')
const busquedaInput = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const clima = document.querySelector('#clima')
const temperatura = document.querySelector('#temperatura')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const presion = document.querySelector('#presion')
const humedad = document.querySelector('#humedad')

climaForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const direccion = busquedaInput.value

    url = '/clima?direccion='+direccion
    
    msg1.textContent        = 'Loading...'
    clima.textContent       = ''
    temperatura.textContent = ''
    min.textContent         = ''
    max.textContent         = ''
    presion.textContent     = ''
    humedad.textContent     = ''

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            }
            else{
                msg1.textContent        = 'Ciudad: ' + data.ciudad
                clima.textContent       = 'Clima: ' + data.clima.clima
                temperatura.textContent = 'Temperatura: ' + data.clima.temp+'°'
                min.textContent         = 'Temp min: ' + data.clima.temp_min+'°'
                max.textContent         = 'Temp max: ' + data.clima.temp_max+'°'
                presion.textContent     = 'Presion: ' + data.clima.presion+'Pa'
                humedad.textContent     = 'Humedad: ' + data.clima.humedad+'%hr'
            }
        })
    })
})