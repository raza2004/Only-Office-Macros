(function () {
    var oWorksheet = Api.GetActiveSheet(); // Get the active worksheet
    var totalRows = 100; // Adjust based on spreadsheet size
    var totalCols = 100; // Adjust based on spreadsheet size
    var predefinedComment = "Comment 1"; // Define the comment text to delete

    for (var row = 0; row <= totalRows; row++) {
        for (var col = 0; col <= totalCols; col++) {
            var cell = oWorksheet.GetRangeByNumber(row, col); // Get cell
            var oComment = cell.GetComment(); // Get comment if exists

            if (oComment && oComment.GetText() === predefinedComment) {
                oComment.Delete(); // Delete only if it matches the predefined text
            }
        }
    }
})();
