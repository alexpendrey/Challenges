/*
http://projecteuler.net
Problem 2 - Even Fibonacci numbers

Each new term in the Fibonacci sequence is generated by adding the previous two terms. 
By starting with 1 and 2, the first 10 terms will be:

1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

By considering the terms in the Fibonacci sequence whose values do not exceed four million, 
find the sum of the even-valued terms.

SOLUTION:

Author: Alex Pendrey
Simply a brute force approach calculating each fibonacci number and, if even, increment the sum 
variable by the value

Answer: 4613732
*/

var firstNum = 1;
var secondNum = 2;

var num = firstNum + secondNum;

function isEven(num) {
	return (num % 2 == 0);
}

var sum = 0;

while (num < 4000000) {
	firstNum = secondNum;
	secondNum = num;
	if (isEven(num)) {
		sum += num;
		console.log(num);
	}
	num = firstNum + secondNum;
}

console.log('Sum: ' + (sum + 2)); //2 is the first even number we missed out
