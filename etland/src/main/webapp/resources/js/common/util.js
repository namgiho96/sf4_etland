"use strict";
$.prototype.nullChecker =x=>{
	let flag = false;
	let i = 0;
	for (i in x) { //int i i<x.lengh i ++ 줄인말 
		if (x[i] === '') {
			flag = true;
		}
	}
	return flag;
}
$.prototype.zeroChecker=x=>{
	let flag = false;
	let i = 0;
	for (i in x) {
		if (x[i] === '') {
			flag = true;
		}
	}
	return flag;
	
}