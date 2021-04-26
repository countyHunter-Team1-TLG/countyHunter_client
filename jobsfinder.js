document.getElementById("job-search").addEventListener("submit", searchJobs);

//handle search button click
function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.jtitle.value;
  const jobLocation = e.target.location.value;

  const URL = `https://jobs.github.com/positions?description=${searchJob}&location=${jobLocation}`;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => console.log(json));
}

//handle displaying of found jobs
function displayFoundJobs(data){
    const addTo = document.getElementById("job-card-container");
    //create cards
    data.foreach((element) => {
            //job title
    let jobTile = document.createElement("h2");
    jobTile.innerHTML = element.title;
            //company name
    let companyName = document.createElement("h3");
    companyName.innerHTML = element.company;
            //job description
     let jobDescription = document.createElement("p");
     jobDescription.innerHTML = element.description;
            //url to apply to job
    let urlLink = element.url;
    let toJob = `window.location.href='${urlLink}';`;
            //button to go to job post
     let apply = document.createElement("button");
     apply.setAttribute("onclick", toJob);
     but.innerHTML = "apply";
    })
}