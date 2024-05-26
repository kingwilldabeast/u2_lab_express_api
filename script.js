let button = document.querySelector("#searchButton")
let movieName = document.querySelector("#movieName")
let value1 = document.querySelector("#value1")
let value2 = document.querySelector("#value2")
let value3 = document.querySelector("#value3")
let value4 = document.querySelector("#plot-content")
let actorList = document.querySelector('#actor-list')

button.addEventListener('click', async ()=> {
  let input = document.querySelector("#inputBar").value
  if (input == ``) { input = 1 }

  try {
    // let response = await axios.get(`http://localhost:3001/movies/${input}`);
    let response = await axios.get(`http://localhost:3001/movies`);
    console.log(response.data); // Log the data received from the API
    
    let singleMovie = response.data[input]
    movieName.innerText = singleMovie.title
    value1.innerText = singleMovie.releaseYear
    value2.innerText = singleMovie.rating
    value3.innerText = singleMovie.runtimeMinutes
    value4.innerText = singleMovie.description

    // let actorID = singleMovie.actors[0]
    
    let actorsIDArray = singleMovie.actors

    const fetchActorDetails = async (actorID) => {
      try {
        console.log(actorID);
        let singleActor = await axios.get(`http://localhost:3001/actors/${actorID}`);
        const newElement = document.createElement('div');
        newElement.classList.add('info');
        newElement.innerText = singleActor.data.name;
        actorList.appendChild(newElement);
      } catch (error) {
        console.error(`Error fetching actor with ID ${actorID}:`, error);
      }
    };
    
    const loadActors = async () => {
      for (const actorID of actorsIDArray) {
        await fetchActorDetails(actorID);
      }
    };
    
    loadActors();

  } catch (error) {
    console.error('Error fetching data:', error);  
  }
  })
