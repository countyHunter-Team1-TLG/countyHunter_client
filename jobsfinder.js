/*
test
*/
let jobsArray;
document.getElementById("job-search").addEventListener("submit", searchJobs);
// document.getElementById("details-00").addEventListener("click", detailsSend);
//document.getElementById("favs").addEventListener("click", addToFavorites);

// function addToFavorites() {
//   let preference = document.getElementById("company-title-00").innerHTML;
//   const URLPOST = `https://countyhunter.herokuapp.com/user/update-preferences`;
//   let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTk3MjYxMjYsIm5hbWUiOiJXQU5HIiwiZW1haWwiOiJhbm90aGVyd2FuZy54YW5kZXJAZ21haWwuY29tIiwiam9iUHJlZmVyZW5jZXMiOjEsImhvdXNlUHJlZmVyYW5jZXMiOjEsImlhdCI6MTYxOTcyMjUyNn0.0dBzPCoICNKS45yc9jX4oa6PB8Q9nnZGYau0t-L1qWQ`;
//   return fetch(URLPOST, {
//     method: "POST",
//     body: { jobPreferences: preference },
//     headers: {
//       Authorization: `auth_token ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((response) => console.log(response));
// }

//handle search button click
async function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.inputTechnology.value;
  const jobLocation = e.target.inputCity.value;

  //   const URLOLD = `https://jobs.github.com/positions?description=${searchJob}&location=${jobLocation}`;

  // const URL = `https://countyhunter.herokuapp.com/jobs/getJobs?description=${searchJob}&location=${jobLocation}`;

  jobsArray = await getJobs(searchJob, jobLocation);
  // .then((json) => displayFoundJobs(json));
  console.log(jobsArray);
  displayFoundJobs(jobsArray);
}

async function getJobs(searchJob, jobLocation) {
  const API = `https://countyhunter.herokuapp.com/jobs/getJobs?description=${searchJob}&location=${jobLocation}`;

  try {
    const response = await fetch(API);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

//handle displaying of found jobs
function displayFoundJobs(data) {
  if (data.length === 0) {
    return window.alert(
      "No job results with the given technology at the specified location. Try another city"
    );
  } else {
    const container = document.querySelector("#card_container");
    container.innerHTML = "";

    for (let index = 0; index < data.length; index++) {
      let createdCard = jobCard(data[index], index);
      container.appendChild(createdCard);
    }
  }
}

function jobCard(jsonObject, arrayIndex) {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card d-flex align-items-center");
  let { company_logo, title, description } = jsonObject;

  cardDiv.setAttribute("id", arrayIndex);
  cardDiv.innerHTML = `
                    <img id="company_logo" src="${company_logo}"
                        style="width: 90%"
                        class="card-img-top mt-4"
                        alt="...">
                    <div id="00" class="card-body">
                      <h5 id="job_title" class="card-title">${title}</h5>
                      <p  id="company_description" class="card-text">${description}</p>
                      <div class="card-body">
                        <a href="./job-details.html" class="card-link btn details">Details</a>
                        <a href="#" class="card-link btn btn-danger">Remove</a>
                      </div>
                    </div>
                  </div>`;

  cardDiv.querySelector(".details").addEventListener("click", detailsSend);

  return cardDiv;
}
function detailsSend(event) {
  let card = event.target.parentElement.parentElement.parentElement;
  console.log(jobsArray[card.id], "logging object at index card.id");
  localStorage.setItem("jobObject", JSON.stringify(jobsArray[card.id]));
}
