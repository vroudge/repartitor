const kek = [
	{name:'kek', id:1},
	{name:'kek', id:2},
	{name:'lol', id:11},
	{name:'lol', id:12},
	{name:'lol', id:13},
	{name:'kek', id:3},
	{name:'kek', id:4},
	{name:'kek', id:5},
	{name:'lol', id:16},
	{name:'lol', id:17},
	{name:'lol', id:18},
	{name:'kek', id:6},
	{name:'kek', id:7},
	{name:'kek', id:8},
	{name:'kek', id:9},
	{name:'lol', id:10},
	{name:'rofl', id:25},
	{name:'lol', id:14},
	{name:'lol', id:15},
	{name:'lol', id:19},
	{name:'lol', id:20},
	{name:'lol', id:21},
	{name:'lol', id:22},
	{name:'lol', id:23},
	{name:'lol', id:24},
	{name:'rofl', id:26},
];

function Repartitor(repartitionArray) {
	this.repartitionArray = repartitionArray;
}
Repartitor.prototype.parseTargetField = function(){
	//TODO
}

Repartitor.prototype.run = function (repartitionField, names, stackSize, index=0, results=[], runLeft=false){
	const self = this;
	const expectedFinalSize = names.length * stackSize;

	if(results.length === expectedFinalSize) return results;

	for (var j = 0; j < self.repartitionArray.length; j++) {
		const currentValue = self.repartitionArray[j];

		if(!results.includes(currentValue) && currentValue[repartitionField] === names[index]){
			if(results.length < (stackSize*(index+1))){
				results.push(currentValue);
			} else if(runLeft){
				if(results.length < expectedFinalSize) {
					if(expectedFinalSize%2 ===1 && results.length %2===0){
						results.push(currentValue); runLeft=false; break;
					} else {
						index++;
						results.push(currentValue);
					}
				}
			}
		}
	}
	if(names[index+1] && !runLeft){
		return self.run(repartitionField, names, stackSize, index+1, results);
	} else if(names[index-1] && results.length !== (names.length * stackSize)){
		return self.run(repartitionField, names, stackSize, 0, results, true);
	}
	console.log('passhere')
	return results;
}

var lolol = new Repartitor(kek).run('name', ['kek', 'lol', 'rofl'], 1);
console.log(lolol);

module.exports = Repartitor;
