// Watermark Inserter/Remover: Insert/Remove a custom watermark on every page across the entire document.
(function () {
  var doc = Api.GetDocument();
  var action = "insert";      // Put insert or remove

  if (action === "insert") {
    // Retrieve the current watermark settings.
    var watermarkSettings = doc.GetWatermarkSettings();
    // Set watermark type to text.
    console.log(watermarkSettings.GetType, "sett");
    watermarkSettings.SetType("text");
    // Set the watermark text.
    watermarkSettings.SetText("Example Watermark");

    // Get the text properties and apply custom styling.
    var textPr = watermarkSettings.GetTextPr();
    textPr.SetFontFamily("Calibri");
    textPr.SetFontSize(48); // Set a custom font size (change from default -1 to a specific value)
    textPr.SetDoubleStrikeout(true);
    textPr.SetItalic(true);
    textPr.SetBold(true);
    textPr.SetUnderline(true);
    // Use SetColor(r, g, b, isAuto) to set the text color (green in this case).
    textPr.SetColor(0, 255, 0, false);
    // Set the highlight color (e.g., blue).
    textPr.SetHighlight("blue");

    // Update the watermark settings with the modified text properties.
    watermarkSettings.SetTextPr(textPr);
    doc.SetWatermarkSettings(watermarkSettings);
  }
  // (Optional) To remove the watermark, uncomment the following block:
  else if (action === "remove") {
    doc.RemoveWatermark();
  }

  console.log("Watermark processing complete.");
})();
