/**
 * Extensible domain-specific language for querying DOM nodes that match given pattern.
 *
 * Query object can be serialized to JSON, and vice-versa.
 * It facilitates concise summarization of user interactions
 * and enables crowd-sourcing for web data extraction.
 *
 * @class
 * @requires jQuery
 * @param {Object} query
 * @param {(string|string[])} query.class
 * @param {(string|string[])} query.id
 * @param {(string|string[])} query.tag
 * @param {(string|string[])} query.XPath
 * @param {(string|string[])} query.jQuerySelector
 * @param {(Object|Object[])} query.css
 * @param {(string|string[])} query.RegExp
 * @param {(Object|Object[])} query.contains
 * @param {Object} query.position
 * @param {Function} query.function
 * @param {Object} query.bool
 * @example
 * const example_query = new Query({
 *    'class': 'price-class',
 *    'jQuerySelector': ".price-class",
 *  });
 * example_query.execute();
 * example_query.highlightSelectedElements("blue");
 * example_query.toJSON();
 */
class Query {
    constructor(query) {
        if (query.jQuerySelector) {
            this.jQuerySelector = query.jQuerySelector;
        } else {
            this.jQuerySelector = {}
        }
        if (query.class) {
            this.class = query.class;
        }
        if (query.css) {
            this.css = query.css;
        }
        if (query.topAlignWith) {
            this.topAlignWith = query.topAlignWith;
        }
        if (query.leftAlignWith) {
            this.leftAlignWith = query.leftAlignWith;
        }
        else {
            this.css = {}
        }

        this.attrs = ["class", "id", "tag", "XPath", "jQuerySelector", "css", "RegExp", "contains", "position", "function", "bool"];
    }

    /**
     * execute query and return list of matches
     */
    execute() {
        let matches = undefined;

        if (this.class  && !jQuery.isEmptyObject(this.class)) {
            if (!matches) {
                matches = $("*");
            }
            let classjQuerySelector = ".".concat(($.trim(this.class)).replace(/\s+/g, "."));
            matches = matches.filter(classjQuerySelector);
        }

        if (this.jQuerySelector && !jQuery.isEmptyObject(this.jQuerySelector)) {
            if (!matches) {
                matches = $("*");
            }
            // matches = matches.filter(this.jQuerySelector);
            let selectors = this.jQuerySelector;
            for (let x in selectors) {
                matches = matches.filter(selectors[x]);
            }
        }

        if (this.css && !jQuery.isEmptyObject(this.css)) {
            if (!matches) {
                matches = $("*");
            }
            var queryCSS = this.css;
            matches = matches.filter(function() {
                let retVal = false;
                let firstProp = true;
                for (let prop in queryCSS) {
                    if (firstProp) {
                        firstProp = false;
                        retVal = true;
                    }
                    retVal = retVal && $(this).css(prop) == queryCSS[prop];
                }
                return retVal;
            });
        }

        if (this.topAlignWith) {
            var iter = document.evaluate(this.topAlignWith, document, null, XPathResult.ANY_TYPE, null);
  
            var elem = iter.iterateNext();
            var topAlignWithMatches = [];
            
            while (elem) {
  
              function getElementsByLeftOffset(top) {
                  if (!matches) { matches =  $('*'); }
                  return matches.filter(function() {
                      return Math.abs($(this).offset().top - top) <= 5;
                  });
              }
  
              topAlignWithMatches = getElementsByLeftOffset($(elem).offset().top).toArray();
  
              try {
                elem = iter.iterateNext();
              }
              catch(error) {
                console.error(error);
                elem = undefined;
              }
            }
  
            return topAlignWithMatches;
          }
  
          if (this.leftAlignWith) {
            var iter = document.evaluate(this.leftAlignWith, document, null, XPathResult.ANY_TYPE, null);
  
            var elem = iter.iterateNext();
            var leftAlignMatches = [];
  
            while (elem) {
              // console.log($( "[position="+ elem.position[0] +"]" ).toArray());
  
              function getElementsByLeftOffset(left) {
                  if (!matches) { matches = $("*"); }
                  return matches.filter(function() {
                      return Math.abs($(this).offset().left - left) <= 5;
                  });
              }
  
              leftAlignMatches = getElementsByLeftOffset($(elem).offset().left).toArray();
  
              try {
                elem = iter.iterateNext();
              }
              catch(error) {
                console.error(error);
                elem = undefined;
              }
            }
  
            return leftAlignMatches;
          }

        if (matches) {
            return matches.toArray();
        }
    }

    /**
     * highlights elements that match query
     */
    highlightSelectedElements(color) {
        $('*').css('outline', 'none');
        if (!color) {
            color = "red";
        }
        let matches = this.execute();
        if(matches !== undefined){
            for (var i = 0; i < matches.length; i++) {
                let element = matches[i];
                if (typeof element != 'undefined') {
                    element.style.outline = '2px dotted ' + color;
                    element.style['outline-offset'] = '-2px';
                }
            }
        }
    }

    applySelectedElements(color) {
        if (!color) {
            color = "red";
        }
        let matches = this.execute();
        for (var i = 0; i < matches.length; i++) {
            let element = matches[i];
            if (typeof element != 'undefined') {
                element.style.outline = '2px solid ' + color;
                element.style['outline-offset'] = '-2px';
            }
        }
    }

    disapplySelectedElements() {
        let matches = this.execute();
        for (var i = 0; i < matches.length; i++) {
            let element = matches[i];
            if (typeof element != 'undefined') {
                element.style.outline = 'none';
                element.style['outline-offset'] = 'none';
            }
        }
    }

    removeSelectedElements() {
        let matches = this.execute();
        for (var i = 0; i < matches.length; i++) {
            let element = matches[i];
            if (typeof element != 'undefined') {
                element.style.outline = "none";
                element.style['outline-offset'] = 'none';
            }
        }
    }

    /**
     * convert to JSON
     */
    toJSON() {
        let j = {}
        for (let i = 0; i < this.attrs.length; i++) {
            let attr = this.attrs[i];
            let val = this[attr];
            if (val) {
                j[attr] = val;
            }
        }
        return JSON.stringify(j);
    }

}