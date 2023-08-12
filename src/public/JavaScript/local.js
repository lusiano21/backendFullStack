(function() {
  const usuarios = document.getElementById('main')
  const page = document.getElementById('page')
  let site = '/api'
  fetch(site)
  .then(res => res.json())
  .then(data => {
    data.payload.forEach(element => {
      let business = document.createElement("article");
      business.className = "card";
      let businessName = document.createElement("h2");
      businessName.innerHTML= `${element.name}`;
      let card = document.createElement("div");
      card.className = "card"; 
      for(const product of element.products){
        let menu = document.createElement("h3");
        menu.innerHTML= `Menu ${product.id}:`;
        let name_product = document.createElement("h4");
        name_product.innerHTML=`${product.name}`
        let price_product = document.createElement("h4");
        price_product.innerHTML=`Precio: $${product.price}`

        card.append(menu);
        card.append(name_product);
        card.append(price_product)
      }
      business.append(businessName)
      business.append(card)
      usuarios.append(business)
    });
  })

})();