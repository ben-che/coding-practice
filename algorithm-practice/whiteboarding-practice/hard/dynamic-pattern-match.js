// Given a text and a wildcard pattern, find if wildcard pattern is contained within text. 

// Text = "baaabab",
// Pattern = “*****ba*****ab", output : true
// Pattern = "baaa?ab", output : true
// Pattern = "ba*a?", output : true
// Pattern = "a*ab", output : false

// idea is that we should have markers for text and pattern and increment them when
//      it is a match - if we get to the end of the pattern, then return true, else
//      false:

// imperative:
let matchMe = (text, pattern) => {
    for (let i = 0; i < text.length; i++) {
        console.log(text[i])
        for (let j = 0; j <= pattern.length; j++) {
            let textMarker = 0;
            if (text[i+textMarker] !== pattern[j]) {
                console.log(textMarker, i)
                console.log(text[i+textMarker,pattern[j]])
                console.log('break')
                break;
            }
            textMarker += 1;
        }
    }
}

matchMe('baaabab', "baaabab")
// matchMe('baaabab', "ab")
// matchMe('baaabab', "baaabab")
// matchMe('baaabab', "abb")
// matchMe('baaabab', "aab")
