!function () {

    var do_query = function () {
        var word = window.getSelection().toString();
        console.log(word);
        var url = "https://cors.io/?https://www.oxfordlearnersdictionaries.com/search/english/direct/?q=" + word;

        get_HTML(word, url);
    };

    document.addEventListener("dblclick", do_query)

    /**
     * to show a floating dialog displaying the given dom element
     * @param {Object} title "title of the dialog"
     * @param {Object} element "the element will be set as content of the dialog"
     */
    function display_DOM(title, element, callback) {
        if (!element) {
            throw "the elment must be specified";
        }

        console.log(element)

        // initializing dialog: title, close, content
        var container = document.createElement("div");
        var titleContainer = document.createElement("div");
        var contentContainer = document.createElement("div");
        var closeContainer = document.createElement("span");
        container.setAttribute("id", "sampleDialog");
        titleContainer.setAttribute("id", "title");
        closeContainer.setAttribute("id", "close");
        contentContainer.setAttribute("id", "content");
        titleContainer.innerHTML = title;
        closeContainer.innerHTML = "X";

        container.appendChild(titleContainer);
        contentContainer.appendChild(element);
        container.appendChild(contentContainer);
        container.appendChild(closeContainer);
        document.body.appendChild(container);
        // place the container in the center of the browser window
        center(container);
        closeContainer.style.left = (container.offsetWidth - 20) + "px";

        // binding mouse events
        closeContainer.onclick = function (evt) {
            if (container._overlay) {
                container._overlay.parentNode.removeChild(container._overlay);
            }

            container.parentNode.removeChild(container);
            // calling the callback function to notify the dialog closed  
            if (callback) {
                callback.call(container);
            }
            evt.stopPropagation();
        };

        // start dragging when the mouse clicked in the title area
        titleContainer.onmousedown = function (evt) {
            evt = evt || window.event;

            container._dragging = true;
            container._originalLeft = container.offsetLeft;
            container._originalTop = container.offsetTop;
            container._mouseLeft = evt.clientX;
            container._mouseTop = evt.clientY;
        };

        // do the dragging during the mouse move
        document.onmousemove = function (evt) {
            evt = evt || window.event;

            if (container._dragging) {
                container.style.left =
                    (container._originalLeft + evt.clientX - container._mouseLeft) + "px";
                container.style.top =
                    (container._originalTop + evt.clientY - container._mouseTop) + "px";
            }
        };

        // finish the dragging when release the mouse button
        document.onmouseup = function (evt) {
            evt = evt || window.event;

            if (container._dragging) {
                container.style.left =
                    (container._originalLeft + evt.clientX - container._mouseLeft) + "px";
                container.style.top =
                    (container._originalTop + evt.clientY - container._mouseTop) + "px";

                container._dragging = false;
            }
        };

        return container;
    };

    function center(element) {
        if (element) {
            element.style.left = (window.innerWidth - element.offsetWidth) / 2 + "px";
            element.style.top = (window.innerHeight - element.offsetHeight) / 2 + "px";
        }
    }

    function get_HTML(word, url) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var tmp = document.createElement('html');
                tmp.innerHTML = xhr.responseText;

                var iframe = document.createElement("iframe");
                iframe.src = url;
                iframe.width = "100%";
                iframe.height = "600px";
                iframe.sandbox = "allow-same-origin allow-scripts";
                document.body.appendChild(display_DOM(word, iframe));
            }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    }
}();