let cardItems = JSON.parse(sessionStorage.getItem("votrePanier")) || []
for(var i = 0; i < cardItems.length; i++) {
  document.getElementById("myCard").innerHTML += `
  <div class="align-items-center card d-flex justify-content-center m-5">
    <img src="${cardItems[i].img}" class="card-img-top w-75 h-50" alt="...">
    <div class="card-body">
      <p class="card-text">${cardItems[i].name}</p>
      <p class="card-text">${cardItems[i].prixTotal} MAD</p>
      <p class="card-text"><strong>quantity: </strong> ${cardItems[i].quantity}</p>
      <i class="fas fa-trash-alt fa-2x" style='color: red; cursor: pointer' onclick="deleteItems('${cardItems[i].name}')"></i>
      <i class="far fa-edit fa-2x" style='color: yellow; cursor: pointer' onclick="modifyQuantity('${cardItems[i].name}')"></i>
    </div>
  </div>
  `
}

var total = 0
cardItems.map(x => total += x.prixTotal)
console.log(total)

document.getElementById("prixTotal").innerText = total + " MAD"

function codePromo() {
    let codeVal = document.getElementById("codeNumber").value;
    const codepromo = "TERMINATED"

    if(codepromo == codeVal) {
        porcentage = total*0.25
        total = total - porcentage
        document.getElementById("prixTotal").innerText = total + " MAD"
        document.getElementById("codeNumber").style.display = "none"
        document.getElementById("apliquerCodeP").style.display = "none"
        document.getElementById("CodeAppliquer").innerText = "votre code de promo est appliquer"
        alert("promotion est appliquer")
    }
    else {
        alert("invalide code promo")
    }
}

  function deleteItems (name) {
    var filtred = cardItems.filter(function(el) {return el.name != name})
    sessionStorage.removeItem("votrePanier")
    sessionStorage.setItem("votrePanier", JSON.stringify(filtred))
    alert("product removed from card")
    location.reload()
  }

    function modifyQuantity (name) {
        var quantity = prompt(`please enter the quatity of ${name}`, "quantity");
        if(isNaN(quantity)) {
            while(isNaN(quantity)) {
                quantity = prompt(`please enter the quatity of ${name}`, "quantity");
            }
        }
        else {
            let modifyQuan = JSON.parse(sessionStorage.getItem("votrePanier")) || []
            let filtred = modifyQuan.filter(function(el) {return el.name == name})
            
            let prix = filtred[0].prix
            let img = filtred[0].img
            let prixTotal = Number(prix) * Number(quantity)

            let filtredTwo = modifyQuan.filter(function(el) {return el.name != name})
            let newIteamsCards = {name: name, prix: prix, img: img, quantity: Number(quantity), prixTotal: Number(prixTotal)}

            filtredTwo.push(newIteamsCards)

            sessionStorage.removeItem("votrePanier")
            sessionStorage.setItem("votrePanier", JSON.stringify(filtredTwo))
            console.log(filtredTwo)
            location.reload()
        }
    }

    function mangerIci(rep) {
        sessionStorage.setItem("mangerIci", rep)
        sessionStorage.setItem("prixTotal", total)
        window.location.href = "http://127.0.0.1:8080/commandDetail.html"
    }