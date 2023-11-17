// // // CREATE A VARIABLE
// // var name = 'john paul';
// // var age = 30.40;
// // var square = Math.sqrt(3 * 3);
// // var ArrNumbers = [1, 2, '3', 4];

// // for (let index = 0; index < ArrNumbers.length; index++) {
// // 	console.log("ArrNumbers[index]",ArrNumbers[index]);
// // }

// // for (const val1 of ArrNumbers) {
// // 	console.log("val1: ", val1);
// // }

// // var obj = {
// // 	name: 'John Paul',
// // 	age: 30,
// // 	employed: true,
// // }

// // console.log("Name: ", obj.name);

// // var todoLists = [
// // 	{id: 1, title: 'Buy some shoes', status: 'pending'},
// // 	{id: 2, title: 'Clean the room', status: 'pending'},
// // 	{id: 3, title: 'Cooking for dinner', status: 'completed'},
// // ];

// // for (const todoList of todoLists) {
// // 	console.table(todoList)
// // }

// // todoLists = todoLists.filter((todoList) => todoList.id != 1);
// // console.table(todoLists);

// var carts = [
// 	{product: 'name 1', price: 10, qty: 1},
// 	{product: 'name 2', price: 10.5, qty: 4},
// 	{product: 'name 3', price: 23.10, qty: 22},
// 	{product: 'name 4', price: 1000, qty: 12},
// ];
// var newCarts = carts.map((cart, idx) => {
// 	return {
// 		id: idx + 1,
// 		"Product Name": cart.product,
// 		"Description": "Description " + (idx + 1),
// 		"Price": cart.price,
// 		"Qty": cart.qty,
// 		"Extended Price": cart.price * cart.qty
// 	}
// })

// console.table(newCarts);
// var subtotal = newCarts.map(cart => cart['Extended Price']).reduce((next, cur) => next + cur);
// var tax = subtotal * 0.12;
// var total = subtotal + (subtotal * 0.12);
// const CASH = 15000;
// console.log("SubTotal:", subtotal.toFixed(2));
// console.log("Tax(12%):", tax);
// console.log("Total:",total );
// console.log("Cash:", CASH);
// if(CASH < total) {
// 	console.log('Insufficient cash:', CASH);
// } else {
// 	console.log("Change:", CASH - total);
// }

// // console.log(carts);
// // console.log('Total: ', (sumTotal.reduce((prev, cur) => cur + prev)).toFixed(2));

function sayHello(name = 'John') {
	console.log('Hello, ' + name);
}

sayHello();

function sqrt2(num1, num2) {
	return num1 * num2;
}

console.log(sqrt2(2, 2));

class Human {
	hands;
	foots;
	constructor(foots, hands) {
		this.hands = hands
		this.foots = foots
	}
	walk() {
		console.log('walking... with ...', this.foots);
	}
	eat() {
		console.log('Eating.. with ...', this.hands);
	}
}

class JPHuman extends Human {
	gender
	constructor(gender) {
		this.gender = gender;
	}
}

const JohnPaul = new JPHuman(2, 2)


