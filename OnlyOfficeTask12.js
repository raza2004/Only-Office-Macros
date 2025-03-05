/**
     * Data Mismatch Checker
     * This macro highlights cells that do not match the expected data type of their column.
     * Expected data type is determined by majority vote per column.
     * 
     * By default:
     * - The macro assumes the first column contains headers and excludes it from checking.
     * - The macro also assumes the first row contains headers and starts checking from B2.
     * 
     * You can change this behavior by modifying `useHeaderOffset` below.
     */

(function() {
    var sheet = Api.GetActiveSheet();

    // Get the used range (e.g., "A1:Z100") and its address.
    var usedRange = sheet.GetUsedRange();
    var usedAddress = usedRange.GetAddress(); // e.g., "A1:Z100"
    var parts = usedAddress.split(":");
    var endCell = parts[1]; // e.g., "Z100"

    // Optional: Use header offset if your table has header row/column.
    // Set useHeaderOffset = true to start at B2 (skip headers), false to use entire used range.
    var useHeaderOffset = true; 

    var targetRangeAddress, startRow, startCol;
    if (useHeaderOffset) {
        startRow = 2;  // Data starts at row 2 (header in row 1)
        startCol = 2;  // Data starts at column B (header in column A)
        targetRangeAddress = "B2:" + endCell;
    } else {
        startRow = 1;
        startCol = 1;
        targetRangeAddress = usedAddress;
    }
    
    var range = sheet.GetRange(targetRangeAddress);
    var data = range.GetValue(); // 2D array of values
    if (!data || data.length === 0) {
        console.log("No data found in range " + targetRangeAddress);
        return;
    }
    var numRows = data.length;
    var numCols = data[0].length;

    // Determine the expected data type for each column using a majority vote.
    // For each column, count numeric vs. text cells.
    var expectedTypes = [];
    for (var j = 0; j < numCols; j++) {
        var countNumeric = 0, countText = 0;
        for (var i = 0; i < numRows; i++) {
            var cellValue = data[i][j];
            if (cellValue === null || cellValue === "") continue;
            if (!isNaN(parseFloat(cellValue))) {
                countNumeric++;
            } else {
                countText++;
            }
        }
        expectedTypes.push(countNumeric >= countText ? "number" : "text");
    }

    // Helper: Convert a 1-indexed column number to its corresponding letter.
    function getColumnLetter(colNum) {
        var letter = "";
        while (colNum > 0) {
            var mod = (colNum - 1) % 26;
            letter = String.fromCharCode(65 + mod) + letter;
            colNum = Math.floor((colNum - mod) / 26);
        }
        return letter;
    }

    // Check each cell in the target range and highlight if its data type doesn't match the expected type.
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var cellValue = data[i][j];
            var expectedType = expectedTypes[j];
            var mismatch = false;
            
            if (expectedType === "number") {
                // For a numeric column, mark as mismatch if a non-empty cell cannot be parsed as a number.
                if (cellValue !== null && cellValue !== "" && isNaN(parseFloat(cellValue))) {
                    mismatch = true;
                }
            } else { // expected type "text"
                // For a text column, mark as mismatch if a non-empty cell is numeric.
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
                // Highlight the mismatched cell with the proper syntax.
                cell.SetFillColor(Api.CreateColorFromRGB(255, 213, 191));
            }
        }
    }
    
    console.log("Data mismatch check complete in range " + targetRangeAddress);
})();

