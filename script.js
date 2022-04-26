let list = [];
let deliveryList = []

function takeProductsList(){
  let ajax = new XMLHttpRequest();
  ajax.open("GET", "products.json");
  ajax.send();

  ajax.onload = function (){
    list =  JSON.parse(this.response);
    console.log(list)

    clone();
  }
}

function clone(){
  let i = 0;

  for (const p of list) {
    let id = i;
    //Clone
    let product = document.querySelector(".product").cloneNode(true);

    //Modify informations
    product.querySelector(".title").innerHTML = p.name;
    product.querySelector(".price").innerHTML = p.price;
    product.querySelector("img").src = p.img;

    //Add elements to cart
    product.querySelector(".plus").addEventListener("click", function(){
    // id - to know qhat element it is
    changeQt(id, 1)
    });
    product.querySelector(".less").addEventListener("click", function(){changeQt(id, -1)});
    
    document.querySelector(".list").append(product);

    //increment
    i++;
    
  }

  document.querySelector(".product").remove();
  
}

function changeQt(id, qt){
  let p =  list[id];
  //Change qt 
  p.qt += qt;
  
  
  document.getElementsByClassName("qt")[id].innerHTML = p.qt;

  // let check = deliveryList.includes(list[id])
  // if (check == true){

  //   console.log(deliveryList)

  // }else{
  //   deliveryList.push(list[id]);
  // }

}

let modalMsg = "";

function showOnDelivery(){
  document.getElementById('id01').style.display='block';
  let subTotal = 0;
  let total = 0;

  for (const product of list){
    if(product.qt > 0){
      subTotal = (product.price * product.qt).toFixed(2)
      total += +subTotal;
      
      modalMsg += `<p>${product.name} (R$ ${product.price} X ${product.qt}) = ${subTotal}\n</p>`

      console.log(product)

    }
  }

  if (modalMsg == ""){
    modalMsg = `<p>Nenhum produto selecionado</p>`
    document.querySelector("send").disabled = disabled;

  }else {
    modalMsg += `<b>Total = ${total}</b>`
    document.querySelector("#send").disabled = "";
  }

  //Inserting content inside the modal
  document.querySelector(".modal-body").innerHTML = modalMsg;
 
}

function send(){
  let fone = '556191793777';
  let name = document.querySelector("#name").value;
  let location = document.querySelector("#location").value;

  modalMsg += `\n \nOlá, *${name}!* Seu pedido feito na LatteLine☝️🔝\n`;
  modalMsg += `*Endereço de entrega:* ${location}\n`;

  modalMsg = modalMsg.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "");
  modalMsg = modalMsg.replaceAll("<b>", "*").replaceAll("</b>", "*")

  modalMsg = encodeURI(modalMsg);

  link = `https://api.whatsapp.com/send?phone=${fone}&text=${modalMsg}`;
  window.open(link, "_blank")

}

takeProductsList();
