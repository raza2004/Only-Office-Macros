(function () {
    var doc = Api.GetDocument();
    var forms = doc.GetAllForms();
    var invalidCount = 0;

    forms.forEach((form) => {
        if (form.GetFormType() === "textForm" && form.IsRequired()) { // Restricting to text forms only
            var value = form.GetText();
            if (!value || value.toString().trim() === "") {
                form.SetBorderColor(255, 0, 0); // Red border for invalid field
                form.SetBackgroundColor(171, 242, 255); // Light blue background for better visibility
                invalidCount++;
            }
        }
    });

    console.log("Form Field Validator complete. " + invalidCount + " required text field(s) highlighted.");
})();
