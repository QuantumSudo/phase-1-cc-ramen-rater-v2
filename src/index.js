const ramenAPI = 'http://localhost:3000/ramens'; // Update with your API endpoint
const ramenMenuDiv = document.getElementById('ramen-menu');
const ramenDetailImage = document.querySelector('.detail-image');
const ramenName = document.querySelector('.name');
const ramenRestaurant = document.querySelector('.restaurant');
const ratingDisplay = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');

function main() {
    displayRamens();
    addSubmitListener(); 
}

function displayRamens() {
    fetch(ramenAPI)
        .then(response => response.json())
        .then(ramens => {
            ramens.forEach(renderRamen);
        })
        .catch(error => console.error('Error fetching ramens:', error));
}

function renderRamen(ramen) {
    const ramenImageElement = document.createElement('img');
    ramenImageElement.src = ramen.image;
    ramenImageElement.alt = ramen.name;
    ramenImageElement.addEventListener('click', () => handleClick(ramen));
    ramenMenuDiv.appendChild(ramenImageElement);
}

function handleClick(ramen) {
    ramenDetailImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
}

function addSubmitListener() {
    document.getElementById('new-ramen').addEventListener('submit', newRamenHandler);
}

function newRamenHandler(event) {
    event.preventDefault();

    const newRamen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target['new-comment'].value,
    };

    renderRamen(newRamen);

    event.target.reset();
}

document.addEventListener('DOMContentLoaded', main);
