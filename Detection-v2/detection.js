var d = {};

d.CoOrdinate = function(row, column, color) {
	this.color = color;
	this.row = row;
	this.column = column;

	this.top = function() {
		return new d.CoOrdinate(this.row - 1, this.column);
	};
	this.right = function() {
		return new d.CoOrdinate(this.row, this.column + 1);
	};
	this.bottom = function() {
		return new d.CoOrdinate(this.row + 1, this.column);
	};
	this.left = function() {
		return new d.CoOrdinate(this.row, this.column - 1);
	};
	this.toArray = function() {
		return [row, column];
	};
	this.isEqualTo = function(that) {
		return this.row == that.row && this.column == that.column;
	};
	this.isAdjacentTo = function(that) {
		return this.top().isEqualTo(that) || this.right().isEqualTo(that) || this.bottom().isEqualTo(that) || this.left().isEqualTo(that);
	};
};

var getEdges = function(region) {
	var coOrdinates = region.coOrdinates;

	var result = coOrdinates.filter(function(coOrdinate) {
		var adjacentCoOrdinates = [coOrdinate.top(), coOrdinate.right(), coOrdinate.bottom(), coOrdinate.left()];
		return !adjacentCoOrdinates.every(function(element) {
			return region.hasCoOrdinate(element);
		});
	});
	return result.map(function(coOrdinate) {
		return coOrdinate.toArray();
	});
};

d.belongsToRegion = function(coOrdinate, region) {
	return region.color == coOrdinate.color && region.isAdjacentTo(coOrdinate);
};

d.Region = function(coOrdinate) {
	var self = this;

	self.color = coOrdinate.color;
	self.coOrdinates = [coOrdinate];
	self.addCoOrdinate = function(coOrdinate) {
		self.coOrdinates.push(coOrdinate);
	};

	self.toArray = function() {
		var coOrdinates = self.coOrdinates.map(function(coOrdinate) {
			return coOrdinate.toArray();
		});
		return [self.color, coOrdinates];
	};

	self.isAdjacentTo = function(coOrdinate) {
		return self.coOrdinates.some(function(coOrdinateTwo) {
			return coOrdinate.isAdjacentTo(coOrdinateTwo);
		});
	};

	self.isNeighborOf = function(that) {
		return self.coOrdinates.some(function(coOrdinate) {
			return that.isAdjacentTo(coOrdinate);
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

	self.getEdges = function() {
		return getEdges(this);
	};

	self.hasCoOrdinate = function(otherCoOrdinate) {
		return self.coOrdinates.some(function(coOrdinate) {
			return coOrdinate.isEqualTo(otherCoOrdinate);
		});
	};
};

d.assignToRegion = function(coOrdinate, regions) {
	var regionFound = false;
	regions.forEach(function(region) {
		if (d.belongsToRegion(coOrdinate, region)) {
			region.addCoOrdinate(coOrdinate);
			regionFound = true;
		}
	});
	if (!regionFound)
		regions.push(new d.Region(coOrdinate));
};

var allRegionsIn = function(matrix) {
	var regions = [];
	matrix.forEach(function(row, rowNumber) {
		row.forEach(function(color, columnNumber) {
			var coOrdinate = new d.CoOrdinate(rowNumber, columnNumber, color);
			d.assignToRegion(coOrdinate, regions);
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

exports.d = d;