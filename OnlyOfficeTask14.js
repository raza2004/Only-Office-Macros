(function() {
    // Specify the trigger phrase for splitting (case-insensitive).
    var triggerPhrase = "SPLIT HERE";
    var doc = Api.GetDocument();
    var paragraphs = doc.GetAllParagraphs();
    var newParagraphs = []; // To store new paragraphs to be added.

    // Process each paragraph.
    paragraphs.forEach(function(paragraph) {
        var text = paragraph.GetText();
        if (!text) return; // Skip empty paragraphs.

        // Split paragraph into sentences using punctuation.
        var sentences = text.split(/(?<=[.!?])\s+/);
        var currentParagraph = Api.CreateParagraph();

        sentences.forEach(function(sentence) {
            // Check if the sentence contains the trigger phrase (case-insensitive).
            var pos = sentence.toLowerCase().indexOf(triggerPhrase.toLowerCase());
            if (pos !== -1) {
                // Split the sentence at the trigger phrase.
                var beforePhrase = sentence.substring(0, pos);
                var afterPhrase = sentence.substring(pos + triggerPhrase.length);

                // Add the part before the trigger phrase to the current paragraph.
                if (beforePhrase.trim()) {
                    var runBefore = Api.CreateRun();
                    runBefore.AddText(beforePhrase.trim());
                    currentParagraph.AddElement(runBefore);
                }

                // Finalize the current paragraph and add it to the new paragraphs list.
                if (currentParagraph.GetText().trim()) {
                    newParagraphs.push(currentParagraph);
                }

                // Create a new paragraph starting with the trigger phrase.
                var newPara = Api.CreateParagraph();
                var runTrigger = Api.CreateRun();
                runTrigger.AddText(triggerPhrase + " "); // Add a space after the trigger phrase.
                newPara.AddElement(runTrigger);

                // Add the part after the trigger phrase to the new paragraph.
                if (afterPhrase.trim()) {
                    var runAfter = Api.CreateRun();
                    runAfter.AddText(afterPhrase.trim());
                    newPara.AddElement(runAfter);
                }

                // Add the new paragraph to the list.
                newParagraphs.push(newPara);

                // Start a new current paragraph for subsequent sentences.
                currentParagraph = Api.CreateParagraph();
            } else {
                // If the sentence doesn't contain the trigger phrase, add it to the current paragraph.
                var run = Api.CreateRun();
                run.AddText(sentence);
                currentParagraph.AddElement(run);
            }
        });

        // If there's remaining text in the current paragraph, add it to the new paragraphs list.
        if (currentParagraph.GetText().trim()) {
            newParagraphs.push(currentParagraph);
        }
    });

    // Clear the document and insert the new paragraphs.
    doc.RemoveAllElements();
    newParagraphs.forEach(function(para) {
        doc.Push(para);
    });

    console.log("Text Splitter complete. " + newParagraphs.length + " paragraph(s) created.");
})();
