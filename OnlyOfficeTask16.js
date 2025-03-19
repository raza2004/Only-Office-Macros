// Changes the color of input fields in whole form on focus. 
(function () {
    // Retrieve the current document
    var doc = Api.GetDocument();

    // Define the desired background color, final result will be the RGB code. (e.g., light blue)
    var red = 171;
    var green = 242;
    var blue = 255;

    // Get all form fields in the document
    var formFields = doc.GetAllForms();

    // Iterate through each form field and set the background color
    for (var i = 0; i < formFields.length; i++) {
        var field = formFields[i];
        field.SetBackgroundColor(red, green, blue);
    }

    console.log("Background color of all form fields has been updated.");
})();
