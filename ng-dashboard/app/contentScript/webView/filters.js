let css_filters = ["font-size", "color", "background-color", "font-style", "font-weight"];

function getXPath( element )
{
    var xpath = '';
    for ( ; element && element.nodeType == 1; element = element.parentNode )
    {
        //alert(element);
        var id = $(element.parentNode).children(element.tagName).index(element) + 1;
        id > 1 ? (id = '[' + id + ']') : (id = '');
        if (element.id) {
            return '//*[@id="' + element.id + '"]' + id + xpath;
        }
        xpath = '/' + element.tagName.toLowerCase() + id + xpath;
    }
    return xpath;
}

function addFilters(referenceElement, cur_query) {
    /**
     * Add handler for filter by jQuerySelector functions.
     * For consistency, please use jQuerySelector as much as possible.
     * @param filter_id Id of the filter option
     * @param selector_callback callback function for jQuerySelector
     */
    function filterByjQuerySelector(filter_id, selector_callback) {
        let filter_name = filter_id.replace(/^#filter_/, '');
        ContentFrame.findElementInContentFrame(filter_id, '#webview-tooltip').click(function (e) {
            if (filter_id === "#filter_class" && (referenceElement.className === '' || referenceElement.className === undefined)) {
                alert("This element has no Class attribute!");
                ContentFrame.findElementInContentFrame('#filter_class', '#webview-tooltip').attr("disabled","true");
                return;
            }
            if (filter_id === "#filter_id" && (referenceElement.id === '' || referenceElement.id === undefined)) {
                alert("This element has no Id attribute!");
                ContentFrame.findElementInContentFrame('#filter_id', '#webview-tooltip').attr("disabled","true");
                return;
            }

            let cur = e.target;
            if (cur.value === "0") {  //Add model to collection
                cur.value = "1";
                currentFilters.add(filter_name);
                cur_query.jQuerySelector[filter_name] = selector_callback;
                helper(referenceElement, cur_query, 0);
            }

            else {  //Take model off collection
                cur.value = "0";
                currentFilters.delete(filter_name);
                delete cur_query.jQuerySelector[filter_name];
                helper(referenceElement, cur_query, 1);
            }
        });
    }

    filterByjQuerySelector('#filter_class', function () {
        let target_class = referenceElement.className;
        return this.className === target_class;
    });

    filterByjQuerySelector('#filter_ancestor_class', function () {
        let prs = $(referenceElement).parents();
        let target_tag = "";
        for (let i = 0; i < prs.length; i++) {
            if (prs[i].className != undefined) {
                target_tag = prs[i].className;
                break;
            }
        }
        let cur_prs = $(this).parents();
        let cur_tag = "";
        for (let i = 0; i < cur_prs.length; i++) {
            if (cur_prs[i].className != undefined) {
                cur_tag = cur_prs[i].className;
                break;
            }
        }
        return cur_tag === target_tag;
    });

    filterByjQuerySelector('#filter_id', function () {
        let target_id = referenceElement.id;
        return this.id === target_id;
    });

    filterByjQuerySelector('#filter_tag', function () {
        let target_tag = referenceElement.tagName;
        return this.tagName === target_tag;
    });

    // CSS filters
    function filterByCSS(property) {
        ContentFrame.findElementInContentFrame("#filter_" + property, '#webview-tooltip').click(function(e) {
            console.log("filter by " + property);
            if(jQuery(referenceElement).css(property) === '' || jQuery(referenceElement).css(property) === undefined ){
                alert("This element has no " + property + " attribute!");
                ContentFrame.findElementInContentFrame('#filter_' + property, '#webview-tooltip').attr("disabled","true");
                return;
            }
            let cur = e.target;
            if(cur.value === "0"){  //Add model to collection
                cur.value = "1";
                currentFilters.add(property);
                let target_prop = jQuery(referenceElement).css(property);
                cur_query.css[property]= target_prop;
                helper(referenceElement, cur_query, 0);
            }
            else{  //Take model off collection
                cur.value = "0";
                currentFilters.delete(property);
                delete cur_query.css[property];
                helper(referenceElement, cur_query, 1);
            }
        });
    }

    for (i = 0, len = css_filters.length; i < len; i++) {
        filterByCSS(css_filters[i]);
    }

    filterByjQuerySelector('#filter_width', function () {
        let target_width = jQuery(referenceElement).width();
        return Math.abs($(this).width() - target_width) < 2;
    });

    filterByjQuerySelector('#filter_height', function () {
        let target_height = jQuery(referenceElement).height();
        return Math.abs($(this).height() - target_height) < 2;
    });

    filterByjQuerySelector('#filter_prefix', function () {
        let target_prefix = jQuery(referenceElement).text().split(' ').slice(0,ContentFrame.findElementInContentFrame('#filter_prefix_num', '#webview-tooltip').val()).join(' ');
        return $(this).text().indexOf(target_prefix) === 0;
    });

    filterByjQuerySelector('#filter_suffix', function () {
        let txt = jQuery(referenceElement).text().trim();
        let target_suffix = txt.split(' ').splice(-ContentFrame.findElementInContentFrame('#filter_suffix_num', '#webview-tooltip').val()).join(' ');
        let cur_txt = $(this).text().trim();
        let idx = cur_txt.lastIndexOf(target_suffix);
        return (idx > 0 && cur_txt.length - idx === target_suffix.length);
    });

    filterByjQuerySelector('#filter_prefix', function () {
        let target_xpath = getXPath(referenceElement);
        return getXPath($(this).get(0)) == target_xpath;
    });

    ContentFrame.findElementInContentFrame('#filter_left_align_with', '#webview-tooltip').click(function(e) {
        let cur = e.target;
        if(cur.value === "0"){  //Add model to collection
            cur.value = "1";
            currentFilters.add("filter_left_align_with");
            cur_query.leftAlignWith = getXPath(referenceElement);
            helper(referenceElement, cur_query, 0);
        }
        else{  //Take model off collection
            cur.value = "0";
            currentFilters.delete("filter_left_align_with");
            delete cur_query.leftAlignWith;
            helper(referenceElement, cur_query, 1);
        }
    });

    ContentFrame.findElementInContentFrame('#filter_top_align_with', '#webview-tooltip').click(function(e) {
        let cur = e.target;
        if(cur.value === "0"){  //Add model to collection
            cur.value = "1";
            currentFilters.add("filter_top_align_with");
            cur_query.topAlignWith = getXPath(referenceElement);
            helper(referenceElement, cur_query, 0);
        }
        else{  //Take model off collection
            cur.value = "0";
            currentFilters.delete("filter_top_align_with");
            delete cur_query.topAlignWith;
            helper(referenceElement, cur_query, 1);
        }
    });

    filterByjQuerySelector('#web-view-select-similar', function () {
        let target_class = referenceElement.className;
        return this.className === target_class;
    });
}