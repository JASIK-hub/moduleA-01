/**
 * Write a function that receives two strings and returns the number of characters we would need to rotate the first string forward to match the second.
 *
 * @param {String} first
 * @param {String} second
 * @return {Number}
 */

function shiftedDiff(first, second) {
	/* Work here */
	let output=document.querySelector('p')
	let firstW=document.querySelector('#string1').value
	let secondW=document.querySelector('#string2').value
	if(firstW.length!==secondW.length){
		return output.textContent=-1
	}
	if(firstW==secondW){
		return output.textContent=0
	}
	for(let i=1;i<firstW.length;i++){
		let word=firstW.slice(-i) + firstW.slice(0,-i)
		console.log(word)
		if(word==secondW){
			return output.textContent=i
		}
		else{
			output.textContent=-1
		}
	}
	}

