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

	// error handling part
	if (isNaN(displayInput) || displayInput == "") {
		// isNaN check only number or string or others is true
		error.innerText = "please give a number";
		input.value = "";
	} else if (displayInput <= 0) {
		error.innerText = "Please input a positive number";
		input.value = "";
	} else if (displayInput > 52) {
		error.innerText = "Please input a a right number";
		input.value = "";
	} else {
		fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${displayInput}`)
			.then((res) => res.json())
			.then((data) => cardDisplay(data.cards));
		input.value = "";
	}
};

const cardDisplay = (cards) => {
	for (const card of cards) {
		console.log(card.image);
		const div = document.createElement("div");
		div.classList.add("col-lg-3");
		div.classList.add("mb-5");

		div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"> ${card.suit}</h5>
                <p class="card-text"> Serial Number: ${card.code}.</p>
                <a href="#" class="btn btn-primary">See detailes</a>
            </div>
            </div>
        
        
        `;
		main.appendChild(div);
	}
};
