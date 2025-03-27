// Set current date to all date form fields in the document.

(function () {
  const doc = Api.GetDocument();
  const forms = doc.GetAllForms();
  const currentDate = new Date().toLocaleDateString();
  var paragraph = doc.GetElement(0);

  forms.forEach((form) => {
    if (form.GetFormType() === "dateForm") {
      form.SetFormat("dddd, dd MMMM yyyy");
      form.SetLanguage("en-CA");

      form.SetBackgroundColor(255, 0, 0);
    }
  });

  console.log("Date fields updated to current date.");
})();
