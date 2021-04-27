document.getElementById("job-search").addEventListener("submit", searchJobs);

//handle search button click
function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.jtitle.value;
  const jobLocation = e.target.location.value;

  const URL = `https://jobs.github.com/positions?description=${searchJob}&location=${jobLocation}`;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => displayFoundJobs(json));
}

//handle displaying of found jobs
function displayFoundJobs(data) {

document.getElementById("job-title").innerHTML = data[0].title;
document.getElementById("company").innerHTML = data[0].company;
document.getElementById("company-logo").setAttribute("src", data[0].company_logo);
document.getElementById("job-title").innerHTML = data[0].description;




//   const addTo = document.getElementById("job-card-container");
//   //create cards
//   let jobCard = document.createElement("div");
//   data.foreach((element) => {
//     //job title
//     let jobTile = document.createElement("h2");
//     jobTile.innerHTML = element.title;
//     //company name
//     let companyName = document.createElement("h3");
//     companyName.innerHTML = element.company;
//     //job description
//     let jobDescription = document.createElement("p");
//     jobDescription.innerHTML = element.description;
//     //url to apply to job
//     let urlLink = element.url;
//     let toJob = `window.location.href='${urlLink}';`;
//     //button to go to job post
//     let apply = document.createElement("button");
//     apply.setAttribute("onclick", toJob);
//     apply.innerHTML = "apply";

//     //append to card
//     jobCard.appendChild(jobTile);
//     jobCard.appendChild(companyName);
//     jobCard.appendChild(jobDescription);
//     jobCard.appendChild(apply);

//     //append card to html page
//     addTo.appendChild(jobCard);
//   });
}
