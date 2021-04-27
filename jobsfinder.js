document.getElementById("job-search").addEventListener("submit", searchJobs);


//handle search button click
function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.jobname.value;
  const jobLocation = e.target.city.value;

  const URL = `https://jobs.github.com/positions?description=${searchJob}&location=${jobLocation}`;

  fetch(URL)
    .then((res) => res.json())
    .then((json) => displayFoundJobs(json));
}

//handle displaying of found jobs
function displayFoundJobs(data) {
  //first job
  document.getElementById("job-title").innerHTML = data[0].title;
  document.getElementById("company").innerHTML = data[0].company;
  document
    .getElementById("company-logo")
    .setAttribute("src", data[0].company_logo);
  document.getElementById("job-title").innerHTML = data[0].description;

  //rest of the jobs
  const addTo = document.getElementById("jlink-list");
  //create links to display jobs on the side bar

  for (let i = 1; i < data.length; i++) {
    let joblistItem = document.createElement("li");
    let a = document.createElement("a");
    a.innerHTML = data.company + ";" + data.title;
     a.setAttribute("onclick",  ()=> {
                //onclick change the main display
        document.getElementById("job-title").innerHTML = data[i].title;
        document.getElementById("company").innerHTML = data[i].company;
        document
                .getElementById("company-logo")
                .setAttribute("src", data[i].company_logo);
        document.getElementById("job-title").innerHTML = data[i].description;

     });
    
    joblistItem.appendChild(a);

    addTo.appendChild(joblistItem);
  }
}
