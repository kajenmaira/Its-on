/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 1) USEFULL STUFF  
 */

    // - - - DOM ELEMENTS - - -
        // The city select element that triggers the event
        const citySelectorInput = document.querySelector('.citySelector__input');

        // The temperature element
        const wind = document.querySelector('.weatherDisplay__wind');


        // The city name
        const city = document.querySelector('.weatherDisplay__city');

    


    // - - - API VARIABLES - - - 

        // The URL used for the API call (example of full URL: https://vejr.eu/api.php?location=Sonderborg&degree=C)
        const apiBaseUrl = 'https://vejr.eu/api.php';

        // The location option, setting the city to get weather data for
        let apiLocation = 'Klitmøller';

        // The degree option, setting the temperature scale to use
        let apiDegree = 'c';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 2) RUN ON LOAD  
 */

loadData();

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 3) EVENTLISTENERS  
 */

    citySelectorInput.addEventListener('change', changeCity);



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 4) FUNCTIONS  
 */

    // Change the selected city, when user selects a new city
    function changeCity() {
        console.log('Change the city from', apiLocation);
        // update to the newly selected location
        apiLocation = citySelectorInput.value;
        
        console.log('to', apiLocation);
        loadData();
    }


    // Loads the data from the API (Notice: Magic is happening here!)
    function loadData() {
        let url = generateApiFullString();
        console.log('Calling the API with the following URL:',url);
        fetch(url)
            .then(response => response.json())
            .then(data => updateHtml(data));
    }

const maincard = document.querySelector(".maincard");

    function updateHtml(data) {
        console.log('received the following data:',data);

        // update name of the city with the currently selected one
        city.textContent = data.LocationName;
        // Først hent data fra vejr api, er gemt i variablen data
        let windDataString = data.CurrentData.windText;
         // f.ek.s "4 m/s Vest"
         // Split string til et array, split på mellemrum " "
        let windDataArray = windDataString.split(" "); 
        // Konverter første del af array fra string til tal, f.eks. "4" til 4
        let currentWind = parseInt(windDataArray[0]);
        // Nu kan wind bruges til comparison, f.eks. wind>20
        // update the temperature
        

        maincard.classList.remove("change");

        if (currentWind > 10) {
            maincard.classList.add("change");
            maincard.innerHTML = `<h2 class="maincard__firsttext">
            IT'S ON!
        </h2>
        <p class="maincard__secondtext">  
            - Take your board - <br>
            - leave work - <br>
            - go surf! - 
        </p>
        <button class="forecast-btn">Forecast</button>`
        } 
        else if (currentWind < 10) {
            maincard.classList.add("change");
            maincard.innerHTML = `<h2 class="maincard__secondtext">
            IT'S NEVER OFF!
        </h2>
        <p class="maincard__secondtext">  
            .. BUT today <br>
            it's on  <br>
            somewhere else. 
        </p>
        <button class="forecast-btn">Forecast</button>`
        }
        /*else {
            maincard.classList.remove("change");
        }*/
    }


    // Returns the full API URL string to send the GET request with
    function generateApiFullString() {
        return apiBaseUrl + "?location=" + apiLocation + "&degree=" + apiDegree;
    }






// The citySelector <section> enabling the user to select a city
const citySelectorSection = document.querySelector('.citySelector');

// The weatherDisplay <section> that displays the weather data for the chosen city
const weatherDisplaySection = document.querySelector('.weatherDisplay');
