(function() {
    /**
     * Custom function that calculates the weighted average.
     * @customfunction
     * @param {Array} values An array (or range) of values.
     * @param {Array} weights An array (or range) of weights.
     * @returns {number} The weighted average.
     */
    function WEIGHTED_AVERAGE(values, weights) {
        console.log("start");
        // Flatten arrays if needed
        if (Array.isArray(values[0])) {
            values = values.map(function(row) { return row[0]; });
        }
        if (Array.isArray(weights[0])) {
            weights = weights.map(function(row) { return row[0]; });
        }
        // Check lengths
        if (values.length !== weights.length) {
            throw new Error("Values and weights arrays must have the same length.");
        }
        var weightedSum = 0;
        var totalWeight = 0;
        for (var i = 0; i < values.length; i++) {
            var v = parseFloat(values[i]);
            var w = parseFloat(weights[i]);
            if (!isNaN(v) && !isNaN(w)) {
                weightedSum += v * w;
                totalWeight += w;
            }
        }
        return totalWeight ? weightedSum / totalWeight : 0;
    }
    Api.AddCustomFunction(WEIGHTED_AVERAGE);
})();
