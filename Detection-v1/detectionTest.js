var d = require('./detection.js').d;
var assert = require('assert');
var test = {};
exports.test = test;

test['creates a region with color and coordinates'] = function() {
	var region = new d.Region('r', [0, 1]);
	assert.equal(region.color, 'r');
	assert.deepEqual(region.coOrdinates, [
		[0, 1]
	]);
};

test['adds a coordinate to existing region'] = function() {
	var region = new d.Region('r', [0, 1]);
	region.addCoOrdinate([0, 2]);
	assert.deepEqual(region.coOrdinates, [
		[0, 1],
		[0, 2]
	]);
};

test['A coordinate belongs to a region if it is on right'] = function() {
	var region = new d.Region('red', [0, 1]);
	var belongs = d.belongsToRegion([0, 2], 'red', region);
	assert.ok(belongs);
};

test['A coordinate belongs to a region if it is on left'] = function() {
	var region = new d.Region('red', [0, 2]);
	var belongs = d.belongsToRegion([0, 1], 'red', region);
	assert.ok(belongs);
};

test['A coordinate belongs to a region if it is on top'] = function() {
	var region = new d.Region('red', [1, 0]);
	var belongs = d.belongsToRegion([0, 0], 'red', region);
	assert.ok(belongs);
};

test['A coordinate belongs to a region if it is on bottom'] = function() {
	var region = new d.Region('red', [1, 0]);
	var belongs = d.belongsToRegion([2, 0], 'red', region);
	assert.ok(belongs);
};

test['A coordinate does not belongs to a region if color is not same'] = function() {
	var region = new d.Region('red', [1, 0]);
	var belongs = d.belongsToRegion([2, 0], 'green', region);
	assert.ok(!belongs);
};

test['A coordinate does not belong to a region when not adjacent'] = function() {
	var region = new d.Region('red', [0, 0]);
	var belongs = d.belongsToRegion([1, 2], 'red', region);
	assert.ok(!belongs);
};

test['A coordinate does not belong to a region when color not same'] = function() {
	var region = new d.Region('red', [0, 0]);
	var belongs = d.belongsToRegion([1, 2], 'raid', region);
	assert.ok(!belongs);
};

test['assigns a particular coordinate to its respective region'] = function() {
	var region = new d.Region('red', [0, 0]);
	var regions = [region];
	d.assignToRegion([0, 1], 'red', regions);
	assert.deepEqual(region.coOrdinates, [
		[0, 0],
		[0, 1]
	]);
};

test['assigns a particular coordinate to its respective region having multiple coordinates'] = function() {
	var region = new d.Region('red', [0, 0]);
	region.addCoOrdinate([0, 1]);
	var regions = [region];
	d.assignToRegion([1, 1], 'red', regions);
	assert.deepEqual(region.coOrdinates, [
		[0, 0],
		[0, 1],
		[1, 1]
	]);
};

test['creates a new region if there are no regions'] = function() {
	var regions = [];
	d.assignToRegion([1, 1], 'red', regions);
	assert.equal(regions.length, 1);
	assert.deepEqual(regions[0].coOrdinates, [
		[1, 1]
	]);
	assert.equal(regions[0].color, 'red');

};

test['creates a new region if the coordinate does not belong to any of the region'] = function() {
	var regionRed = new d.Region('red', [0, 0]);
	var regionBlue = new d.Region('blue', [2, 2]);

	var regions = [regionRed, regionBlue];
	d.assignToRegion([1, 1], 'red', regions);
	assert.equal(regions.length, 3);
	assert.deepEqual(regions[2].coOrdinates, [
		[1, 1]
	]);
};

test['creates a new region if the coordinate belongs to a new color'] = function() {
	var regionRed = new d.Region('red', [0, 0]);
	var regionBlue = new d.Region('blue', [2, 2]);

	var regions = [regionRed, regionBlue];
	d.assignToRegion([0, 1], 'green', regions);
	assert.equal(regions.length, 3);
	assert.deepEqual(regions[2].coOrdinates, [
		[0, 1]
	]);
};

test['given a matrix it gives all the regions in that matrix'] = function() {
	var matrix = [
		['red', 'green'],
		['red', 'blue']
	];
	var regions = d.getRegions(matrix);
	assert.equal(regions.length, 3);
	var expectedRegions = [
		['red', [
			[0, 0],
			[1, 0]
		]],
		['green', [
			[0, 1]
		]],
		['blue', [
			[1, 1]
		]]
	];
	assert.deepEqual(regions, expectedRegions);
};

test['given a big matrix gives all regions'] = function() {
	var matrix = [
		['b', 'g', 'g'],
		['g', 'b', 'g'],
		['g', 'g', 'y']
	];
	var regions = d.getRegions(matrix);
	assert.equal(regions.length, 5);
	var expectedRegions = [
		['b', [
			[0, 0]
		]],
		['g', [
			[0, 1],
			[0, 2],
			[1, 2]
		]],
		['g', [
			[1, 0],
			[2, 0],
			[2, 1]
		]],
		['b', [
			[1, 1]
		]],
		['y', [
			[2, 2]
		]]
	];
	assert.deepEqual(regions, expectedRegions);
};

test['does two regions share border'] = function() {
	var regionRed = new d.Region('red', [0, 0]);
	var regionBlue = new d.Region('blue', [1, 0]);

	assert.ok(regionRed.isNeighborOf(regionBlue));
};

test['gives false when two regions do not share border'] = function() {
	var regionRed = new d.Region('red', [0, 0]);
	var regionBlue = new d.Region('blue', [1, 1]);

	assert.ok(!regionRed.isNeighborOf(regionBlue));
};

test['two regions share a border even if one of the coordinates shares a border'] = function() {
	var regionRed = new d.Region('red', [0, 0]);
	regionRed.addCoOrdinate([1, 0]);
	regionRed.addCoOrdinate([2, 0]);
	regionRed.addCoOrdinate([1, 1]);

	var regionBlue = new d.Region('blue', [1, 1]);
	regionBlue.addCoOrdinate([0, 2]);
	regionBlue.addCoOrdinate([1, 2]);
	regionBlue.addCoOrdinate([2, 2]);

	assert.ok(regionRed.isNeighborOf(regionBlue));
};

test['gives all the neighbors of a region'] = function() {
	var blue = new d.Region('b', [1, 1]);

	var matrix = [
		['b', 'g', 'g'],
		['g', 'b', 'g'],
		['g', 'g', 'y']
	];
	var expectedRegions = [
		['g', [
			[0, 1],
			[0, 2],
			[1, 2]
		]],
		['g', [
			[1, 0],
			[2, 0],
			[2, 1]
		]]
	];
	assert.deepEqual(blue.getNeighbors(matrix), expectedRegions);
};

test['gives nothing when there are no neighbors of a region'] = function() {
	var blue = new d.Region('b', [0, 0]);

	var matrix = [
		['b']
	];
	var expectedRegions = [];
	assert.deepEqual(blue.getNeighbors(matrix), expectedRegions);
};

test['gets all edges of a region'] = function(){
	var blue = new d.Region('b', [0, 0]);	
	blue.addCoOrdinate([0, 1]);
	blue.addCoOrdinate([0, 2]);
	blue.addCoOrdinate([1, 0]);
	blue.addCoOrdinate([1, 1]);
	blue.addCoOrdinate([1, 2]);
	blue.addCoOrdinate([2, 0]);
	blue.addCoOrdinate([2, 1]);
	blue.addCoOrdinate([2, 2]);

	var expected = [
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 2],
			[2, 0],
			[2, 1],
			[2, 2]
		];

	assert.deepEqual(blue.getEdges(), expected);
};

test['gets all coordinates of a region when all are edges'] = function(){
	var blue = new d.Region('b', [0, 0]);	
	blue.addCoOrdinate([0, 1]);
	blue.addCoOrdinate([0, 2]);
	blue.addCoOrdinate([1, 0]);
	blue.addCoOrdinate([1, 1]);
	blue.addCoOrdinate([1, 2]);

	var expected = [
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2],
		];

	assert.deepEqual(blue.getEdges(), expected);
};