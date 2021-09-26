const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const movieSelect = document.getElementById('movie');
const count =  document.getElementById('count');
const total = document.getElementById('total');
let ticketPrice = +movieSelect.value;  //intially movieSelect.value returns string
populateUI();
updateSelectedCount();

//fill the selected seats when page is loaded by getting data from local storage
function populateUI()
{
   selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
   //when tab is reloaded since these seats  donot have a class selected we need to add class selected
   // to the seats in local storage ..such that they now displayed as selected seats
   if(selectedSeats!==null && selectedSeats.length>0)
   {
        seats.forEach((seat,index) => {
          if(selectedSeats.indexOf(index)> -1) //when the element is not in array it returns -1 as result
          {
              seat.classList.add('selected');
          }
        })
   }
   

}

//save movie index and price to local storage
function saveMovieData(movieIndex , moviePrice)
{
    localStorage.setItem("movieIndex",movieIndex);
    localStorage.setItem("moviePrice",moviePrice);
}

//updating seats selected
function updateSelectedCount()
{
    const selectedSeats  = document.querySelectorAll('.row .seat.selected'); 
   
    //to preserve the index of present selected seats
   const seatsIndex =[...selectedSeats].map(seat => [...seats].indexOf(seat));
   //takes node list of selected seats ....for every seat..it find its original index from 'seats' where 
   //all seats are there....this way it finds index for every selected seat 
   //and stores in an array and return the array to the seatsIndex 
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

//movie select event listener ....changes prices according to movie selected
movieSelect.addEventListener('change', e =>{ //change is used because there is a select option
     ticketPrice = +e.target.value;
     saveMovieData(e.target.selectedIndex,e.target.value);
     updateSelectedCount();
})

//seat click event listener
container.addEventListener('click', (e) =>{
    if( e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
    })








