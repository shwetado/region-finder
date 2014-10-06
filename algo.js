d.Region = function(coOrdinate with color) {

	list of all coOrdinates with color -(check)> coOrdinate is adjacent to any(coOrdinates)?

	[new region ->input color &&  adjacent coOrdinates,
	new region ->input color &&  adjacent coOrdinates,
	new region ->input color &&  adjacent coOrdinates
	]

};

d.regions = function(diagram) {
	var result = [];
	var colors = Object.keys(diagram);

	colors.forEach(function(color, index){
		result[index] = result[index] || [];
		result[index].push(color);
		diagram[color].forEach(function(coOrdinate){

			result[index].push(coOrdinate);
		});
	});
	return result;
};


d.Diagram = function(matrix) {
	var diagram = {};
	matrix.forEach(function(row, indexOne) {
		row.forEach(function(color, indexTwo) {
			diagram[color] = diagram[color] || [];
			diagram[color].push([indexOne, indexTwo]);
		});
	});
	return diagram;
};



// test['when given color matrix it should create a diagram'] = function(){
// 	var diagram = new d.Diagram([['r']]);
// 	assert.deepEqual(diagram.r , [[0,0]]);
// };

// test['when given multiple color matrix it should create a diagram'] = function(){
// 	var diagram = new d.Diagram([['r','g'],['r','b']]);
// 	assert.deepEqual(diagram.r , [[0,0],[1,0]]);
// 	assert.deepEqual(diagram.g , [[0,1]]);
// 	assert.deepEqual(diagram.b , [[1,1]]);
// };

// test['diagram gives all its regions with co-ordinates'] = function(){
// 	var diagram = new d.Diagram([['r','g'],['r','b']]);
// 	var expectedRegions = [
// 							['r',[0,0],[1,0]],
// 							['g',[0,1]],
// 							['b',[1,1]]
// 							];

// 	assert.deepEqual(d.regions(diagram), expectedRegions);
// };

// test['regions gives different regions even with same colors'] = function(){
// 	var diagram = new d.Diagram([['r','g','b'],['r','b','r']]);
// 	var expectedRegions = [
// 							['r',[0,0],[1,0]],
// 							['g',[0,1]],
// 							['b',[0,2],[1,1]],
// 							['r',[1,2]]
// 							];

// 	assert.deepEqual(d.regions(diagram), expectedRegions);
// };

// test['A coordinate belongs to a region if it is on top-right'] = function(){
// 	var region = new d.Region('red', [1,1]);
// 	var belongs = d.belongsToRegion([0,2], 'red', region);
// 	assert.ok(belongs);
// };

// test['A coordinate belongs to a region if it is on top-left'] = function(){
// 	var region = new d.Region('red', [1,1]);
// 	var belongs = d.belongsToRegion([0,0], 'red', region);
// 	assert.ok(belongs);
// };

// test['A coordinate belongs to a region if it is on bottom-left'] = function(){
// 	var region = new d.Region('red', [0,1]);
// 	var belongs = d.belongsToRegion([1,0], 'red', region);
// 	assert.ok(belongs);
// };

// test['A coordinate belongs to a region if it is on bottom-right'] = function(){
// 	var region = new d.Region('red', [0,1]);
// 	var belongs = d.belongsToRegion([1,2], 'red', region);
// 	assert.ok(belongs);
// };
