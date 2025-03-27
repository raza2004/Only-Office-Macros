(function() {
    var doc = Api.GetDocument();
    var paragraphs = doc.GetAllParagraphs();
    var removedCount = 0;

    paragraphs.forEach((paragraph) => {
        let text = paragraph.GetText(); // Save existing text
        paragraph.RemoveAllElements(); // Remove all elements

        let cleanText = text.replace(/☐|☑/g, "").trim(); // Remove only checkbox symbols

        if (cleanText) { // Only re-add text if there's something left
            let run = Api.CreateRun();
            run.AddText(cleanText);
            paragraph.AddElement(run);
        } else {
            removedCount++; // Count removed checkbox-only paragraphs
        }
    });

    console.log("Checkbox Remover complete. Removed " + removedCount + " checkbox-only paragraph(s).");
})();

//
(function () {
    var doc = Api.GetDocument();
    var allForms = doc.GetAllForms();
    var removedCount = 0;

    console.log("All Forms:", allForms);

    // Iterate over all forms and remove checkboxes
    for (var i = allForms.length - 1; i >= 0; i--) { // Loop in reverse to prevent shifting issues
        var form = allForms[i];

        try {
            if (form.GetFormType() === "checkBox") {  // Identify checkboxes
                console.log("Removing checkbox at index:", i);
                doc.RemoveElement(i); // Remove checkbox
                removedCount++;
            }
        } catch (error) {
            console.error("Error removing element at index", i, error);
        }
    }

    console.log(`Removed ${removedCount} checkboxes successfully!`);
})();
//
