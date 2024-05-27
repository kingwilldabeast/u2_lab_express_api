let button = document.querySelector("#searchButton")
let movieName = document.querySelector("#movieName")
let movieImage = document.querySelector('#movie-poster')
let value1 = document.querySelector("#value1")
let value2 = document.querySelector("#value2")
let value3 = document.querySelector("#value3")
let value4 = document.querySelector("#plot-content")
let actorElemList = document.querySelector('#actor-list')
let reviewList = document.querySelector('#review-list')
let actorButtons = document.querySelectorAll('.actor-button')
let actorInfo = document.querySelector('#actor-info')
let actorName = document.querySelector('#actor-name')
let actorHeadshot = document.querySelector('#actor-headshot')
let closeButton = document.querySelector('#close')

const actorArray = []
const actorImageArray = []

button.addEventListener('click', async ()=> {
  let input = document.querySelector("#inputBar").value
  if (input == ``) { input = 3 }

  try {
    // let response = await axios.get(`http://localhost:3001/movies/${input}`);
    let response = await axios.get(`http://localhost:3001/movies`);
    // console.log(response.data); // Log the data received from the API
    
    let singleMovie = response.data[input]
    movieName.innerText = singleMovie.title
    movieImage.setAttribute('src',singleMovie.poster_img)
    value1.innerText = singleMovie.releaseYear
    value2.innerText = singleMovie.rating
    value3.innerText = singleMovie.runtimeMinutes
    value4.innerText = singleMovie.description
    
    let actorsIDArray = singleMovie.actors

    const fetchActorDetails = async (actorID) => {
      try {
        // console.log(actorID);
        let singleActor = await axios.get(`http://localhost:3001/actors/${actorID}`);
        const newElement = document.createElement('div');
        newElement.classList.add('info','actor-button');
        // newElement.innerHTML = `<a href = http://localhost:3001/actors/${actorID}>${singleActor.data.name}</a>`
        newElement.innerText = singleActor.data.name
        actorElemList.appendChild(newElement);
        actorArray.push(singleActor.data.name)
        actorImageArray.push(singleActor.data.headshot_img)
      } catch (error) {
        console.error(`Error fetching actor with ID ${actorID}:`, error);
      }
    };
    
    const loadActors = async () => {
      actorElemList.innerHTML = ''
      for (const actorID of actorsIDArray) {
        await fetchActorDetails(actorID);
      }
      console.log(actorArray)
      console.log(actorImageArray)
      actorButtons = document.querySelectorAll('.actor-button')
      actorButtons.forEach(function(actorButton) {
        actorButton.addEventListener('click', function() {    
          actorInfo.style.zIndex = 2 
          const position = actorArray.indexOf(actorButton.innerText)
          actorName.innerText = actorArray[position]
          actorHeadshot.setAttribute('src', actorImageArray[position])
          // console.log('hi')
        });
    });
      // console.log(actorButtons)

    };
    
    loadActors();

    /////Revies
    let reviewsIDArray = singleMovie.reviews
    // console.log(`THE REVIEW array IS ${reviewsIDArray}`);


    const fetchReviewDetails = async (reviewID) => {
      try {
        // console.log(`THE REVIEW ID IS ${reviewID}`);
        let singleReview = await axios.get(`http://localhost:3001/reviews/${reviewID}`);
        const newElement = document.createElement('div');
        newElement.classList.add('info');
        newElement.innerHTML = `<a href = http://localhost:3001/reviews/${reviewID}>${singleReview.data.comment}</a>`
        reviewList.appendChild(newElement);
      } catch (error) {
        console.error(`Error fetching review with ID ${reviewID}:`, error);
      }
    };
    
    const loadReviews = async () => {
      reviewList.innerHTML = ''
      for (const reviewID of reviewsIDArray) {
        await fetchReviewDetails(reviewID);
      }
    };
    
    loadReviews();
    //reviews...

  } catch (error) {
    console.error('Error fetching data:', error);  
  }
  })

  closeButton.addEventListener('click', () => {
      actorInfo.style.zIndex = -1
  })


