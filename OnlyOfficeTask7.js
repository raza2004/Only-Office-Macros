(function () {
    // Get the active document
    const editor = Api.GetDocument();
  
    // Get all paragraphs in the document
    const paragraphs = editor.GetAllParagraphs();
  
    // Process each paragraph
    paragraphs.forEach((paragraph) => {
      let text = paragraph.GetText();
      if (!text) return; // Skip empty paragraphs
  
      // Use a regular expression to capture the first sentence.
      // This regex looks for the first occurrence of a period, exclamation mark, or question mark,
      // followed by a space or the end of the string.
      let match = text.match(/(.*?[.!?](\s|$))/);
      let firstSentence = "";
      let remainder = "";
      if (match) {
        firstSentence = match[0];
        remainder = text.substring(firstSentence.length);
      } else {
        // If no sentence-ending punctuation is found, treat the entire text as the first sentence.
        firstSentence = text;
        remainder = "";
      }
  
      // Clear the existing content of the paragraph.
      paragraph.RemoveAllElements();
  
      // Create a run for the first sentence and set it to bold.
      const runBold = Api.CreateRun();
      runBold.AddText(firstSentence);
      runBold.SetBold(true);
      paragraph.AddElement(runBold);
  
      // If there's remaining text, create another run for it in normal style.
      if (remainder.trim().length > 0) {
        const runNormal = Api.CreateRun();
        runNormal.AddText(remainder);
        runNormal.SetBold(false);
        paragraph.AddElement(runNormal);
      }
    });
  
    // Save the document.
    Api.Save();
  })();
  