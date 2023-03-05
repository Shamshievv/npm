const breed = document.querySelector(".breeds")
const breedImg = document.querySelector(".breed-img")
const input = document.querySelector(".search-input")
const btn = document.querySelector(".search-btn")

function add(){
    btn.addEventListener("click" , () => {
        axios(`https://dog.ceo/api/breed/${input.value.trim()}/images/random`)
            .then((result) =>{
                breedImg.innerHTML = `<img src="${result.data.message}" alt="img">`
            })

    })

}
add()

input.addEventListener("keydown" ,(e) => {
    if (e.key === "Enter"){
        add()
    }
})

function fetchBtn () {
    axios(`https://dog.ceo/api/breeds/list/all`)
        .then((res) => {
            console.log(Object.keys(res.data.message))
            Object.keys(res.data.message).map((el)=> {
                breed.innerHTML += `<button class="breed-btn btn btn-warning m-1">${el}</button>`
            })
            const select = document.querySelector(".select-sort")
            Object.keys(res.data.message).map((el) => {
                select.innerHTML += `<option class="options">${el}</option>`
            })
        })
        .then(() => getBtn() )
}
fetchBtn()


const select = document.querySelector(".select-sort")
select.addEventListener("change" , (e) =>{
    fetchImg(e.target.value)
})

function getBtn () {
    const buttons = document.querySelectorAll(".breed-btn")
    buttons.forEach(btn => {
        btn.addEventListener("click" , () => {
            fetchImg(btn.innerHTML)
        })
    })
}


function fetchImg (name) {
    axios(`https://dog.ceo/api/breed/${name}/images/random`)
        .then((result) => {
            breedImg.innerHTML = `<img src="${result.data.message}" alt="img">`
        })
}




// ASYNC/AWAIT
//
// const users = async () => {
//     const res = await axios(`https://jsonplaceholder.typicode.com/users`)
//     const {data} = await res
//     console.log(data)
// }
//
// console.log(users())
//
//
//
//  async function user(){
//      const res = await axios(`https://jsonplaceholder.typicode.com/users`)
//      const {data} = await res.data
//      console.log(data)
// }
//
// console.log(users())