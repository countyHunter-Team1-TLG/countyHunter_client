var jobObject = JSON.parse(localStorage.getItem("jobObject"));

document.getElementById("job-title").innerHTML = jobObject.title;

document
  .getElementById("company-logo")
  .setAttribute("src", jobObject.company_logo);
document.getElementById("description").innerHTML = jobObject.description;

document.getElementById("job-search").addEventListener("submit", searchJobs);
document.querySelector(".fav").addEventListener("click", addToFavorites);

document.getElementById("apply_btn").setAttribute("href", jobObject.url);

//add to favorites
function addToFavorites() {
  let preference = document.getElementById("job-title").innerHTML;
  const URLPOST = `https://countyhunter.herokuapp.com/user/update-preferences`;
  let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTk3OTkxNjUsIm5hbWUiOiJXQU5HIiwiZW1haWwiOiJhbm90aGVyd2FuZy54YW5kZXJAZ21haWwuY29tIiwiam9iUHJlZmVyZW5jZXMiOjEsImhvdXNlUHJlZmVyYW5jZXMiOjEsImlhdCI6MTYxOTc5ODg2NX0.Q3sS2dl_KWaFal5WO_Ruszu8WO9hyF4H9T67iW6DtOU`;
  return fetch(URLPOST, {
    method: "PUT",
    body: { jobPreferences: preference },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
}

//handle search button click
function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.inputTechnology.value;
  const jobLocation = e.target.inputCity.value;

  const URL = `https://countyhunter.herokuapp.com/jobs/getJobs?description=${searchJob}&location=${jobLocation}`;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => displayFoundJobs(json));
}

//handle displaying of found jobs
function displayFoundJobs(data) {
  const addTo = document.getElementById("jlink-list");
  if (data.length === 0) {
    document.getElementById("job-title").innerHTML = "job is not found";
    document.getElementById("company").innerHTML =
      "job is not found theres is not company";
    document
      .getElementById("company-logo")
      .setAttribute("src", "./images/countyhunters.png");
    document.getElementById("description").innerHTML =
      "no description avaliable ";

    addTo.innerHTML = "";
    return;
  } else {
    //first job
    document.getElementById("job-title").innerHTML = data[0].title;
    document.getElementById("company").innerHTML = data[0].company;
    document
      .getElementById("company-logo")
      .setAttribute("src", data[0].company_logo);
    document.getElementById("description").innerHTML = data[0].description;
    document.getElementById("apply_btn").setAttribute("href", data[0].url);
  }
}
