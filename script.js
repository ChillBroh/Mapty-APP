'use strict';
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//check wheter location available
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      //add a marker with a detials in the map usin leaflet
      var map = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      //create a new pin on map every setting up of wokout schedule
      map.on('click', function (clickEvent) {
        const { lat, lng } = clickEvent.latlng;

        L.marker([lat, lng]).addTo(map).bindPopup('Workout').openPopup();
      });
    },
    //set default value if the getting location falils
    function () {
      alert("Couldn't get your current position");
    }
  );
}
