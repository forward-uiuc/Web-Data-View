# Web Data View
Web Data View (WDV) is a chrome browser extension to help users copy data from web pages easily. Using this extension, you can specify what you want to copy by directly interacting with the web page, and paste it to Spreadsheet software or download it as a CSV file just by a few clicks.

## Who
Anyone who can use browsers to serve the Web can benefit from using Web Data View:
* Save data to your own databases
* Gather data across the internet to one place
* Analyze data using your favorite data analytics tools like Spreadsheet

## Why
Web Data View does not create new problems, only makes what you have been doing easier:
* Almost no interuption of your daily workflow: use WDV while serving the web with your Chrome browser
* Almost no learning curve: no coding, only clicking
* Almost always speed up your copy & paste: no exhautive selecting, only descriptive guiding or crowdsourcing

## What
Our solution creates data view, which allows users to interact with web pages as if interacting with data sources:
* Web Data View allows users to do copy-and-paste while browsing the Web by wrapping itself as a Chrome extension
* Web Data View allows users to specify their copy-and-paste intents with minimum effort
* Web Data View allows users to crowdsource intents through a Wiki-style database of intents

## Challenges
* How to develop a Chrome extenstion that is robust with diverse websites?
* How to leverage existing knowledge and minimal user guidance to understand user intent?
* How to match existing intents with a web page?

## Insights
* The key to avoid conflicts is to isolate javascript and css of web pages and Chrome extension
* User input is very powerful for instantiating generic model for specific web page. For example, we may know generic rule "same title field same class names". However, it is useless without knowing exactly which classnames they share. Fortunately, a single "click" from users can tell us which class names
* Web pages can be grouped into categories where corresponding intents are likely to match

## Current solution
* Use contentframe to isolate css. Chrome extension isolates javascript for us by default
* Allow users to select [predefined generic descriptive rules](https://github.com/forward-uiuc/Web-Data-View/wiki/Filter-Options), and visually choose one value sample to instantiate the rules.
* Use URL to match intents with web pages

## To install
Check out the code. And then load folder ng-dashboard you have just downloaded as an unpacked Chrome extension following the [instruction](https://github.com/forward-uiuc/Web-Data-View/wiki/Setup-Instructions). It will create button <img src='https://github.com/forward-uiuc/Web-Data-View/blob/master/ng-dashboard/assets/logo/logo_color_16.png'> for our extension at the top right corner of Chrome browser.

To use the query execution module, you need to install and run the server. See instruction here: [Web Data View Server](https://github.com/forward-uiuc/Web-Data-View-server) 

## To use
To use the extension, open a page like https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=laptop and click on our Chrome Extension button. Check our [User Guide](https://github.com/forward-uiuc/Web-Data-View/wiki/User-Guide) for more details!

## To make change to the code
After making changes to the code, you need to reload the unpacked extension on [chrome://extensions/](chrome://extensions/) so that the changes can take effect.

## Potential improvements
* Makes selecting data value samples easily by smart segmentation
* Improve the query language to allow more descriptive operators, including specifying relationship among fields. For example, if would be useful for users to describe product title is the link with the most number of tokens in a record. It means that the system will have find records first using the current primitive operators, and then use the record field as the pivot for finding other fields such as title.
* Connect the current point-and-click interface and the query language to make the user experience smooth. For example, when writing queries, users may need to know the color code of the target elements. Now they have to Inspection to do so. It would be convenient if users can use the mouse to point to target element get the color code directly when writing queries. It is similar to when writing formulas in Excel in which we can refer to other cells simply by clicking on them.

This software is developed at [Forward@UIUC Group](http://forwarddatalab.org/kevinchang)
