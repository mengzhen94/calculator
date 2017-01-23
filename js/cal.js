//The eval() function evaluates or executes an argument.
//The isNaN() function determines whether a value is an illegal number (Not-a-Number).

$(document).ready(function(){
	var entries = [];
	var total = 0;
	var temp = '';
	var num = 0;
	var results = [];
	var lastNum = 0;
	var history = '';

	$('button').on('click', function(){
		var val = $(this).attr('value');

		// 'ce' for history
		if(val === 'ce'){
			history += '(del)';
		}else{
			history += val;
		}
		
		if(!isNaN(val) || val === '.'){ //number -> temp
			temp += val;
			$("#answer").html(temp);

		}else if(val === 'ac'){ //clear all
			entries = [];
			temp = '';
			total = 0;
			history = '';
			$("#answer").html('0');

		}else if(val === 'ce'){ //clear last
			console.log("temp :" + temp);
			temp = '';
			$("#answer").html('0');

		}else if(val !== '='){ // operator
			if(temp !== ''){
				entries.push(temp);
			}
			entries.push(val);
			temp = '';

		}else{ // equals
			entries.push(temp);
			temp = '';
			var sign = '+';

			for(var i = 0; i < entries.length; i++){

				if(!isNaN(entries[i])){
					num = Number(entries[i]);
					if(sign === '+'){
						results.push(num);

					}else if(sign === '-'){
						results.push(-num);

					}else if(sign === '*'){
						lastNum = results.pop();
						results.push(lastNum * num);

					}else{
						lastNum = results.pop();
						results.push(lastNum / num);
					}

				}else{
					sign = entries[i];
				}
			}
			total = results.reduce(function(a, b) { return a + b; }, 0);

			console.log(total);

			// Print the result
			if(total !== total){ //check NaN
				$("#answer").html('ERROR');
			}
			else if(total % 1 != 0){
				$("#answer").html(total.toFixed(5));
			}else{
				$("#answer").html(total);
			} 
			entries = [];
			results = [];
			total = 0;
		}
		
		//Print the history
		$("#history").html(history);
		console.log(entries);
		console.log(results);
		console.log(history);	
	});
});