document.getElementById("job-search").addEventListener("submit", searchJobs);

//handle search button click
function searchJobs(e) {
  e.preventDefault();

  const searchJob = e.target.jobname.value;
  const jobLocation = e.target.city.value;

  //   const URLOLD = `https://jobs.github.com/positions?description=${searchJob}&location=${jobLocation}`;

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

    //rest of the jobs SIDE BAR
    //create links to display jobs on the side bar

    for (let i = 1; i < data.length; i++) {
      let joblistItem = document.createElement("li");
      let a = document.createElement("p");
      let sameLine = document.createElement("span");
      let liButton = document.createElement("button");
      a.innerHTML = data[i].company + ";" + data[i].title;
      liButton.innerHTML = "more\ninfo";

      //ISSUE HERE
      liButton.setAttribute("onclick", changedisplay);

      sameLine.appendChild(liButton);
      joblistItem.appendChild(a);
      joblistItem.appendChild(sameLine);
      addTo.appendChild(joblistItem);
    }
  }
}
function changedisplay(data) {
  console.log("clicked");
  //onclick change the main display
  document.getElementById("job-title").innerHTML = data.title;
  document.getElementById("company").innerHTML = data.company;
  document
    .getElementById("company-logo")
    .setAttribute("src", data.company_logo);
  document.getElementById("description").innerHTML = data.description;
}

/*
*   HERE WILL BE CODE THAT I MAY NEED LATER

HTML CODE:  src="https://www.thetravelmagazine.net/wp-content/uploads/World-Wonders-Tour-Image.jpg"
*/
