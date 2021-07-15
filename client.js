let moneyContainer = document.querySelector(".moneyContainer");
let firstMoneyBlock_inp = document.getElementById("firstMoneyBlock_inp");
let secondMoneyBlock_inp = document.getElementById("secondMoneyBlock_inp");

secondMoneyBlock_currencyLabel.innerHTML = `<option value="USD">&#36</option>`;

let clientNeedsUSD = false
let clientHasUSD = false

moneyContainer.addEventListener("input", function(event) {
    clientHasUSD = false;
    clientNeedsUSD = false;

    if (event.target.getAttribute("id") == "firstMoneyBlock_inp" || event.target.getAttribute("id") == "firstMoneyBlock_currencyLabel") {
        inp1 = event.target.value
        if (firstMoneyBlock_currencyLabel.value == "RUB" || firstMoneyBlock_currencyLabel.value == "UAH") {

            let option = `<option value="USD">&#36</option>`;
            secondMoneyBlock_currencyLabel.innerHTML = option;
            clientNeedsUSD = true;
            current1 = firstMoneyBlock_currencyLabel.value
            getdata()
        } else {
            let option = `<option value="RUB">&#8381</option>
                          <option value="UAH">&#8372</option>
                `
            secondMoneyBlock_currencyLabel.innerHTML = option;
            current2 = secondMoneyBlock_currencyLabel.value;
            clientHasUSD = true;
            getdata()
        }

    } else if (event.target.getAttribute("id") == "secondMoneyBlock_inp" || event.target.getAttribute("id") == "secondMoneyBlock_currencyLabel") {

        current2 = secondMoneyBlock_currencyLabel.value;
        clientHasUSD = true;
        getdata()
    }

})

function getdata() {

    let url;
    if (clientNeedsUSD) {
        url = `https://api.binance.com/api/v3/klines?symbol=USDT${current1}&interval=1m`;
    } else if (clientHasUSD) {
        url = `https://api.binance.com/api/v3/klines?symbol=USDT${current2}&interval=1m`;
    }

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            let price = Number(myJson[0][1]).toFixed(3);
            let emailContainer = document.querySelector(".emailContainer");

            if (clientNeedsUSD) {
                secondMoneyBlock_inp.value = (firstMoneyBlock_inp.value / price).toFixed(3);

                emailContainer.innerHTML = `<input type="text" id="email" placeholder="email">
                                            <input type="button" id="sendResToThatMail" value="send result">
                `
            } else if (clientHasUSD) {
                if (secondMoneyBlock_currencyLabel.value == "RUB") { //rubl nujen
                    secondMoneyBlock_inp.value = (price * firstMoneyBlock_inp.value).toFixed(3)
                    emailContainer.innerHTML = `<input type="text" id="email" placeholder="email">
                                            <input type="button" id="sendResToThatMail" value="send result">
                `
                } else if (secondMoneyBlock_currencyLabel.value == "UAH") { //nujna grivna

                    secondMoneyBlock_inp.value = firstMoneyBlock_inp.value * price
                }

            }

        });

}
emailjs.send("contact_service", "template_ij9i0lz", {
    name: "asd",
    phone: "asd",
    reply_to: "asd",
});


//posle togo,kak polzovatel vvedet @mail:
//1)dorisovat krug(budet vyglyadit kak golova)
//2)sdelat screen web page i poslat na pochtu