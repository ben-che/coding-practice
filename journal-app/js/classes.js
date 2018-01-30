// constructors for Journal and Entry

function Journal(name, entries) {
    this.name = name;
    this.entries = entries;
    this.addEntry = function(title, content, author) {
        this.entries.unshift(new Entry(title, content, author));        // adds item to index 0 of array
    }
    this.displayEntries = function() {
        console.log(this.entries);
    }
}

function Entry(title, content, author) {
    this.title=title;
    this.content=content;
    this.author=author;
}

// debugging

// tests for journal constructor
let journalExample = new Journal('journal_name', []);
console.log(journalExample.name + ' is the name of the journal');
console.log(journalExample.entries + ' should be an empty array');

// tests for entry constructor
let entryExample = new Entry('entry_title_1', 'entry_1_content','ben');
console.log(entryExample.title + ' is the title of the entry, and ' + entryExample.content + ' is the content, and ' + entryExample.author + ' is the author');

// tests for journal methods
journalExample.addEntry('entry_title_2', ' entry_content_2', 'entry_author');
journalExample.addEntry('entry_title_3', ' entry_content_3', 'entry_author');
console.log('test for addEntry method: ');
console.log(journalExample.entries);

console.log('test for displayEntry method: ');
journalExample.displayEntries();


// define main journal object for use
let journalMain = new Journal('Main Journal Object', []);