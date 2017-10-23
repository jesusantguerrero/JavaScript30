const model = {
  cities: [],
  endpoint: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
  
  getData() {
    fetch(this.endpoint)
      .then(res => res.json())
      .then(res => this.cities.push(...res))
  },

  filterCities(text) {
    const value = new RegExp(text,'gi');
    return this.cities.filter(place => (place.city.match(value) || place.state.match(value)) ? place : null)
  }
}

const controller = {
  filterData() {
    const places = model.filterCities(this.value); 
    let html = '';
    places.forEach((place) => html += listView.makeItem(place))
    listView.render(html);
  },

  init() {
   model.getData()
   listView.listenEvent('.search', 'keyup', this.filterData)
  }
} 

const listView = {
  suggestions: document.querySelector('.suggestions'),

  render(html) {
    this.suggestions.innerHTML = html;
  },

  makeItem(place) {
    return `
      <li> 
        <span class="name">${place.city}</span>
        <span class="polulation">${place.population}</span>
      </li>
    `
  },

  listenEvent(elementClass, event, callback) {  
    document.querySelector(elementClass).addEventListener(event,callback)
  },
}

controller.init();