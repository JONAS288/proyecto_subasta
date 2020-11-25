document.addEventListener('DOMContentLoaded', function (event) {
  getCarsAvailable();
});


function getAllRequest() {
  axios.get('http://localhost:3000/api/vehiculos')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
}

function getOne(id) {
  axios.get('http://localhost:3000/api/vehiculosArray/' + id)
    .then(function (res) {
      var dataParent = res.data;
      result = dataParent.reduce((r, o) => r.concat(...Object.values(o)), []);
      var items = result[0].imagenes;
      const myCarouselInner = document.querySelector('#myCarouselInner');
      myCarouselInner.innerHTML = "";
       for (var x = 0; x < items.length; x++) {
         var default_ = ((items[x].principal) ? true : false);
         myCarouselInner.appendChild(createItemCarousel(items[x].descripcion, items[x].ubicacion, items[x].idvehiculos, default_, x));
       }
       const myCarouselIndicators = document.querySelector('#carouselIndicators');
       myCarouselIndicators.innerHTML = "";
      for (var x = 0; x < items.length; x++) {
        var default_ = ((items[x].principal) ? true : false);
        myCarouselIndicators.appendChild(createItemCarouselIndicators(items[x].descripcion, items[x].ubicacion, items[x].idvehiculos, default_, x));
      }

    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {

    });
}

function getCarsAvailable() {

  axios.get('http://localhost:3000/api/vehiculosJsonText')
    .then(function (res) {
      console.log(JSON.stringify(res.data));
      var items = res.data;
      const carouselExample1 = document.querySelector('#carousel1');
      carouselExample1.innerHTML = "";
      for (var x = 0; x < items.length; x++) {
        var default_ = ((items.indexOf(items[x]) === 0) ? true : false);
        carouselExample1.appendChild(createItem(items[x].descripcion, items[x].ubicacion, items[x].idvehiculos, default_));
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {

    });

}

function createItemCarouselIndicators(name, ubication, idvehiculos, first, contador) {
  var carouselitem = document.createElement("li");
  if (first) {
    carouselitem.classList.add("active");
  }
  carouselitem.classList.add("list-inline-item");
  carouselitem.setAttribute("data-slide-to", contador);
  carouselitem.setAttribute("data-target", "#myCarousel");

  var link = document.createElement("a");
  link.setAttribute("id", "carousel-selector-" +contador);
  if (first) {
    link.classList.add("selected");
  }
  
  var imgcars = document.createElement("img");
  imgcars.classList.add("img-fluid");
  imgcars.setAttribute("src", "http://localhost:3000/repocars" + ubication);
  imgcars.setAttribute("height", "80");
  imgcars.setAttribute("width", "60");

  link.appendChild(imgcars);
  carouselitem.appendChild(link);
  return carouselitem;
}



function createItemCarousel(name, ubication, idvehiculos, first, contador) {
  var carouselitem = document.createElement("div");
  if (first) {
    carouselitem.classList.add("active");
  }
  carouselitem.classList.add("item", "carousel-item");
  carouselitem.setAttribute("data-slide-number",contador);
  var imgcars = document.createElement("img");
  imgcars.classList.add("img-fluid");
  imgcars.setAttribute("src", "http://localhost:3000/repocars" + ubication);
  imgcars.setAttribute("height", "1200");
  imgcars.setAttribute("width", "480");
  carouselitem.appendChild(imgcars);
  return carouselitem;
}


function createItem(name, ubication, idvehiculos, first) {
  var carouselitem = document.createElement("div");
  carouselitem.classList.add("carousel-item", "col-md-2");

  if (first) {
    carouselitem.classList.add("active");
  }

  var item = document.createElement("div");
  item.classList.add("card", "mb-3", "shadow-sm", "p-2", "text-center");

  var link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("onclick", "getOne(" + idvehiculos + ")");
  link.classList.add("d-block", "h-100");

  var imgcars = document.createElement("img");
  imgcars.classList.add("img-fluid");
  imgcars.setAttribute("src", "http://localhost:3000/repocars" + ubication);
  imgcars.setAttribute("height", "125");
  imgcars.setAttribute("width", "125");
  link.appendChild(imgcars);

  var cardbody = document.createElement("div");
  cardbody.classList.add("card-body", "p-0", "bg-light");

  var cardsmall = document.createElement("small");
  cardsmall.classList.add("card-text");
  cardsmall.appendChild(document.createTextNode(name));
  cardbody.appendChild(cardsmall);

  item.appendChild(link);
  item.appendChild(cardbody);
  carouselitem.appendChild(item);

  return carouselitem;
}
