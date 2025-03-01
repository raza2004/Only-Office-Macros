(function() {
    var doc = Api.GetDocument();
    var paragraphs = doc.GetAllParagraphs();

    // Define the target word to format and build a regex for it (case-insensitive).
    var targetWord = "easily integrated";
    var targetRegex = new RegExp("(" + targetWord + ")", "gi"); // capturing group for the word

    // Define custom styling settings for the target word.
    var customStyle = {
        font: "Georgia",         // Ensure your API supports SetFont
        size: 25,
        bold: true,
        italic: true,
        color: { r: 255, g: 111, b: 61 }  // color in RGB format
    };

    // Process each paragraph.
    paragraphs.forEach(function(paragraph) {
        var text = paragraph.GetText();
        if (!text) return; // Skip empty paragraphs

        // Split the paragraph text into segments, where each occurrence of the target word is captured.
        var segments = text.split(targetRegex);
        
        // Remove all current elements in the paragraph.
        paragraph.RemoveAllElements();

        // Process each segment.
        segments.forEach(function(segment) {
            // Create a new run for this text segment.
            var run = Api.CreateRun();
            run.AddText(segment);

            // If this segment matches the target word (case-insensitive), apply custom styling.
            if (segment.toLowerCase() === targetWord.toLowerCase()) {
                run.SetFontFamily(customStyle.font);
                run.SetFontSize(customStyle.size);
                run.SetBold(customStyle.bold);
                run.SetItalic(customStyle.italic);
                run.SetColor(customStyle.color.r, customStyle.color.g, customStyle.color.b, false); // Corrected color method
            }
            
            // Append the run to the paragraph.
            paragraph.AddElement(run);
        });
    });

    console.log("Dynamic formatting applied.");
})();
