document.getElementById("home-search").addEventListener("submit", searchHomes);

//handle search button click
function searchHomes(e){
    e.preventDefault();
    
    const formAddress = e.target.sAddie
    const formCity = e.target.city
    const formState = e.target.city

    const URL = ``;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => displayFoundHomes(json));

}

//handle displaying of found homes
function displayFoundHomes(){
    const addTo = document.getElementById("home-card-container");
    const homeCard = document.getElementById("home-card-container");
    //create cards
    data.foreach((element) => {

        let saddress = document.createElement("h2");
        saddress.innerHTML = element.address

        let scity = document.createElement("p");
        scity.innerHTML = element.city;

        let sstate = document.createElement("p");
        sstate.innerHTML = element.state

        let simg = document.createElement("img");
        simg.src = element.url

        let callForInfo = document.createElement("p")
        callForInfo.innerHTML = element.phone;

        //append items to card
        homeCard.appendChild(saddress);
        homeCard.appendChild(scity);
        homeCard.appendChild(sstate);
        homeCard.appendChild(simg);
        homeCard.appendChild(callForInfo);

        //append card to html page
        addTo.appendChild(homeCard);
    })
}