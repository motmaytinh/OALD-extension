var process = function (a) {
    return a.replace(/[`~!@#$%^&*()_|+=?;:",<>\{\}\[\]]/gi, "")
},
    do_query = function () {
        var word = process(window.getSelection().toString());
        console.log(word);
        chrome.runtime.sendMessage({"message": "open_new_tab", "word": word});
    };

document.addEventListener("dblclick", do_query)