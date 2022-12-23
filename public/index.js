const $registerName = document.querySelector('#registerName')
const $registerRoll = document.querySelector('#registerRoll')
const $registerForm = document.querySelector('#registerForm')
const $updateInfoForm = document.querySelector('#updateInfo')
const $getInfoButton = document.querySelector('#getInfo')
const $updateName = document.querySelector('#updateName')
const $updateRoll = document.querySelector('#updateRoll')
const $oldRoll = document.querySelector('#oldRoll')
const $deleteInfoForm = document.querySelector('#deleteInfo')
const $deleteRoll = document.querySelector('#deleteRoll')

const hostName = 'http://localhost:3000' // Doubt

console.log('Running')

$registerForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const name = $registerName.value
    const roll = $registerRoll.value
    const url = `${hostName}/register`
    const data = {
        name,
        roll
    }
    const dataJSON = JSON.stringify(data)
    const other_params = {
        headers : { "content-type" : "application/json" },
        body : dataJSON,
        method : "POST"
    };
    const response = await fetch(url,other_params)
    if(response.ok){
        const data = await response.json()
        console.log(data)
    }
    else{
        console.log('This roll no. is already registered!')
    }
})

$getInfoButton.addEventListener('click',async (e)=>{
    e.preventDefault()
    const url = `${hostName}/students`
    const other_params = {
        headers : { "content-type" : "application/json" },
        method : "GET"
    };
    const response = await fetch(url,other_params)
    if(response.ok){
        const data = await response.json()
        console.log(data)
    }
    else{
        console.log('There has been some error')
    }
})

$updateInfoForm.addEventListener('submit',async (e)=>{
    e.preventDefault()

    const oldRoll=$oldRoll.value.trim().toUpperCase()
    const name=$updateName.value.trim()
    const roll=$updateRoll.value.trim().toUpperCase()
    const data ={
        name,
        roll
    }
    const dataJSON = JSON.stringify(data)
    const url = `${hostName}/update/${oldRoll}`
    const other_params = {
        headers : { "content-type" : "application/json" },
        body: dataJSON,
        method : "PATCH"
    };
    const response = await fetch(url,other_params)
    if(response.ok){
        const data = await response.json()
        console.log(data)
    }
    else if(response.status==400){
        console.log('This roll no. already exists')
    }
    else if(response.status==404){
        console.log('There is no user with this roll no')
    }
})

$deleteInfoForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const roll = $deleteRoll.value.trim().toUpperCase()
    const url = `${hostName}/delete/${roll}`
    const other_params = {
        headers : { "content-type" : "application/json" },
        method : "DELETE"
    };
    const response = await fetch(url,other_params)
    if(response.ok){
        const data = await response.json()
        console.log(data)
    }
    else if(response.status==404){
        console.log('There is no user with this roll no')
    }
})