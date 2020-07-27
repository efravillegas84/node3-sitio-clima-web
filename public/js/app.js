const climaForm = document.querySelector('form')
const busquedaInput = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

climaForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const direccion = busquedaInput.value

    url = 'http://localhost:3000/clima?direccion='+direccion
    
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            }
            else{
                msg1.textContent = 'Ciudad: ' + data.ciudad
                msg2.textContent = 'Clima: ' + data.clima
            }
        })
    })
})