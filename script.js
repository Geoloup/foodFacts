function request(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false); // Set the third parameter to false for synchronous request
  
    try {
      xhr.send();
      if (xhr.status === 200) {
        const text = xhr.responseText;
        return text;
      } else {
        console.error("Error:", xhr.status, xhr.statusText);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
  var lastid = "";
  function loadInfo(id) {
    console.log(lastid,id)
    if (lastid == id) {
      return;
    } else {
      var lastid = id;
    }
    var information = request(
      "https://world.openfoodfacts.org/api/v*/product/" + id
    );
    var information = JSON.parse(information);
    document.getElementById(
      "result"
    ).innerHTML = 'Ingredients : ' + information.product.ingredients_text.replaceAll("*", "");
  console.log(information) 
    document.getElementById("quantity").innerHTML = ' Quantité ' + information.product.quantity;
    document.getElementById("trace").innerHTML = 'Ingredient avec un risque d' + "'" + 'allergie : ' + information.product.allergens.replaceAll('en:','');
    document.getElementById("scoreIMG").src =
      "https://static.openfoodfacts.org/images/attributes/dist/nutriscore-" +
      information.product.nutriscore["2023"].grade +
      "-new-en.svg";
  }
  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    loadInfo(decodedText)
  }
  
  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
  }
  
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 15, qrbox: { width: 310, height: 300 } },
    /* verbose= */ false
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);