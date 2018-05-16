# Explanation of Web-Data-View App
### WebDataExtractionNotation
###### Notation.js & query.js
+ This .js file generates visual models given query instance.
+ Extensible domain-specific language for querying DOM nodes that match given pattern.
+ Query object can be serialized to JSON, and vice-versa. It facilitates concise summarization of user interactions and enables crowd-sourcing for web data extraction.
+ Please refer to this: [https://github.com/zpahuja/WebDataView/blob/query-notation/docs/index.html](https://github.com/zpahuja/WebDataView/blob/query-notation/docs/index.html) for detailed description.
```
new WebDataExtractionNotation(notation: Array<Object>)
new Query(query: Object)
```

### ContentFrame
+ iFrame library for Chrome Extensions to create HTML elements that do not affect or be affected by the web page's CSS

+ Requires and interfaces with jQuery to allow developer to manipulate DOM of iFrame through body
```
new ContentFrame(options: Object, callback: Function)
```
+ Please refer to this: [https://github.com/zpahuja/WebDataView/blob/query-notation/docs/index.html](https://github.com/zpahuja/WebDataView/blob/query-notation/docs/index.html) for detailed description.

### append.js
+ Dummy function, not doing anything

### index.html
+ Html code for query.js, controls the layout of query panel
### label_delete.js
+ Dummy function, not doing anything
### notification.html & notification.js
+ Dummy function, not doing anything
### query.js
+ Contain callback function when recieve the query models sent from background.js
+ If "no connection", do...
+ If "feedback" (recieved a valid feedback from background.js), do ...
+ Also defines callback function when the forms are submitted.
### query_group.js & queryHandle.js
+ Not doing anything
### tooltip.js
+ include code for capability pop-up container
```
ContentFrame.findElementInContentFrame('#filter_class', '#webview-tooltip').click(function(e) { ... }
```
+ include callback function when user make any selection on the page:
```
function selectionHandler(event) { ... }
```
+ include function to append newly created field to widget:
```
appendLabel2Widget = function(labelName, labelColor) {
```
### widget.html
+ html code the control the layout and design of widget panel
### widget.js
+ Include callback function
+ Include callback function when user commit/apply a field:
```
select_apply.click(function(e){ ... }
```
+ Includes callback function when user click on grid button and export csv and send the model to server:
```
grid_view.click(function(e){ ... }
```
### background.js
+ Establish connection with Flask server:
```
 // socket = io.connect('http://127.0.0.1:5353/');
    socket = io.connect('http://kite.cs.illinois.edu:5355/');
```
+ specify protocol when backgounrd.js send and recieve data, manages message passing:
```
port.onMessage.addListener(function(msg) { ... }
```
+ Load all the content script:
```
chrome.tabs.executeScript(null, ...)
```
