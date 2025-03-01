# **ONLYOFFICE Macros Guide**

## **Introduction to ONLYOFFICE**
ONLYOFFICE is a powerful, open-source office suite that provides a comprehensive set of tools for document editing, collaboration, and project management. It supports a wide range of file formats, including DOCX, XLSX, PPTX, and more. ONLYOFFICE is widely used for creating, editing, and sharing documents, spreadsheets, and presentations in real-time, making it an excellent choice for teams and businesses.

One of the standout features of ONLYOFFICE is its **macros** functionality, which allows users to automate repetitive tasks, customize workflows, and extend the capabilities of the office suite.

---

## **What are Macros in ONLYOFFICE?**
Macros in ONLYOFFICE are small scripts written in **JavaScript** that automate tasks within documents, spreadsheets, or presentations. They enable users to:
- Automate repetitive tasks (e.g., formatting, data entry, calculations).
- Create custom functions and tools.
- Enhance productivity by reducing manual effort.
- Integrate with external APIs or services.

Macros can be used to manipulate document content, interact with UI elements, and even connect to external data sources. They are particularly useful for advanced users, developers, and businesses looking to streamline their workflows.

---

## **How to Run Macros in ONLYOFFICE**
Running macros in ONLYOFFICE is simple and can be done in a few steps:

### **1. Enable Macros**
Before running macros, ensure that macros are enabled in your ONLYOFFICE instance:
1. Open the ONLYOFFICE editor (Document, Spreadsheet, or Presentation).
2. Go to **View** > **Macros**.
3. Enable the **Macros** plugin if it’s not already enabled.

### **2. Create or Load a Macro**
You can either write your own macro or load an existing one:
- **Write a Macro**: Use the built-in macro editor to write JavaScript code.
- **Load a Macro**: Import a pre-written macro file (`.js`).

### **3. Run the Macro**
Once the macro is ready:
1. Open the document where you want to run the macro.
2. Go to **View** > **Macros**.
3. Select the macro from the list and click **Run**.

### **4. Debugging and Testing**
- Use the **Console** in the macro editor to debug your code.
- Test the macro on sample data to ensure it works as expected.

---

## **Example: Simple Macro**
Here’s an example of a macro that adds a "Hello, World!" text to a document:

```javascript
(function () {
    const oDocument = Api.GetDocument();
    const oParagraph = Api.CreateParagraph();
    oParagraph.AddText("Hello, World!");
    oDocument.Push(oParagraph);
})();
```

### **Steps to Run This Macro:**
1. Open a document in ONLYOFFICE.
2. Go to **View** > **Macros**.
3. Paste the code into the macro editor.
4. Click **Run** to execute the macro.

---

## **Best Practices for Writing Macros**
1. **Keep It Simple**: Write small, focused macros for specific tasks.
2. **Test Thoroughly**: Test macros on sample data before using them in production.
3. **Use Comments**: Add comments to explain the purpose of your code.
4. **Follow Security Guidelines**: Avoid using macros from untrusted sources to prevent security risks.

---

## **Conclusion**
ONLYOFFICE macros are a powerful tool for automating tasks and customizing your office suite experience. Whether you’re a developer or a power user, macros can help you save time and enhance productivity. Start experimenting with macros today to unlock the full potential of ONLYOFFICE!

For more information, visit the [ONLYOFFICE API Documentation](https://api.onlyoffice.com/).