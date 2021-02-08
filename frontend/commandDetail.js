let getSelectedPlate = JSON.parse(sessionStorage.getItem("votrePanier")) || []
let getMangerIci = JSON.parse(sessionStorage.getItem("mangerIci")) || []
let getPrixTotal = JSON.parse(sessionStorage.getItem("prixTotal")) || []
let place = parseInt(sessionStorage.getItem("place"))
place += 1
sessionStorage.setItem("place", Number(place))

// QR CODE
var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 400,
	height : 400
});

// $("#text").
// 	on("blur", function () {
// 		makeCode();
// 	}).
// 	on("keydown", function (e) {
// 		if (e.keyCode == 13) {
// 			makeCode();
// 		}
// 	});


for(var i = 0; i < getSelectedPlate.length; i++) {
    document.getElementById("commande").innerHTML += `
<div class="card" id="cardDetail">
<div class="card-body">
    <div class="row">
        <div class="col-md">
            <img src="${getSelectedPlate[i].img}">
        </div>
        <div class="col-md d-flex align-items-center justify-content-center">
            <div class="contents">
                <p><strong>name: </strong> ${getSelectedPlate[i].name}</p>
                <p><strong>quantity: </strong> ${getSelectedPlate[i].quantity}</p>
                <p><strong>prix: </strong> ${getSelectedPlate[i].prixTotal} MAD</p>
            </div>
        </div>
    </div>
</div>
</div>
`
}
var ICI = ""
if(getMangerIci) {
    ICI = "OUI"
}
else {
    ICI = "NON"
}

document.getElementById("iciAndPrixTotal").innerHTML += `
<div class="card text-center">
<div class="card-header">
  details paiyement
</div>
<div class="card-body">
  <h5 class="card-title"><strong>prixTotale: </strong>${getPrixTotal} MAD</h5>
  <p class="card-text"><strong>mangerIci: </strong>${ICI}</p>
  <p><strong>palce number: </strong>${place}</p>
  <a href="#" class="btn btn-primary" id="create_pdf">CHEKOUT</a>
</div>
</div>
`
{/* <a href="paypal.html" class="btn btn-primary" onclick="toPdfFile()">CHEKOUT</a> */}

(function () {  
    var  
     form = $('#qrcode'),  
     cache_width = form.width(),  
     a4 = [595.28, 841.89]; // for a4 size paper width and height  

    $('#create_pdf').on('click', function () {  
        $('body').scrollTop(0);
        setTimeout(function(){
            window.location.href = "http://127.0.0.1:8080/paypal.html"
            sessionStorage.removeItem("votrePanier")
            sessionStorage.removeItem("mangerIci")
        }, 2000);
        createPDF();
        getCanvas();
    });  
    //create pdf  
    function createPDF() {  
        getCanvas().then(function (canvas) {  
            var  
             img = canvas.toDataURL("image/png"),  
             doc = new jsPDF({  
                 unit: 'px',  
                 format: 'a4'  
             });  
            doc.addImage(img, 'JPEG', 20, 20);  
            doc.save('pdf.pdf');  
            form.width(cache_width);  
        }); 
    }  

    // create canvas object  
    function getCanvas() {  
        form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');  
        return html2canvas(form, {  
            imageTimeout: 2000,  
            removeContainer: true  
        });
    }
}());


function makeCode () {	
	qrcode.makeCode("manger ic: " + ICI + "\n" + "prix total: " + getPrixTotal + " MAD" + "\n" + "votre place: "+ place);
}
makeCode();

