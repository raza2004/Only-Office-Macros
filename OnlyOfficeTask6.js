(function () {
    let doc = Api.GetDocument();
    let comments = doc.GetAllComments();
    
    // Define the keyword to search for in comment texts
    const keyword = "solve"; 
    let solvedCount = 0;

    // Toggle case sensitivity:
    // If case-insensitive, uncomment the next line:
    // const keywordLower = keyword.toLowerCase();

    // Loop over each comment
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        let commentText = comment.GetText();

        // Apply case-insensitive check if keywordLower is defined
        // Otherwise, use exact case-sensitive match
        if (typeof keywordLower !== "undefined") {
            if (commentText.toLowerCase().indexOf(keywordLower) !== -1) {
                comment.SetSolved(true);
                solvedCount++;
            }
        } else {
            if (commentText.indexOf(keyword) !== -1) {
                comment.SetSolved(true);
                solvedCount++;
            }
        }
    }

    console.log("Total solved comments:", solvedCount);
})();
