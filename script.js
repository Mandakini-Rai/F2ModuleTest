let menu = [];
let abc = document.getElementById("one");
let constMenu = [];

// get menu on load
async function getMenu() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    const data = await response.json();
    console.log("Menu" ,data);
    constMenu = data;
    return data;
  } catch (error) {
    console.log("Menu not found");
  }
}

//  displaying the menu to user
async function displaydata(data) {
  menu = data;

  abc.innerHTML = "";
  document.getElementById("menu").innerHTML = "Menu";
  menu.map((item) => {
    abc.insertAdjacentHTML(
      "beforeend",
      `<tr>
         <td >${item.id}</td>
         <td class="name">${item.name}</td>
         <td>${item.price}</td>
         <td><img src="${item.imgSrc}"></td>
         
 
       
        </tr>`
    );
  });
  return data;
}

//  Promise chaining
getMenu()
  .then((data) => {
    return displaydata(data); //calling the function to display menu
  })
  .then((data) => {
    return takeOrder(data); //callback function to take order
  })
  .then((obj) => {
    console.log("Order:" ,obj);
    return orderPrep(); //calling orderPrep API to update the status of the order
  })
  .then((value) => {
    console.log("Order Status" ,value);
    return payOrder(); // calling to update the status of payment
  })
  .then((value) => {
    console.log("Payment Status" ,value);
    console.log("Order Placed Successfully");
    thankyouFnc(); // showing sweet gesture to customer
  })
  .catch((e) => {
    console.log(e); // handling errors
  });

//  function to place random order of three items
async function takeOrder(data) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
        
      let obj = {"burger":[]};
      for (let i = 0; i < 3; i++) {
        let y = Math.floor(Math.random() * 25) + 1;
        obj.burger[i] = data[y];
      }
      if (obj.burger.length == 0) reject("No item selected");
      resolve(obj);
    }, 2500);
  });
}

// placing order and returning status of order
async function orderPrep() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      orderupdate = {
        order_status: true,
        paid: false,
      };

      resolve(orderupdate);
    }, 1500);
  });
}

// updating payment status
async function payOrder() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      orderupdate = {
        order_status: true,
        paid: true,
      };
      if (!orderupdate.paid) reject("Payment Not Done");
      resolve(orderupdate);
    }, 1000);
  });
}

//   showing thankfulness
function thankyouFnc() {
  alert("thankyou for eating with us today!");
}
