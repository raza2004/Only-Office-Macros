(function() {
    // Get the active worksheet.
    var oWorksheet = Api.GetActiveSheet();

    // Insert the formula into cell H2.
    // This calls the custom function 'weightedAverage' that was registered above.
    oWorksheet.GetRange("H2").SetValue("=WEIGHTED_AVERAGE(E2:E6, F2:F6)");

    // Optionally, insert a label in cell G2.
    oWorksheet.GetRange("G2").SetValue("Average:");
})();
