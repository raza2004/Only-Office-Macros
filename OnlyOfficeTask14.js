(function() {
    var triggerPhrase = "SPLIT HERE";
    var doc = Api.GetDocument();
    var paragraphs = doc.GetAllParagraphs();
    var newParagraphs = [];

    // Process each paragraph.
    paragraphs.forEach(function(paragraph) {
        var text = paragraph.GetText().trim();
        if (!text) return; // Skip empty paragraphs.

        // Split paragraph into sentences using punctuation.
        var sentences = text.split(/(?<=[.!?])\s+/);
        var currentParagraph = Api.CreateParagraph();

        sentences.forEach(function(sentence) {
            var pos = sentence.toLowerCase().indexOf(triggerPhrase.toLowerCase());
            if (pos !== -1) {
                var beforePhrase = sentence.substring(0, pos);
                var afterPhrase = sentence.substring(pos + triggerPhrase.length);

                if (beforePhrase.trim()) {
                    var runBefore = Api.CreateRun();
                    runBefore.AddText(beforePhrase.trim());
                    currentParagraph.AddElement(runBefore);
                }

                if (currentParagraph.GetText().trim()) {
                    newParagraphs.push(currentParagraph);
                }

                var newPara = Api.CreateParagraph();
                var runTrigger = Api.CreateRun();
                runTrigger.AddText(triggerPhrase + " ");
                newPara.AddElement(runTrigger);

                if (afterPhrase.trim()) {
                    var runAfter = Api.CreateRun();
                    runAfter.AddText(afterPhrase.trim());
                    newPara.AddElement(runAfter);
                }

                newParagraphs.push(newPara);
                currentParagraph = Api.CreateParagraph();
            } else {
                var run = Api.CreateRun();
                run.AddText(sentence);
                currentParagraph.AddElement(run);
            }
        });

        if (currentParagraph.GetText().trim()) {
            newParagraphs.push(currentParagraph);
        }
    });

    // Clear the document and insert the new paragraphs.
    doc.RemoveAllElements();
    newParagraphs.forEach(function(para) {
        doc.Push(para);
    });

    // Remove leading empty paragraphs.
    var firstParagraph = doc.GetElement(0);
    while (firstParagraph && !firstParagraph.GetText().trim()) {
        doc.RemoveElement(0);
        firstParagraph = doc.GetElement(0);
    }

    console.log("Text Splitter complete. " + newParagraphs.length + " paragraph(s) created.");
})();
