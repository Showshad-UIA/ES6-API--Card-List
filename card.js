// const cardList = () => {
// 	fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
// 		.then((res) => res.json())
// 		.then((data) => cardDisplay(data));
// };
const main = document.getElementById("main");
const cardList = () => {
	const input = document.getElementById("cardListShow");
	const error = document.getElementById("error");
	const displayInput = parseInt(input.value);

	//   hi 🙂
	// error handling part
	if (isNaN(displayInput) || displayInput == "") {
		// isNaN check only number or string or others is true
		error.innerText = "please give a number";
		input.value = "";
		// input korar por main div clear hoye jai

		main.innerHTML = "";
	} else if (displayInput <= 0) {
		error.innerText = "Please input a positive number";
		input.value = "";
		main.innerHTML = "";
	} else if (displayInput > 52) {
		error.innerText = "Please input a a right number";
		input.value = "";
	} else {
		main.innerHTML = "";
		fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${displayInput}`)
			.then((res) => res.json())
			.then((data) => cardDisplay(data.cards));
		input.value = "";
		// error message faka kore dibo
		error.innerHTML = "";
	}
};

const cardDisplay = (cards) => {
	for (const card of cards) {
		// console.log(card.image);
		const div = document.createElement("div");
		div.classList.add("col-lg-3");
		div.classList.add("mb-5");

		div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"> ${card.suit}</h5>
                <p class="card-text"> Serial Number: ${card.code}.</p>
                <button onclick="cardDetails('${card.code}')" class="btn btn-primary">See detailes</button>
            </div>
            </div>
        
        
        `;
		main.appendChild(div);
	}
};

const cardDetails = (code) => {
	fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
		.then((res) => res.json())
		.then((data) => {
			const allCards = data.cards;
			const singleCard = allCards.find((card) => card.code === code);
			const div = document.createElement("div");
			//    singel data set howar age emply hbe
			main.innerHTML = "";
			div.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img src="${singleCard.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> ${singleCard.suit}</h5>
                    <p class="card-text"> Serial Number: ${singleCard.code}.</p>
                    <p class="card-text">value: ${singleCard.value} </p>
                </div>
                </div>
                
                
            `;
			main.appendChild(div);
		});
	// console.log(cardDisplay);
};
