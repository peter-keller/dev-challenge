const productSelection = document.getElementsByName("supplierName")[0];

const fields = document.querySelectorAll("select");

fields.forEach(function(elem) {
  elem.addEventListener("change", function() {
    fetch(
      "http://127.0.0.1:8000/items?supplierName=" +
        fields[0].value +
        "&productName=" +
        fields[1].value
    )
      .then(resp => resp.json())
      .then(function(data) {
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        data.forEach(function(element, index) {
          let listData =
            "<tr><td>" +
            (index += 1) +
            "</td><td>" +
            element.supplierName +
            "</td><td>" +
            element.productName +
            "</td><td>" +
            element.price +
            "</td></tr>";
          tbody.innerHTML += listData;
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});
