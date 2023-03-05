//
// const row = document.querySelector(".row")
// // axios(`https://restcountries.com/v3.1/all`)
// // .then((res) => {
// //     console.log(res.data)
// //     res.data.map((el) => (
// //         row.innerHTML += `<div class="col-4 my-5 " style="width: 420px; height: 550px; margin:0 10px;border: 2px solid black" >
// // <img src="${el.flags.svg}" alt="" width="400px" height="300px">
// // <h1>Name: ${el.name.common}</h1>
// // <p>Area : ${el.area} km²</p>
// // <h3>Population: ${el.population}</h3>
// // <h5>Region: ${el.region}</h5>
// // <a href="${el.maps.googleMaps}" target="_blank">${el.maps.googleMaps}</a>
// // </div>`
// //     ))
// // })
// const input = document.querySelector(".input")
// axios(`https://restcountries.com/v3.1/all`)
// .then((res) => {
//     console.log(res)
//         res.data.map((el) => (
//             row.innerHTML += `<div>
// <h1>Name: ${el.name.common}</h1>
// </div>`
//         ))
// })
//
//
//
//
//









const row = document.querySelector(".row")
const input = document.querySelector(".search-input")
const select = document.querySelector(".select-sort")
const btn = document.querySelector(".search-btn")
const secondSelect = document.querySelector(".second-select")
const body = document.querySelector("body")
body.style.background = "aqua"
let allData = undefined
// axios(`https://restcountries.com/v3.1/all`)
//     .then((res)=> {
//         console.log(res.data)
//         res.data.map((el)=> (
//             row.innerHTML+=`<div class="col-3 my-5" style="border: 2px solid black; background: transparent ; margin: 0 20px;">
//    <h1>${el.name.common}</h1>
//    <h2>${el.capital ? el.capital : "no"}</h2>
//      <h2>${el.area}</h2>
//       <h1>${el.population}</h1>
//         <p>${el.borders}</p>
//         <a href="https://goo.gl/maps/Bw2t83Syy74coMzWA">${el.maps.openStreetMaps}</a>
//           <img src="${el.flags.png}" alt=""></div>`
//         ))  })

function axiosApi(API){
    axios(`https://restcountries.com/v3.1/${API}`)
    .then((res)=> {
        allData = res.data
        getApi(res.data.slice(0,50))
    })
}
axiosApi(`all`)
function getApi(data){
    window.scroll(0,0)
    row.innerHTML=""
    data.map((el)=> (
        row.innerHTML+=`<div class="col-3  my-3 " style="border: 2px solid black; background: lavenderblush ; margin: 0 6px;width: 400px">   
<h1>Name : ${el.name.common}</h1>  
     <h2>Capital : ${el.capital ? el.capital : "no"}</h2>    
      <h2>Area : ${el.area}</h2>
      <h1>Population : ${el.population}</h1>       
       <p>Borders : ${el.borders ? el.borders : "no"}</p>
       <h5>region:${el.region}</h5>
         <a href="https://goo.gl/maps/Bw2t83Syy74coMzWA">${el.maps.openStreetMaps}</a>       
            <img src ="${el.flags.png}" alt="" style="padding: 5px 20px;"> 
            
</div>`  ))
}
btn.addEventListener("click",()=> {
    axiosApi(`name/${input.value}`)
})
input.addEventListener("keydown",(ev)=> {
    if (ev.key === "Enter"){
        axiosApi(`name/${input.value}`)

    }})
input.addEventListener("input",(er)=> {
    axiosApi(`name/${er.target.value}`)
})
select.addEventListener("change",(ew)=> {
    const value=ew.target.value
    if (value === "population"){
        let result =  allData.sort((a,b)=>{
            return b.population - a.population
        })
        getApi(result)
    } else if (value === "area"){
        let result=  allData.sort((a,b)=>{
            return b.area - a.area
        })
        getApi(result)
    } else if (value === "A-Z"){
        let result =  allData.sort((a,b)=>{
            return a.name.common  > b.name.common ? 1 : -1
        })
        getApi(result)
    } else if ( value === "A-Z"){
        let result = allData.sort((a,b)=> {
        return a.name.common - b.name.common ? 1: 1
        })
        getApi(result)
    } else if (value === "Z-A"){
        let result = allData.sort((a,b)=> {
            return b.name.common - a.name.common ? -1: 1
        })
        getApi(result)
    } })
secondSelect.addEventListener("change", (e) => {
    const value = e.target.value
  if (value === "Asia"){
      let result = allData.filter((el) =>{
         return  el.region === "Asia"
      })
      getApi(result)
  }
  else if (value === "Europe"){
      let result = allData.filter((el) => {
         return  el.region === "Europe"
      })
      getApi(result)
  }
  else if(value === "Africa"){
      let result = allData.filter((el) => {
          return el.region === "Africa"
      })
      getApi(result)
  }  else if(value === "Oceania"){
      let result = allData.filter((el) => {
          return el.region === "Oceania"
      })
      getApi(result)
  }
})



const breed = document.querySelector(".breeds")
const breedImg = document.querySelector(".breed-img")

function getBtn () {
    const buttons = document.querySelectorAll(".breed-btn")
    buttons.forEach(btn => {
        btn.addEventListener("click" , () => {
            fetchImg(btn.innerHTML)
        })
    })
}
function fetchBtn () {
    axios(`https://dog.ceo/api/breeds/  list/all`)
        .then((res) => {
            console.log(Object.keys(res.data.message))
            Object.keys(res.data.message).map((el)=> {
                breed.innerHTML += `<button class="breed-btn btn btn-warning">${el}</button>`
            })
        })
        .then(() => getBtn())
}
fetchBtn()

function fetchImg (name) {
    axios(`https://dog.ceo/api/breed/${name}/images/random`)
        .then((result) => {
            breedImg.innerHTML = `<img src="${result.data.message}" alt="img">`
        })
}