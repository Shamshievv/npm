const row = document.querySelector(".row")
fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((data) => data.json())
    .then((res) => {
        res.map((el) => (
            row.innerHTML += `<div class="row border border-primary"style="width: 300px;height: 320px">
<h1 style="font-size: 28px">name : ${el.name}</h1>
<p>Username: ${el.username}</p>
<a href="${el.phone}">phone number:${el.phone}</a>
</div>`
        ))
    })