let button = document.querySelector("#searchButton")
let movieName = document.querySelector("#movieName")
let value1 = document.querySelector("#value1")
let value2 = document.querySelector("#value2")
let value3 = document.querySelector("#value3")
let value4 = document.querySelector("#value4")

button.addEventListener('click', async ()=> {
  let input = document.querySelector("#inputBar").value
  if (input == ``) { input = '66511ac9f5c8f989d5fc20bf' }

  try {
    let response = await axios.get(`http://localhost:3001/movies/${input}`);
    console.log(response.data); // Log the data received from the API
    
    movieName.innerText = response.data.title
    value1.innerText = response.data.releaseYear
    value2.innerText = response.data.rating
    value3.innerText = response.data.runtimeMinutes
    value4.innerText = response.data.description

  } catch (error) {
    console.error('Error fetching data:', error);  
  }
  })
