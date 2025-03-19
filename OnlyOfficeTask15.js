(function() {
    var doc = Api.GetDocument();
    var forms = doc.GetAllForms();
    
    // Loop through all form fields.
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        // Check for checkbox form type (assumed type string is "checkboxForm")
        
        if(form.GetFormType() === "checkBoxForm") {
            // If the checkbox is checked, uncheck it.
            if(form.IsChecked()) {
                form.SetChecked(false);
            }
        }
    }
    console.log("CheckboxForm Unchecker complete.");
})();
