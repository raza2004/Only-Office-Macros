(function() {
    var sheet = Api.GetActiveSheet();

    // Get the used range (e.g., "A1:Z100") and determine its end cell.
    var usedRange = sheet.GetUsedRange();
    var usedAddress = usedRange.GetAddress(); // e.g., "A1:Z100"
    var parts = usedAddress.split(":");
    var endCell = parts[1]; // e.g., "Z100"

    // Define the target range starting at B2 through the last used cell.
    var startRow = 2;
    var startCol = 2; // Column B is 2 (A=1, B=2, etc.)
    var targetRangeAddress = "B2:" + endCell;
    var data = sheet.GetRange(targetRangeAddress).GetValue(); // 2D array
    if (!data || data.length === 0) {
        console.log("No data found in range " + targetRangeAddress);
        return;
    }
    var numRows = data.length;
    var numCols = data[0].length;

    // Determine expected type for each column using majority vote:
    // For each column, count how many cells are numeric vs. non-numeric.
    var expectedTypes = [];
    for (var j = 0; j < numCols; j++) {
        var countNumeric = 0, countText = 0;
        for (var i = 0; i < numRows; i++) {
            var cellValue = data[i][j];
            // Skip empty cells.
            if (cellValue === null || cellValue === "") continue;
            // If parseFloat yields a number, count as numeric.
            if (!isNaN(parseFloat(cellValue))) {
                countNumeric++;
            } else {
                countText++;
            }
        }
        // If numeric cells are more (or equal), expected type is "number"; otherwise "text".
        expectedTypes.push(countNumeric >= countText ? "number" : "text");
    }

    // Helper: Convert a 1-indexed column number to a column letter.
    function getColumnLetter(colNum) {
        var letter = "";
        while (colNum > 0) {
            var mod = (colNum - 1) % 26;
            letter = String.fromCharCode(65 + mod) + letter;
            colNum = Math.floor((colNum - mod) / 26);
        }
        return letter;
    }

    // For each cell in the target range, check if its type matches the expected type.
    // If not, highlight that cell.
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var cellValue = data[i][j];
            var expectedType = expectedTypes[j];
            var mismatch = false;

            if (expectedType === "number") {
                // For numeric columns, non-empty cells that cannot be parsed as numbers are mismatches.
                if (cellValue !== null && cellValue !== "" && isNaN(parseFloat(cellValue))) {
                    mismatch = true;
                }
            } else { // expected type "text"
                // For text columns, non-empty cells that parse as a number are mismatches.
                if (cellValue !== null && cellValue !== "" && !isNaN(parseFloat(cellValue))) {
                    mismatch = true;
                }
            }

            if (mismatch) {
                // Compute the absolute cell address.
                var absRow = startRow + i;
                var absCol = startCol + j; // 1-indexed
                var cellAddress = getColumnLetter(absCol) + absRow;
                var cell = sheet.GetRange(cellAddress);
                // Highlight the mismatched cell using the correct syntax.
                cell.SetFillColor(Api.CreateColorFromRGB(255, 213, 191));
            }
        }
    }

    console.log("Data mismatch check complete in range " + targetRangeAddress);
})();
