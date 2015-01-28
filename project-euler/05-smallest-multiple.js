/*
http://projecteuler.net
Problem 5 - Smallest Multiple

2520 is the smallest number that can be divided by each of the numbers 
from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all 
of the numbers from 1 to 20?

SOLUTION:

Author: Alex Pendrey
Run through a loop incrementing n by one each time. In an inner loop of 1 to 20
check to see if n divides by each of these without a remainder

Answer: 232792560
*/

var smallestMultiple = function() {
	var cap = 20;
	var n = 1;
	while(true) {
		for (var i = 1; i <= cap; i++) {
			if (n % i >= 1) break; //If a remainder is found then break loop and try next number
			if (i === cap) return n; //Valid number found so return it
		}
		n++;
	}
};

console.log(smallestMultiple());
