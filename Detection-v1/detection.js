var d = {};

var allRegionsIn = function(matrix) {
	var regions = [];
	matrix.forEach(function(row, rowNumber) {
		row.forEach(function(color, columnNumber) {
			var coOrdinate = [rowNumber, columnNumber];
			d.assignToRegion(coOrdinate, color, regions);
		});
	});
	return regions;
};

d.getRegions = function(matrix) {
	var regions = allRegionsIn(matrix);

	return regions.map(function(region) {
		return region.toArray();
	});
};

var areTwoCoOrdinatesAdjacent = function(one, two) {
	var x1 = one[0];
	var x2 = two[0];
	var y1 = one[1];
	var y2 = two[1];

	return (x2 - 1 == x1 && y1 == y2) || (x2 + 1 == x1 && y1 == y2) || (y2 - 1 == y1 && x1 == x2) || (y2 + 1 == y1 && x1 == x2);
};

var isAdjacentToRegion = function(coOrdinate, region) {
	return region.coOrdinates.some(function(coOrdinateTwo) {
		return areTwoCoOrdinatesAdjacent(coOrdinate, coOrdinateTwo);
	});
};

var topCoOrdinateOf = function(coOrdinate){
	return [coOrdinate[0] - 1, coOrdinate[1]];
};

var rightCoOrdinateOf = function(coOrdinate){
	return [coOrdinate[0], coOrdinate[1] + 1];
};

var bottomCoOrdinateOf = function(coOrdinate){
	return [coOrdinate[0] + 1, coOrdinate[1]];
};

var leftCoOrdinateOf = function(coOrdinate){
	return [coOrdinate[0], coOrdinate[1] - 1];
};

var getEdges = function(region){
	var coOrdinates = region.coOrdinates;

	return coOrdinates.filter(function(coOrdinate){
		var allAdjacents = [topCoOrdinateOf(coOrdinate), rightCoOrdinateOf(coOrdinate), bottomCoOrdinateOf(coOrdinate), leftCoOrdinateOf(coOrdinate)];
		return !allAdjacents.every(function(element){
			return region.hasCoOrdinate(element);
		});
	});
};

d.Region = function(color, coOrdinate) {
	var self = this;

	self.color = color;
	self.coOrdinates = [coOrdinate];
	self.addCoOrdinate = function(coOrdinate) {
		self.coOrdinates.push(coOrdinate);
	};

	self.toArray = function() {
		return [self.color, self.coOrdinates];
	};
	self.isNeighborOf = function(that) {
		return self.coOrdinates.some(function(coOrdinate) {
			return isAdjacentToRegion(coOrdinate, that);
		});
	};
	self.getNeighbors = function(matrix) {
		var regions = allRegionsIn(matrix);
		var neighbors = regions.filter(function(region) {
			return self.isNeighborOf(region);
		});

		return neighbors.map(function(region) {
			return region.toArray();
		});
	};

	self.getEdges = function(){
		return getEdges(this);
	};

	self.hasCoOrdinate = function(otherCoOrdinate){
		return self.coOrdinates.some(function(coOrdinate){
			return coOrdinate[0] == otherCoOrdinate[0] && coOrdinate[1] == otherCoOrdinate[1];
		});
	};
};

d.belongsToRegion = function(coOrdinate, color, region) {
	return region.color == color && isAdjacentToRegion(coOrdinate, region);
};

d.assignToRegion = function(coOrdinate, color, regions) {
	var regionFound = false;
	regions.forEach(function(region) {
		if (d.belongsToRegion(coOrdinate, color, region)) {
			region.addCoOrdinate(coOrdinate);
			regionFound = true;
		}
	});
	if(!regionFound) {
		var region = new d.Region(color, coOrdinate);
		regions.push(region);
	}
};

exports.d = d;