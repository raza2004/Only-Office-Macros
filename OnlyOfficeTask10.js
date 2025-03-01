(function () {
    var doc = Api.GetDocument();
    var paragraphs = doc.GetAllParagraphs();
    
    // Iterate backward through paragraphs to safely remove empty ones.
    for (var i = paragraphs.length - 1; i >= 0; i--) {
        var text = paragraphs[i].GetText().trim();
        if (text === "") {
            // Remove the empty paragraph.
            doc.RemoveElement(i);
        }
    }
    
    console.log("Empty paragraphs removed.");
  
})();
