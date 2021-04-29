document.getElementById("job-search").addEventListener("submit", searchJobs);
// document.getElementById("details-00").addEventListener("click", detailsSend);
let jobsArray;
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

    // document.getElementById("job-title").innerHTML = "job is not found";
    // document.getElementById("company").innerHTML =
    //   "job is not found theres is not company";
    // document
    //   .getElementById("company-logo")
    //   .setAttribute("src", "./images/countyhunters.png");
    // document.getElementById("description").innerHTML =
    //   "no description avaliable ";

    // addTo.innerHTML = "";
    // return;
  } else {
    const container = document.querySelector("#card_container");
    container.innerHTML = "";

    data.forEach((element) => {
      let createdCard = jobCard(element);
      container.appendChild(createdCard);
    });
  }
}
// function detailsSend() {
//   let company_job_description = document.getElementById("company-title-00")
//     .innerHTML;
//   let img_src = document.getElementById("companylogo-02").src;
//   let company_description = document.getElementById("company-description-02")
//     .innerHTML;

//   document.getElementById("job-title").innerHTML = company_job_description;
//   // document.getElementById("company").innerHTML = data[0].company;
//   document.getElementById("company-logo").setAttribute("src", img_src);
//   document.getElementById("description").innerHTML =
//     data[0].company_description;
//   // document.getElementById("apply_btn").setAttribute("href", data[0].url);
// }

function jobCard(jsonObject) {
  let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card d-flex align-items-center");
  let {id, company_logo, title, description} = jsonObject;


  cardDiv.setAttribute("id", id);
  cardDiv.innerHTML = `
                    <img id="company_logo" src="${company_logo}"
                        style="width: 90%"
                        class="card-img-top mt-4"
                        alt="...">
                    <div id="00" class="card-body">
                      <h5 id="job_title" class="card-title">${title}</h5>
                      <p  id="company_description" class="card-text">${description}</p>
                      <div class="card-body">
                        <a href="./job-details.html" class="card-link btn" id="details">Details</a>
                        <a href="#" class="card-link btn btn-danger">Remove</a>
                      </div>
                    </div>
                  </div>`;

  return cardDiv;
}
