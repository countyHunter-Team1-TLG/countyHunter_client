var favoritemovie = "Shrek";
localStorage.setItem("favoriteMovie", favoritemovie);
console.log(localStorage.getItem("favoriteMovie"));
/*
test
*/

document.getElementById("job-search").addEventListener("submit", searchJobs);
// document.getElementById("details-00").addEventListener("click", detailsSend);
let jobsArray;
document.getElementById("details").addEventListener("click", detailsSend);
// document.getElementById("favs").addEventListener("click", addToFavorites);

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

    data.forEach((element) => {
      let createdCard = jobCard(element, data.indexOf(element));
      container.appendChild(createdCard);
    });

    //add event listener to all buttons with the class card-link
    let buttons = document.querySelectorAll(".card-link");
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.addEventListener("click", detailsSend);
    }
  }
}

function jobCard(jsonObject, arrIndex) {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card d-flex align-items-center");
  let { id, company_logo, title, description } = jsonObject;

  cardDiv.setAttribute("id", id);
  cardDiv.innerHTML = `
                    <img id="company_logo" src="${company_logo}"
                        style="width: 90%"
                        class="card-img-top mt-4"
                        alt="...">
                    <div id="00" class="card-body">
                      <h5 id="job_title" class="card-title">${title}</h5>
                      <p  id="company_description" class="card-text">${description}</p>
                      <div class="card-body" id="jobInfoAt_${arrIndex}">
                        <a href="./job-details.html"  class="card-link btn" >Details</a>
                        <a href="#" class="card-link btn btn-danger">Remove</a>
                      </div>
                    </div>
                  </div>`;

  return cardDiv;
}

function detailsSend(event) {




  // let company_job_description = event.target.parent.parent.job_title;
  // // console.log(company_job_description);
  // localStorage.setItem("company_job_description", company_job_description);
  // // let company_job_description = document.getElementById("company-title-00")
  // //   .innerHTML;
  // let img_src = event.target.company_logo;
  // localStorage.setItem("img_src", img_src);

  // let company_description = event.target.company_description;
  // localStorage.setItem("company_description", company_description);

  // document.getElementById("job-title").innerHTML = company_job_description;
  // // document.getElementById("company").innerHTML = data[0].company;
  // document.getElementById("company-logo").setAttribute("src", img_src);
  // document.getElementById("description").innerHTML = company_description;
  // // document.getElementById("apply_btn").setAttribute("href", data[0].url);
}
