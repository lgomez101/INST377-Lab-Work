
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector(".restaurant_list")
    target.innerHTML = " ";
    list.forEach(item => {
      target.innerHTML += `<li>${item.name} </li>`
    })
  }
  
  function filterList(list, query) {
    
    return list.filter((item) => {
      const lowerName = item.name.toLowerCase();
      const lowerQuery = query.toLowerCase();
      return lowerName.includes(lowerQuery)
    })
  }
  
  function cutResList(list) {
    console.log('Fired Cut List');
    const range = [...Array(15).keys()];
    return newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length - 1);
      return list[index]
    })
  
  }
  

  function initMap(){
    const carto = L.map('map').setView([38.9897, -76.9378], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(carto);
return carto
  }

  function markerPlace(array, map) {
    console.log('array for markers', array);

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    array.forEach((item) => {
      console.log('markerPlace', item);
      const {coordinates} = item.geocoded_column_1;

      L.marker([coordinates[1], coordinates[0]]).addTo(map);
    })
  }
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const DataLoad = document.querySelector('#DataLoad')
    const DataClear = document.querySelector('#dataClear')
    const generateList = document.querySelector('#generateList')
    const textField = document.querySelector('#resto')
    generateList.classList.add('hidden')
    const loadAnim = document.querySelector('#loadAnim')
    
   const carto = initMap();
    
    const storedData = localStorage.getItem('StoredData');
    let parsedData = JSON.parse(storedData);
    
    if (parsedData?.length > 0) {
      generateList.classList.remove('hidden')
    }
    
    
    
    DataLoad.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      loadAnim.style.display = 'inline-block'
      
      
      console.log('Loading Data'); 
  
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      const storeList = await results.json();
      localStorage.setItem('StoredData', JSON.stringify(storeList))

      parsedData = storeList
      if (parsedData?.length > 0) {
        generateList.classList.remove('hidden')
      }
      loadAnim.style.display = 'none';
      
      console.table(storeList); 
    });
  
  
  
    generateList.addEventListener('click', (event) => {
      console.log('Generated New List');
      curList = cutResList(parsedData);
      console.log(curList);
      injectHTML(curList);
      markerPlace(curList, carto);
    });

    textField.addEventListener('input', (event) => {
      console.log('input', event.target.value);
      const newList = filterList(parsedData, event.target.value);
      console.log(newList)
      injectHTML(newList)
      markerPlace(newList, carto);
    });

    DataClear.addEventListener('click', (event) => {
      console.log('cleared');
      localStorage.clear()
      console.log('localstorage check', localStorage.getItem("storedData"))
        });


    /*
      Now that you HAVE a list loaded, write an event listener set to your filter button
      it should use the 'new FormData(target-form)' method to read the contents of your main form
      and the Object.fromEntries() method to convert that data to an object we can work with
  
      When you have the contents of the form, use the placeholder at line 7
      to write a list filter
  
      Fire it here and filter for the word "pizza"
      you should get approximately 46 results
    */
  }
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests