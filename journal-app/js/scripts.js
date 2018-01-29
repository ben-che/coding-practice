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

    var parent = $('div#divJournal');

    //  create a string that expresses the html element we want to insert

    var newElement = "<div class='journal-item'> <h1 class='journal-title'> " + journalMain.entries[0].title + " </h1> <p class='journal-content'> " + journalMain.entries[0].content + "</p> <p class='journal-author'> " +journalMain.entries[0].author + "</div>";
    //  Call the append() method of the parent element,
    //    supplying a string argument that describes
    //    the new html element we are adding
    $('div#divJournal').append(newElement);
  
    




  }) // close submit forms function

}) // close document ready function