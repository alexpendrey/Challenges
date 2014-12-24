/*
http://projecteuler.net
Problem 4 - Largest palindrome product

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.

SOLUTION:

Author: Alex Pendrey
Starting with two numbers of 999, multiply them together and each time decrement the first number by 1. Once the first number
gets to 0 then decrement the second by 1, so that each combination of numbers has occurred. With each iteration, the result
of the multiplied number is checked to see if it's a palindrome

Answer: 906609
*/

function isPalindrome(num) {
	//Function splits the string in half and reverses the second half to see if they match
	var vals = num.toString().split("");
	var half1 = vals.splice(0, vals.length/2).join('');
	var half2 = vals.splice(0);
	var val2 = '';
	half2.forEach(function(v) {
		val2 = v + val2;
	});
	return half1 === val2;
}

var calculatePalindrome = function() {
	var a = 999, b = 999, largest = 0;
	while (b > 0) {
		var num = a*b;
		if (isPalindrome(num)) {
			if (num > largest) {
				largest = num;
			}
		}
		a--;
		if (a == 0) {
			a = 999;
			b--;
		}
	}
	return largest;
}

console.log('Largest: ' + calculatePalindrome());
