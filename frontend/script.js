// const getUsers = () => {
//   axios.get('http://localhost:3000/')
//   .then(response => {
//   //  const users = response.data.data;
//    console.log(`GET users`, response.data);
//  })
//   .catch(error => console.error(error));
//  };
//  getUsers();

const BASE_URL = 'http://localhost:3000/';

const BASE_URL_MIX = 'http://localhost:3000/MIX';
const BASE_URL_SANDWICH = 'http://localhost:3000/NOS-SANDWICHS';
const BASE_URL_SALADE = 'http://localhost:3000/SALADE';
const BASE_URL_BOISSON = 'http://localhost:3000/BOISSONS';

const BASE_URL_SELECTED = 'http://localhost:3000/SELECTED';
//all
const getPlats = async () => {
  try {
    const res = await axios.get(`${BASE_URL}`);

    const plats = res.data;

    for(var i = 0; i < plats.length; i++) {
      document.getElementById('all').innerHTML += `<li class='text-center'><img src='${plats[i].img}'> <br> <a href="http://127.0.0.1:8080/selected.html?productNum=${plats[i].num}">${plats[i].name}</a></li>`
    }
    return plats;
  } catch (e) {
    console.error(e);
  }
};

//mix
const getPlats2 = async () => {
  try {
    const res = await axios.get(`${BASE_URL_MIX}`);

    const plats = res.data;

    for(var i = 0; i < plats.length; i++) {
      document.getElementById('mix').innerHTML += `<li class='text-center'><img src='${plats[i].img}'> <br> <a href="http://127.0.0.1:8080/selected.html?productNum=${plats[i].num}">${plats[i].name}</a></li>`
    }
    return plats;
  } catch (e) {
    console.error(e);
  }
};

// sandwich
const getPlats3 = async () => {
  try {
    const res = await axios.get(`${BASE_URL_SANDWICH}`);

    const plats = res.data;

    for(var i = 0; i < plats.length; i++) {
      document.getElementById('sandwich').innerHTML += `<li class='text-center'><img src='${plats[i].img}'> <br> <a href="http://127.0.0.1:8080/selected.html?productNum=${plats[i].num}">${plats[i].name}</a></li>`
    }
    return plats;
  } catch (e) {
    console.error(e);
  }
};

// salade
const getPlats4 = async () => {
  try {
    const res = await axios.get(`${BASE_URL_SALADE}`);

    const plats = res.data;

    for(var i = 0; i < plats.length; i++) {
      document.getElementById('salade').innerHTML += `<li class='text-center'><img src='${plats[i].img}'> <br> <a href="http://127.0.0.1:8080/selected.html?productNum=${plats[i].num}">${plats[i].name}</a></li>`
    }
    return plats;
  } catch (e) {
    console.error(e);
  }
};

// boisson
const getPlats5 = async () => {
  try {
    const res = await axios.get(`${BASE_URL_BOISSON}`);

    const plats = res.data;

    for(var i = 0; i < plats.length; i++) {
      document.getElementById('boisson').innerHTML += `<li class='text-center'><img src='${plats[i].img}'> <br> <a href="http://127.0.0.1:8080/selected.html?productNum=${plats[i].num}">${plats[i].name}</a></li>`
    }
    return plats;
  } catch (e) {
    console.error(e);
  }
};

// selected
const getPlats6 = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productNum');

    const res = await axios.get(`${BASE_URL_SELECTED}/${myParam}`);

    const plats = res.data;

    for(var i = 0; i < plats.length; i++) {
      document.getElementById('selected').innerHTML += `<img src='${plats[i].img}'> <button type="button" class="btn btn-danger" onclick="addToCard('${plats[i].name}', ${plats[i].prix}, '${plats[i].img}')">COMMANDER</button>`
    }
    return plats;
  } catch (e) {
    console.error(e);
  }
};

// let obj = { fn: 'Nanduds', ln: 'Singh' };
// localStorage.setItem("session", JSON.stringify(obj));

function addToCard(name, prix, img) {
  let oldIteamsCards = JSON.parse(sessionStorage.getItem("votrePanier")) || [];
  let newIteamsCards = {name: name, prix: prix, img: img, quantity: 1, prixTotal: prix}

  let iteamIsExist = oldIteamsCards.find(element => element.name == name)
  if(iteamIsExist) {
    alert("this iteam is already added to card")
    location.reload()
  }
  else {
    oldIteamsCards.push(newIteamsCards)
    sessionStorage.setItem("votrePanier", JSON.stringify(oldIteamsCards))

    let place = parseInt(sessionStorage.getItem("place"))
    if(place) {
      sessionStorage.setItem("place", place)
    }
    else {
      sessionStorage.setItem("place", 1)
    }

    alert("product added to card")
    location.reload()
  }
  // for(i = 0; i < oldIteamsCards.length; i++) {
  //   console.log(oldIteamsCards[i].name)
  // }
}

getPlats()
getPlats2()
getPlats3()
getPlats4()
getPlats5()
getPlats6()
