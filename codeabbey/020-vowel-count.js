/*
http://www.codeabbey.com
Problem 20 - Vowel count

This is a simple problem to get introduced to string processing. 
You will be given several lines of text - and for each of them you should 
tell the number of vowels (i.e. letters a, o, u, i, e, y). 
Note: that y is regarded as vowel for purpose of this task.

Though simple, this technique is important in cipher-breaking approaches. 
For example refer to Caesar Cipher Cracker problem.

Input data contain number of test-cases in the first line.
Then the specified number of lines follows each representing one test-case.
Lines consist only of lowercase English (Latin) letters and spaces.
Answer should contain the number of vowels in each line, separated by spaces.

SOLUTION:

Author: Alex Pendrey
Read a file containing the sample data and split in by new lines
Next loop through the array of lines and within that loop through 
each character to check to see if it's in the vowel array. Display totals
of each line after 

*/

var fs = require('fs');

fs.readFile('./data/vowels.txt', 'utf8', function(err, data) {
	if (err) throw err;
	
	var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
	var countStr = '';

	var dataArray = data.split('\n').slice(1); //Ignore 1st line

	dataArray.forEach(function(item) {
		var count = 0;
		//Loop through each character checking to see if it's in the vowel array
		for (var i = 0; i <= item.length; i++) {
			if (vowels.indexOf(item[i]) > -1) {
				count++;
			}
		}
		countStr += count + ' ';
		
	});
	console.log(countStr);
});
