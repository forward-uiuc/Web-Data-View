### The Architecture of Web Data View Front End

This is a brief introduction to the architecture of the chrome extension. For more details please refer to our [wiki](https://github.com/forward-uiuc/Web-Data-View/wiki/Basic-WebDataView-Usage).

#####Widget

Widget is the small menu in the top-right corner. Its functionality includes show/hide the query panel, confirming selected data, exporting to table. 

![](https://github.com/forward-uiuc/Web-Data-View/wiki/Images/BasicUsage-widget.png)

Related file: 

- widget.js: includes CSS for the widget and the click handler functions for the three buttons

##### Label

When a new element is clicked, which means the user might want to create a new column of data, a new label will appear in the widget. When it is clicked, an edit panel for the label will appear.

![](https://user-images.githubusercontent.com/17106732/41757071-4bd6a786-75a5-11e8-84d0-99ca2319f31d.png)



Related file: 

- labelMenu.js: includes handler function for adding the label and code for the popup label menu as a click handler for the label.

#####Tooltip

Tooltip is the small menu which appears when a user click an element in the page. User can also select filters in the dropdown menu.

![](https://user-images.githubusercontent.com/17106732/41757904-a76e9b08-75aa-11e8-892b-8439b9af0c11.png)

Related file: 

- tooltip.js: handler functions for functionalities including hover effect, click handler for the entire html document, click handler for the tooltip buttons
- filters.js: includes filter functions in the tooltip.

