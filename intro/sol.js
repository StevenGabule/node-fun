var carts = [
	{product: 'name 1', price: 10, qty: 1},
	{product: 'name 2', price: 10.5, qty: 4},
	{product: 'name 3', price: 23.10, qty: 22},
	{product: 'name 4', price: 1000, qty: 12},
]

var newCarts = carts.map((cart, idx) => {
	return {
		"Number Id: ": idx + 1,
		"Name Of Product": cart.product,
		"Description": "asdasds " + idx,
		"price": "asdasds " + idx,
		"Extented_Price": cart.price * cart.qty,
	}	
})

var subtotal = newCarts.map(carts => carts.Extented_Price).reduce((next, cur) => next + cur)
var tax = subtotal * 0.12;
var total = subtotal + tax;
var change = 10000 - total;

console.table(newCarts);
console.log("SUBTOTAL:", subtotal.toFixed(2))
console.log("TAX:", tax.toFixed(2))
console.log("TOTAL:", total.toFixed(2))
console.log("CHANGE:", change.toFixed(2))
