let myForm = document.forms[`myForm`];
let cardBody = document.querySelector(".card-body");
myForm.addEventListener("submit", function (e) {
    let search = document.getElementById("search-term").value;
    let sort = document.querySelector(`input[name=sort]:checked`).value;
    let select = document.getElementById("limit").value;
    if (!search) {
        check();
    }
    else {
        fetchReddit(search,sort,select);
    }
    e.preventDefault();
    myForm.reset();
});

function check() {
    let div = document.createElement("div");
    div.className = "alert alert-danger";
    div.appendChild(document.createTextNode("error"));
    cardBody.insertBefore(div, myForm);
    setTimeout(() => cardBody.querySelector(".alert").remove(),2000)
}

function fetchReddit(search,sort,select) {
    fetch(`https://www.reddit.com/search.json?q=${search}&sort=${sort}&limit=${select}`).
        then(res => res.json()).then(data=>{
            let card = document.getElementsByClassName("card-columns")[0];
            card.innerHTML =``;
            let children = data.data.children;
            children.forEach(item=>{
                let image = ``;
                if(item.data.preview){
                    image = item.data.preview.images[0].source.url;
                }
                else{
                    image = `reddit.jpg`;
                }
                card.innerHTML += `<div class="card">
                                        <img src="${image}" class="card-img-top">
                                        <div class="card-body">
                                            <h6 class="card-text">${item.data.title}</h6>
                                            <p class="card-text">${truncateText(item.data.selftext,100)}</p>
                                            <a href="${item.data.url}" class="btn btn-primary" target="_blank">REad More</a>
                                        </div>
                                   </div>`
            })
    }).catch(error => console.log(error));
}
function truncateText(text,limit) {
    let shortened = text.indexOf(` `,limit);
    if (shortened === -1) return text;
    return text.substring(0,shortened);
}