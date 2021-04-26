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
    
}