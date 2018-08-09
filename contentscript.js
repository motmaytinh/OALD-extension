var do_query = function () {
        var word = window.getSelection().toString();
        // console.log(word);
        chrome.runtime.sendMessage({"word": word});
    };

document.addEventListener("dblclick", do_query)