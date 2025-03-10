(function() {
    var threshold = 20; // Word count threshold for a long sentence.
    var doc = Api.GetDocument();
    var paragraphs = doc.GetAllParagraphs();

    paragraphs.forEach(function(paragraph) {
        var text = paragraph.GetText();
        if (!text) return; // Skip empty paragraphs.

        // Split paragraph into sentences using punctuation.
        var sentences = text.split(/(?<=[.!?])\s+/);
        // Remove existing elements so we can rebuild the paragraph.
        paragraph.RemoveAllElements();

        sentences.forEach(function(sentence, idx) {
            // Create a run for this sentence.
            var run = Api.CreateRun();
            run.AddText(sentence + (idx < sentences.length - 1 ? " " : ""));
            // Add the run to the paragraph.
            paragraph.AddElement(run);
            
            // Count words in the sentence.
            var wordCount = sentence.split(/\s+/).filter(function(word) {
                return word.trim() !== "";
            }).length;
            
            // If the sentence exceeds the threshold, add a comment to the run.
            if (wordCount > threshold) {
                var commentText = "Long sentence (" + wordCount + " words) detected. Consider rewording.";
                // Add comment to the run.
                Api.AddComment(run, commentText, "System");
            }
        });
    });

    console.log("Long Sentence Finder complete with sentence-specific comments.");
})();
