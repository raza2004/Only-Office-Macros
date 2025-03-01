(function () {
    // Get the document object.
    var oDoc = Api.GetDocument();
    
    // Retrieve all form fields from the document.
    var aForms = oDoc.GetAllForms();
    
    // Initialize counters.
    var fieldCount = aForms.length;
    var fieldTypes = {
        textForm: 0,
        pictureForm: 0,
        checkboxForm: 0,
        comboBoxForm: 0,
        radioButtonForm: 0,
        complexForm: 0,
        other: 0
    };
    
    // Iterate through all form fields.
    for (var i = 0; i < fieldCount; i++) {
        var field = aForms[i];
        var type = field.GetFormType(); // e.g. "textForm", "pictureForm", etc.
        
        // Increment the corresponding counter if known, else count as "other".
        if (fieldTypes.hasOwnProperty(type)) {
            fieldTypes[type]++;
        } else {
            fieldTypes.other++;
        }
    }
    
    // Create a result message.
    var result =
        "Total Form Fields: " + fieldCount + "\n\n" +
        "Field Type Breakdown:\n" +
        "- Text Forms: " + fieldTypes.textForm + "\n" +
        "- Picture Forms: " + fieldTypes.pictureForm + "\n" +
        "- Checkbox Forms: " + fieldTypes.checkboxForm + "\n" +
        "- Combo Box Forms: " + fieldTypes.comboBoxForm + "\n" +
        "- Radio Button Forms: " + fieldTypes.radioButtonForm + "\n" +
        "- Complex Forms: " + fieldTypes.complexForm + "\n" +
        "- Other Form Fields: " + fieldTypes.other;
    
    //Log the result to the console.
    console.log(result); 

   // Comment the below code if you wants to see the results only in the console.

    var oParagraph = Api.CreateParagraph();
    oParagraph.AddText(result);
   
    oParagraph.SetFontSize(20);
    oParagraph.SetBold(true);
    oParagraph.SetJc("center");
    oDoc.Push(oParagraph);
    Api.Save();

})();
