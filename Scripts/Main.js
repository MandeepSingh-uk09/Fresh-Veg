/* ------------------------------------------------------------------------------------------------------- */

            /* ****************************************************** */

                    /* DOM manipulation
                        -> NAV DOM manipulation
                        -> USER DOM manipulation
                        -> Main DOM manipulation */

                    /* APIs ( Fetch Data ) */

            /* ****************************************************** */

                    /* 1 Setting Up Variables 
                            1.a -> User
                            1.b -> pinCode
                            1.c -> price
                            1.d -> itemDisplay
                    */
                    /* 2 checking for previous data stored by getData() */

                    /* 3 Setting up temp Summary for summary  items
                            3.a -> summary
                            3.b -> tempSummary
                            3.c -> tempSummaryData()
                    */
                    /* 4 Setting up Item weight 
                            4.a -> totalWT
                            4.b -> CartVegID
                            4.c -> itemWeight(WT,ID)
                    */
                    /* 5 Adding item to the summary */

                    /* 6 Cart Functioning 
                            6.a -> clearCart()
                            6.b -> goToCart()
                    */
                    /* 7 Summary button for screen <700px 
                            7.a -> btnToggle
                            7.b -> maxWidthToggle
                            7.c -> summaryBtn()
                            7.d -> windowWidth()
                    */
                    /* 8 User ( password ) DOM manipulation 
                            8.a -> function resetPass()
                            8.b -> function changePass()
                    */
                    /* 9 User ( Address ) DOM manipulation 
                            9.a -> function editAddress()
                            9.b -> function saveAddress()
                    */
                    /* 10 Logout */

            /* ****************************************************** */

                    /* Setting Up page 
                    A Checking for any error else loading the data 
                        -> settingUpPage()
                    B Checking for the change in the width of view port */

/* ------------------------------------------------------------------------------------------------------ */

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

                        /* ------------------------------------------------------------- */
                                            /* DOM manipulation */
                        /* ------------------------------------------------------------- */

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

/* ----------------------------------------------------------------------------------------------------- */
                                            /* NAV DOM manipulation */
/* ----------------------------------------------------------------------------------------------------- */

/* Setting Up nav bar for the user by displaing their deatils */
function gettingUser() {
    User = JSON.parse(localStorage.getItem("USER"));
    pinCode = User.Pin_Code;

    const userLoction = document.getElementById("Location");
    userLoction.style.visibility = 'visible';
    userLoction.innerHTML = `<h6>Delivery To : ${User.Name}</h6><h4>${User.Pin_Code}- ${User.Area}</h4>`;
}


/* ----------------------------------------------------------------------------------------------------- */
                                        /* USER DOM manipulation */
/* ----------------------------------------------------------------------------------------------------- */

/* USER CARD preview */
function usercard(option) {
    const user =
        `<div class="userLottie">
                        <lottie-player 
                            src="Images/Lottie/User.json" 
                            background="transparent" 
                            speed="0.5" 
                            style="width: 100%; height: 100%" 
                            direction="1" 
                            mode="normal" 
                            autoplay
                            >

                        </lottie-player>
                    </div>
                    <p>Hello Veggies!!</p>
                    <p id="passwordMsg"></p>
                    <div class="userDetails">
                        <h2>${User.Name}</h2>
                        <h4>${User.Email}</h4>
                    </div>
                    <button id="ResetPass" onclick="resetPass()" type="submit">RESET PASSWORD</button>`

    const address =
        `<div class="Address-Card">
                        <div>
                            <div class="Address">                    
                                <h4>Delivery To:-</h4>
                                <div class="User-details">
                                    <h3>${User.Name}</h3>
                                    <div>
                                        <h6>${User.Mobile_No}</h6>
                                        <h6>${User.Email}</h6>
                                    </div>                        
                                </div>
                                                   
                            </div>
                            <div class="User-address">
                                <h5>${User.House_No}, ${User.Area}</h5>
                                <sub>${User.City}, ${User.State} <br>${User.Pin_Code}</sub>
                            </div>
                        </div>                             
                        <button onclick="editAddress()">EDIT ADDRESS</button>           
                    </div>`;

    const orders =
        `<div class="commingSoon" >
                        <div>
                            <lottie-player 
                                src="Images/Lottie/commingSoon.json" 
                                background="transparent" 
                                speed="0.8" 
                                style="width: 100%; height: 100%" 
                                direction="1" 
                                mode="normal" 
                                autoplay
                                loop
                                >
                            </lottie-player>
                        </div>   
                        <h1>COMMING SOON</h1>                        
                    </div>`

    switch (option) {
        case 'User':
            document.querySelector('.optionView').innerHTML = user;
            break;
        case 'Address':
            document.querySelector('.optionView').innerHTML = address;
            break;
        case 'Orders':
            document.querySelector('.optionView').innerHTML = orders;
            break;
    }
}

/* User Account button toggle */
let userToggle = false;
function aboutUser() {
    if (userToggle === false) {
        userToggle = true;
        document.querySelector('.userAcc').style.display = "block";
        document.getElementById('mainContent').style.display = "none";
        usercard('User');
    }
    else {
        /* reloading page if pincode is get changed */
        if(pinCodeChange === true){  
            location.reload();
        };
        userToggle = false;
        document.getElementById('mainContent').style.display = "block";
        document.querySelector('.userAcc').style.display = "none";
    }
}


/* ----------------------------------------------------------------------------------------------------- */
                                        /* Main DOM manipulation */
/* ----------------------------------------------------------------------------------------------------- */

/* Summary DOM manipulation */
function summaryDOM() {
    let summaryDOM = '';
    let totalWeight = 0;
    summary.forEach((element, index) => {
        summaryDOM +=
            `<div class="Cart">                             
                        <div class="Cart-Item"><h4>${index + 1}. ${element.Name}</h4></div>
                        <div class="Cart-Item-Qty"> ${element.Weight}g</div>
                    </div>`;
        totalWeight += Number(element.Weight);
    })
    document.querySelector('.Items-In-Cart').innerHTML = summaryDOM;
    totalWeight = totalWeight / 1000;
    document.querySelector('.totalWtDOM').innerHTML = `${totalWeight} Kg`;
}

/* Content (Items Card) Dom manipulation */
function displayItem() {
    let displayItemDom = '';
    itemDisplay.forEach((element, index) => {
        displayItemDom +=
            `<div class="Card">
                        <img src="Images/vegetable/${element.vegID}.jpg" alt="${element.vegName}">
                        <div class="Item-name">
                            <h3>${element.vegName}</h3>
                            <h4>₹${price[index].Price}/kg</h4>                    
                        </div>                
                        <div class="Item-Qty">
                            <button onclick="itemWeight(250,${element.vegID})">250g</button>
                            <button onclick="itemWeight(500,${element.vegID})">500g</button>
                            <button onclick="itemWeight(1000,${element.vegID})">1kg</button>
                        </div>
                        <button onclick="addItem(${(element.vegID) - 1})">Add</button>
                    </div>`
    });

    document.querySelector('.Content').innerHTML = displayItemDom;
    summaryDOM()
}

/* ----------------------------------------------------------------------------------------------------- */
                                            /* APIs ( Fetch Data ) */
/* ----------------------------------------------------------------------------------------------------- */

/* Loading Data when it is fetched from APIs */
function loadingDone() {
    document.getElementById('loader').remove();
    document.getElementById('main').style.display = "flex";
    windowWidth();
    displayItem();
}

/* fetching data from APIs */
async function getData() {
    try {
        const vegDetail = await fetch("https://mandeepsingh2101700.github.io/JSONapi/vegDetail.json");        
        const pinCodeDetail = await fetch("https://mandeepsingh2101700.github.io/JSONapi/pincodes.json");
        const priceDetail = await fetch("https://mandeepsingh2101700.github.io/JSONapi/Price.json");

        console.log(vegDetail.status, vegDetail.ok, pinCodeDetail.status, pinCodeDetail.ok, priceDetail.status, priceDetail.ok);


        const items = await vegDetail.json();
        const pinCodeItem = await pinCodeDetail.json();
        const ID = pinCodeItem[pinCode];
        const priceItem = await priceDetail.json();

        price = priceItem[ID].data;
        itemDisplay = items;

        localStorage.setItem("price", JSON.stringify(price));
        localStorage.setItem("itemDisplay", JSON.stringify(itemDisplay));

        loadingDone();
    }
    catch (error) {
        document.getElementById('loader').innerHTML=
        `<div class="error" style="display:block">
            <lottie-player 
                src="Images/Lottie/ERROR.json" 
                background="transparent" 
                speed="1.3" 
                style="width: 100%; height: 100%" 
                direction="1" 
                mode="normal" 
                autoplay
                loop
            >
        </div>

        <div class="errorMSG" style="display:block">
            <h2>PLEASE CHECK YOUR ADDRESS (PinCODE)</h2>
            <h4>Or <span id="logoutSpan" onclick="goToLogin()">Logout</span> and SignUP Again</h4>
        </div>
        `;
    }
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

                        /* ------------------------------------------------------- */
                                        /* 1 Setting Up Variables */
                        /* ------------------------------------------------------- */

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

/* 1.a Declaring Variable for setting up the User and price according too the location */
let User;

/* 1.b settng up pincode in order to get price of the particular code */
let pinCode;

/* Setting up price and item data if it already fetched by Function -> getData() \
else Null and call getData for assigning vale */

/* 1.c */
let price = JSON.parse(localStorage.getItem("price")) || null;

/* 1.d */
let itemDisplay = JSON.parse(localStorage.getItem("itemDisplay")) || null;

/* 1.e Checking if picode is changed by user And updating the details according to it */
let pinCodeChange= false;

/* ----------------------------------------------------------------------------------------------------- */
                                /* 2 checking for previous data stored by getData() */
/* ----------------------------------------------------------------------------------------------------- */

function getApiData() {
    if (price && itemDisplay) {
        loadingDone();
    }
    else {
        getData();
    }
}

/* ----------------------------------------------------------------------------------------------------- */
                                /* 3 Setting up temp Summary for summary  items*/
/* ----------------------------------------------------------------------------------------------------- */

/* 3.a Setting up summary if previosly items are there in the cart or else null if not */
let summary = JSON.parse(localStorage.getItem("summary")) || [];

/* 3.b temp Summary keep the records of summary items for updating purpose by taking reference from summary */
let tempSummary = {};

/* 3.c Setting up temp Summary */
function tempSummaryData() {
    summary.forEach(element => {
        tempSummary[element.vegID] = element;
    });
}

/* ----------------------------------------------------------------------------------------------------- */
                                            /* 4 Setting up Item weight */
/* ----------------------------------------------------------------------------------------------------- */

/* 4.a Total weight of particular item || vegID */
let totalWT = 0;

/* 4.b Which card or vegetable or vegId is selected for tracking their selected weight */
let CartVegID;

/* 4.c Keep track of the weight of selected Card */
function itemWeight(WT, ID) {
    if (CartVegID === ID) {
        totalWT += WT;
    }
    else {
        CartVegID = ID;
        totalWT = 0;
        totalWT += WT;
    }
}

/* ----------------------------------------------------------------------------------------------------- */
                                        /* 5 Adding item to the summary */
/* ----------------------------------------------------------------------------------------------------- */

function addItem(ID) {

    /* checking if the added item is of same vegID in ( 3 ) if not assign total weight to 0 */
    /* using 3.b */
    if ((ID + 1) !== CartVegID) totalWT = 0;

    const tempID = '' + (ID + 1);

    /* checking if the vegId is present in temp Summary */
    if (tempSummary[tempID] === undefined) {
        if (totalWT === 0) totalWT = 250;

        let summaryObject = {
            vegID: null,
            Name: '',
            Price: null,
            Weight: null
        }

        summaryObject.vegID = itemDisplay[ID].vegID;
        summaryObject.Name = itemDisplay[ID].vegName;
        summaryObject.Price = price[ID].Price;
        summaryObject.Weight = totalWT;

        /* adding new vegID in temp summary with details */
        tempSummary[tempID] = summaryObject;

        /* pushing new item to the summary list(array) */
        summary.push(summaryObject);


    }
    else {
        if (totalWT === 0) totalWT = 250;

        /* Updating vegID weight in temp summary */
        tempSummary[tempID].Weight += totalWT;
    }

    /* Setting up values to selected item to null, 3.a & 3.b*/
    totalWT = 0;
    CartVegID = null;
    
    /* storing summary item in the localstorage so it will not get lost on page reloading */
    localStorage.setItem('summary', JSON.stringify(summary));

    /* Displaying itemn in the Summary Card preview */
    summaryDOM();
}

/* ----------------------------------------------------------------------------------------------------- */
                                            /*6 Cart Functioning */
/* ----------------------------------------------------------------------------------------------------- */

/* 6.a Clear Cart item */
function clearCart() {
    tempSummary = {};
    summary = [];
    localStorage.removeItem("summary");
    summaryDOM();
}

/* 6.b Go to Cart.html */
function goToCart() {
    localStorage.setItem('summary', JSON.stringify(summary));
    window.open(`./Cart.html`, `_self`);
}

/* ----------------------------------------------------------------------------------------------------- */
                                    /*7 Summary button for screen <700px */
/* ----------------------------------------------------------------------------------------------------- */

/* 7.a Summary button toggle state*/
let btnToggle = false;

/* 7.b Check if inner width is smaller then 700px */
let maxWidthToggle = false;

/* 7.c Summary button toggle function */
function summaryBtn() {
    if (btnToggle === false) {
        btnToggle = true;
        document.querySelector('.Selected-Items').style.display = 'block';
    }
    else {
        btnToggle = false;
        document.querySelector('.Selected-Items').style.display = 'none';
    }
}

/* 7.d Hiding summary when width view port width is smaller then 700px */
function windowWidth() {
    if (window.innerWidth > 700) {
        btnToggle = false;
        maxWidthToggle = false;
        document.querySelector('.Selected-Items').style.display = 'block';
        document.querySelector('.btn-Summary').style.display = "none";
    }
    else if (maxWidthToggle === false) {
        maxWidthToggle = true;
        document.querySelector('.Selected-Items').style.display = 'none';
        document.querySelector('.btn-Summary').style.display = "block";
    }
}

/* ----------------------------------------------------------------------------------------------------- */
                                    /*8 User ( password ) DOM manipulation */
/* ----------------------------------------------------------------------------------------------------- */

/* 8.a Reset Password Manipulation */
function resetPass() {
    document.getElementById('ResetPass').style.display = "none";
    document.querySelector('.userDetails').classList.add("userDetails-bg");
    document.querySelector('.userDetails').innerHTML =
        `<form class="Password" onsubmit="changePass()">
                <input id="OldPassword" type="text" name="" id="" placeholder="Old Password" required>
                <input id="NewPassword" type="text" name="" id="" placeholder="New Password" required>
                <input id="ConfirmPassword" type="text" name="" id="" placeholder="Confirm Password" required>
                <button type="submit" >CHANGE PASSWORD</button>
            </form>`
}

/* 8.b */
function changePass() {
    event.preventDefault();

    const OldPassword = document.getElementById('OldPassword').value;
    const userLogIn = JSON.parse(localStorage.getItem('userLogIn'));
    if (userLogIn[User.Email] === OldPassword) {
        const NewPassword = document.getElementById('NewPassword').value;
        const ConfirmPassword = document.getElementById('ConfirmPassword').value;
        if (NewPassword === ConfirmPassword) {
            const newpass = {
                [`${User.Email}`]: NewPassword
            }
            localStorage.setItem('userLogIn', JSON.stringify(newpass));
            document.getElementById('passwordMsg').innerHTML = "PASSWORD CHANGED SUCCESSFULLY";
            setTimeout(() => {
                document.querySelector('.userDetails').classList.remove("userDetails-bg");
                document.getElementById('ResetPass').style.display = "block";
                document.getElementById('passwordMsg').innerHTML = '';
                document.querySelector('.userDetails').innerHTML =
                    `<h2>${User.Name}</h2>
                        <h4>${User.Email}</h4>`;
            }, 3000)
        }
        else {
            document.getElementById('NewPassword').value = '';
            document.getElementById('ConfirmPassword').value = '';
            document.getElementById('passwordMsg').innerHTML = "New PASSWORD MISMATCH";
        }
    }
    else {
        document.getElementById('OldPassword').value = '';
        document.getElementById('NewPassword').value = '';
        document.getElementById('ConfirmPassword').value = '';
        document.getElementById('passwordMsg').innerHTML = "OLD PASSWORD MISMATCH";
    }
}

/* ----------------------------------------------------------------------------------------------------- */
                                /* 9 User ( Address ) DOM manipulation */
/* ----------------------------------------------------------------------------------------------------- */

/*9.a Edit Address Manipulation */
function editAddress() {
    document.querySelector('.optionView').innerHTML =
        `<form id="Form" onsubmit="saveAddress()">
                <p id="address-P"></p>
                        <div class="input">
                            <div class="Label">
                                <label class="Input-Label" for="Name">Name</label>
                                <input id="Name" type="text" required value="${User.Name}">
                            </div>
                            <div class="Label">
                                <label class="Input-Label" for="Mobile">Mobile No.</label>
                                <input id="Mobile" type="number" minlength="10" maxlength="10" required value="${User.Mobile_No}">
                            </div>                  
                        </div>
    
                        <div class="input">
                            <div class="Label">
                                <label class="Input-Label" for="Email">Email</label>
                                <input id="Email" type="email" required value="${User.Email}">
                            </div>
                        </div>
    
                        <div class="input">
                            <div class="Label">
                                <label class="Input-Label" for="HouseNo">House No.</label>
                                <input id="HouseNo" type="text" value="${User.House_No}">
                            </div>                                        
                            <div class="Label">
                                <label class="Input-Label" for="Area">Area</label>                        
                                <input id="Area" type="text" value="${User.Area}">
                            </div>
                        </div>
    
                        <div class="input">
                            <div class="Label">
                                <label class="Input-Label" for="City">City</label>
                                <input id="City" type="text" value="${User.City}">
                            </div>                    
                            <div class="Label">
                                <label class="Input-Label" for="State">State</label>
                                <input id="State" type="text"value="${User.State}">
                            </div>
                            
                        </div>
                        <div class="input">
                            <div class="Label">
                                <label class="Input-Label" for="Pin-Code">Pin Code</label>
                                <input id="Pin-Code" type="number" minlength="6" maxlength="6" required value="${User.Pin_Code}">
                            </div>                        
                        </div>
    
                        <button id="ChangeAddress">Change Address</button>
                    </form>`;
}

/*9.b Udating User Address */
function saveAddress() {
    event.preventDefault();

    document.getElementById('ChangeAddress').style.display = "none";

    const user = {
        Name: document.getElementById('Name').value,
        Mobile_No: document.getElementById('Mobile').value,
        Email: document.getElementById('Email').value,
        House_No: document.getElementById('HouseNo').value,
        Area: document.getElementById('Area').value,
        City: document.getElementById('City').value,
        State: document.getElementById('State').value,
        Pin_Code: document.getElementById('Pin-Code').value
    };

    /* Changing User Login credential */
    const userLogIn = {}
    userLogIn[user.Email] = user.Mobile_No;
    localStorage.setItem("userLogIn", JSON.stringify(userLogIn));

    /* Saving Updated changes */
    localStorage.setItem('USER', JSON.stringify(user));
    document.getElementById('address-P').innerHTML = "ADDRESS CHANGED SUCCESSFULLY";

    /* if pincode is get changed remove prices and item display so that new data can be loaded acc to pincode*/
    if( user.Pin_Code !== pinCode ){
        pinCodeChange=true;
        localStorage.removeItem("price");
        localStorage.removeItem("itemDisplay");        
        clearCart();
    }
    
    /* Going back to address menu */
    setTimeout(() => {        
        /* Setting up nav address acc to the updated one */
        gettingUser();
        usercard("Address");
    }, 1000
    )
}

/* ----------------------------------------------------------------------------------------------------- */
                                                /*10 Logout */
/* ----------------------------------------------------------------------------------------------------- */

/* Logout function  */
function goToLogin() {
    const loginState = false;
    localStorage.setItem("loginState", JSON.parse(loginState));

    localStorage.removeItem("price");
    localStorage.removeItem("itemDisplay");

    location.replace("index.html");
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

                        /* ------------------------------------------------------- */
                                            /* Setting Up page  */
                        /* ------------------------------------------------------- */

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

/* A Checking for any error else loading the data */
function settingUpPage(){
    try {
        tempSummaryData();
        gettingUser();            /* throw error if user is not signed UP*/
        getApiData();
    }
    catch {
        location.replace("index.html");
    }
}

/* B Checking for the change in the width of view port */
/* window.addEventListener('resize', windowWidth); */

