// Sets a specific tip text to all the checkboxes with a certain key

(function () {
  var doc = Api.GetDocument();
  var allForms = doc.GetAllForms(); // Retrieve all form fields
  var targetKey = "CheckBox10"; // Specify the key of checkboxes to update
  var newTip = "Please update your marital status.";

  allForms.forEach(function (form) {
    // Check if this form is a checkbox and its key matches the target key.
    if (
      form.GetFormType() === "checkBoxForm" &&
      form.GetFormKey() === targetKey
    ) {
        
      form.SetTipText(newTip);
    
    }
  });

  console.log("Updated tip text for checkboxes with key: " + targetKey);
})();
