// jQuery to add and remove entries

// wait until the document is ready before we start manipulating the DOM
$(document).ready(() => {

  // store elements in form
  $('#submit-entry').click(function() {
    console.log('submit has been clicked'); //debugging

    // collect inputs from form
    var title=$('#title').val();
    var content=$('#content').val();
    var author=$('#author').val();

    // add form input to journal object //
    journalMain.addEntry(title, content, author);

    // debugging : ensure that input is successfully added to journal object
    console.log('the following has been submitted and added to journal obj:');
    console.log('title of entry is: ' + journalMain.entries[0].title);
    console.log('content of entry is: ' + journalMain.entries[0].content);
    console.log('author of entry is: ' + journalMain.entries[0].author);

    // stops page from reloading upon submit
    event.preventDefault(); 

    // add items to the actual dom




  }) // close submit forms function

}) // close document ready function