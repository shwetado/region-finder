var d = require('./detection.js').d;
var assert = require('assert');
var test = {};
exports.test = test;

test['A coordinate must have row number and column number and color'] = function() {
	var coordinate = new d.CoOrdinate(0, 1, 'r');
	assert.equal(coordinate.color, 'r');
	assert.equal(coordinate.row, 0);
	assert.equal(coordinate.column, 1);
};

test['A coordinate can give coOrdinates of its top'] = function() {
	var coordinate = new d.CoOrdinate(0, 1, 'r');
	var top = coordinate.top();
	assert.equal(top.row, -1);
	assert.equal(top.column, 1);
};

test['A coordinate can give coOrdinates of its right'] = function() {
	var coordinate = new d.CoOrdinate(0, 1, 'r');
	var right = coordinate.right();
	assert.equal(right.row, 0);
	assert.equal(right.column, 2);
};

test['A coordinate can give coOrdinates of its bottom'] = function() {
	var coordinate = new d.CoOrdinate(0, 1, 'r');
	var bottom = coordinate.bottom();
	assert.equal(bottom.row, 1);
	assert.equal(bottom.column, 1);
};

test['A coordinate can give coOrdinates of its left'] = function() {
	var coordinate = new d.CoOrdinate(0, 1, 'r');
	var left = coordinate.left();
	assert.equal(left.row, 0);
	assert.equal(left.column, 0);
};

test['creates a region with color and coordinates'] = function() {
	var coordinate = new d.CoOrdinate(0, 1, 'r');
	var region = new d.Region(coordinate);
	assert.equal(region.color, 'r');
	assert.deepEqual(region.coOrdinates, [coordinate]);
};

test['adds a coordinate to existing region'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 1, 'r');
	var coordinate2 = new d.CoOrdinate(0, 2, 'r');
	var region = new d.Region(coordinate1);
	region.addCoOrdinate(coordinate2);
	assert.deepEqual(region.coOrdinates, [coordinate1, coordinate2]);
};

test['A coordinate belongs to a region if it is on right'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 1, 'red');
	var coordinate2 = new d.CoOrdinate(0, 2, 'red');
	var region = new d.Region(coordinate1);
	var belongs = d.belongsToRegion(coordinate2, region);
	assert.ok(belongs);
};

test['A coordinate belongs to a region if it is on left'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 1, 'red');
	var coordinate2 = new d.CoOrdinate(0, 2, 'red');
	var region = new d.Region(coordinate2);
	var belongs = d.belongsToRegion(coordinate1, region);
	assert.ok(belongs);
};

test['A coordinate belongs to a region if it is on top'] = function() {
	var coordinate1 = new d.CoOrdinate(1, 0, 'red');
	var coordinate2 = new d.CoOrdinate(0, 0, 'red');
	var region = new d.Region(coordinate1);
	var belongs = d.belongsToRegion(coordinate2, region);
	assert.ok(belongs);
};

test['A coordinate belongs to a region if it is on bottom'] = function() {
	var coordinate1 = new d.CoOrdinate(1, 0, 'red');
	var coordinate2 = new d.CoOrdinate(2, 0, 'red');
	var region = new d.Region(coordinate1);
	var belongs = d.belongsToRegion(coordinate2, region);
	assert.ok(belongs);
};

test['A coordinate does not belongs to a region if color is not same'] = function() {
	var coordinate1 = new d.CoOrdinate(1, 0, 'red');
	var coordinate2 = new d.CoOrdinate(2, 0, 'green');
	var region = new d.Region(coordinate1);
	var belongs = d.belongsToRegion(coordinate2, region);
	assert.ok(!belongs);
};

test['A coordinate does not belong to a region when not adjacent'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	var coordinate2 = new d.CoOrdinate(1, 2, 'red');
	var region = new d.Region(coordinate1);
	var belongs = d.belongsToRegion(coordinate2, region);
	assert.ok(!belongs);
};

test['assigns a particular coordinate to its respective region'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	var coordinate2 = new d.CoOrdinate(0, 1, 'red');
	var region = new d.Region(coordinate1);
	var regions = [region];
	d.assignToRegion(coordinate2, regions);
	assert.deepEqual(region.coOrdinates, [
		coordinate1,
		coordinate2
	]);
};

test['assigns a particular coordinate to its respective region having multiple coordinates'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	var coordinate2 = new d.CoOrdinate(0, 1, 'red');
	var coordinate3 = new d.CoOrdinate(1, 1, 'red');
	var region = new d.Region(coordinate1);
	region.addCoOrdinate(coordinate2);
	var regions = [region];
	d.assignToRegion(coordinate3, regions);
	assert.deepEqual(region.coOrdinates, [coordinate1,coordinate2,coordinate3]);
};

test['creates a new region if there are no regions'] = function() {
	var regions = [];
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	d.assignToRegion(coordinate1, regions);
	assert.equal(regions.length, 1);
	assert.deepEqual(regions[0].coOrdinates, [coordinate1]);
	assert.equal(regions[0].color, 'red');

};

test['creates a new region if the coordinate does not belong to any of the region'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	var coordinate2 = new d.CoOrdinate(2, 2, 'blue');
	var coordinate3 = new d.CoOrdinate(1, 1, 'red');
	var regionRed = new d.Region(coordinate1);
	var regionBlue = new d.Region(coordinate2);

	var regions = [regionRed, regionBlue];
	d.assignToRegion(coordinate3, regions);
	assert.equal(regions.length, 3);
	assert.deepEqual(regions[2].coOrdinates, [coordinate3]);
};

test['creates a new region if the coordinate belongs to a new color'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	var coordinate2 = new d.CoOrdinate(2, 2, 'blue');
	var coordinate3 = new d.CoOrdinate(0, 1, 'green');
	var regionRed = new d.Region(coordinate1);
	var regionBlue = new d.Region(coordinate2);

	var regions = [regionRed, regionBlue];
	d.assignToRegion(coordinate3, regions);
	assert.equal(regions.length, 3);
	assert.deepEqual(regions[2].coOrdinates, [coordinate3]);
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
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	var coordinate2 = new d.CoOrdinate(1, 0, 'blue');

	var regionRed = new d.Region(coordinate1);
	var regionBlue = new d.Region(coordinate2);

	assert.ok(regionRed.isNeighborOf(regionBlue));
};

test['gives false when two regions do not share border'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'red');
	var coordinate2 = new d.CoOrdinate(1, 1, 'blue');

	var regionRed = new d.Region(coordinate1);
	var regionBlue = new d.Region(coordinate2);

	assert.ok(!regionRed.isNeighborOf(regionBlue));
};

test['two regions share a border even if one of the coordinates shares a border'] = function() {
	var regionRed = new d.Region(new d.CoOrdinate(0, 0, 'red'));
	regionRed.addCoOrdinate(new d.CoOrdinate(1, 0, 'red'));
	regionRed.addCoOrdinate(new d.CoOrdinate(2, 0, 'red'));
	regionRed.addCoOrdinate(new d.CoOrdinate(1, 1, 'red'));

	var regionBlue = new d.Region(new d.CoOrdinate(1, 1, 'blue'));
	regionBlue.addCoOrdinate(new d.CoOrdinate(0, 2, 'blue'));
	regionBlue.addCoOrdinate(new d.CoOrdinate(1, 2, 'blue'));
	regionBlue.addCoOrdinate(new d.CoOrdinate(2, 2, 'blue'));

	assert.ok(regionRed.isNeighborOf(regionBlue));
};

test['gives all the neighbors of a region'] = function() {
	var coordinate1 = new d.CoOrdinate(1, 1, 'blue');
	var blue = new d.Region(coordinate1);

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
	var coordinate1 = new d.CoOrdinate(0, 0, 'blue');
	var blue = new d.Region(coordinate1);

	var matrix = [
		['b']
	];
	var expectedRegions = [];
	assert.deepEqual(blue.getNeighbors(matrix), expectedRegions);
};

test['gets all edges of a region'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'blue');
	var blue = new d.Region(coordinate1);

	blue.addCoOrdinate(new d.CoOrdinate(0, 1, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(0, 2, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(1, 0, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(1, 1, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(1, 2, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(2, 0, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(2, 1, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(2, 2, 'blue'));

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

test['gets all coordinates of a region when all are edges'] = function() {
	var coordinate1 = new d.CoOrdinate(0, 0, 'blue');
	var blue = new d.Region(coordinate1);

	blue.addCoOrdinate(new d.CoOrdinate(0, 1, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(0, 2, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(1, 0, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(1, 1, 'blue'));
	blue.addCoOrdinate(new d.CoOrdinate(1, 2, 'blue'));

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