document.getElementById("home-search").addEventListener("submit", searchHomes);

//handle search button click
function searchHomes(e) {
  e.preventDefault();

  const formAddress = e.target.address;
  const formCity = e.target.city;
  const formState = e.target.state;

  const URL = `${formAddress}  ${formCity} ${formState}`;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => displayFoundHomes(json));
}

//handle displaying of found homes
function displayFoundHomes(data) {
  document.getElementById("address").innerHTML = data[0].address;
  document.getElementById("city").innerHTML = data[0].city;
  document.getElementById("houseimg").setAttribute("src", data[0].img_url);
  document.getElementById("homeinfo").innerHTML = data[0].description;

  //rest of the homes
  const addTo = document.getElementById("hlink-list");
  //create links to display homes on the side bar
  for (let i = 1; i < data.length; i++) {
    let houselistItem = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", data.img_url);
    a.innerHTML = data.address + ";" + data.city;
    houselistItem.appendChild(a);

    addTo.appendChild(joblistItem);
  }
}
