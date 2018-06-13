/*
 // html for popover buttons
 var popover_html = '<i class="fa fa-tag fa-fw-lg" id="web-view-assign-label"></i>' +
 '<i class="fa fa-object-group fa-fw-lg" id="web-view-select-similar"></i>' +
 '<i class="fa fa-link fa-fw-lg" id="web-view-merge"></i>' +
 '<i class="fa fa-trash-o fa-fw-lg" id="web-view-remove"></i>';
 // set popover attributes
 for (var i = 0; i < globalBlocks.length; i++) {
 var box = globalBlocks[i]['-att-box'];
 if (box.nodeType == 1) { // check node is DOM element, not text
 box.setAttribute("data-toggle", "popover");
 box.setAttribute("data-content", popover_html);
 box.setAttribute("data-html", true);
 box.setAttribute("data-placement", "top");
 box.setAttribute("data-trigger", "focus");
 box.setAttribute("data-animation", true);
 box.setAttribute("block-index", i);
 }
 }
 */

let selectionExpansion = [];
let prev_color_to_class_idx = [];
let selectionExpansionIdx = 0;

let css_filters = ["font-size", "color", "background-color", "font-style", "font-weight"];

let COLORS = ["(2,63,165)","(125,135,185)","(190,193,212)","(214,188,192)","(187,119,132)","(142,6,59)","(74,111,227)","(133,149,225)","(181,187,227)","(230,175,185)","(224,123,145)","(211,63,106)","(17,198,56)","(141,213,147)","(198,222,199)","(234,211,198)","(240,185,141)","(239,151,8)","(15,207,192)","(156,222,214)","(213,234,231)","(243,225,235)","(246,196,225)","(247,156,212)"];
shuffle(COLORS);
let collected_data = [];
let fieldname_color = {};
let field_label =  null;
labels_list = [];
let parent_collected = [];
let cap_counter = 0;
let currentFilters = new Set();
let tooltip_color =  null;
let cccccc =  null;
let cur_query = new Query({});
let cur_web_noti = null;
let apply_array = [];
let click_flag = false;
let port = chrome.runtime.connect({name: "knockknock"});
setTimeout(function(){port.postMessage({answer: "pre check", domain_name: location.href});}, 1000);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "toggled"){
            $('#webview-query').toggle();
            $('#webdataview-floating-widget').toggle();
        }
    });

class TestTooltip {
    constructor(referenceElement, color) {
        self.instance = new Tooltip(referenceElement, {
            title: '<div id="webview-popper-container"></div>',
            trigger: "click",
            placement: "auto-top",
            html: true,
            container: 'body',
        });
        self.instance.show();
        let cf = new ContentFrame({
            'id':'webview-tooltip',
            'appendTo': '#webview-popper-container',
            'css': ['lib/font-awesome/css/font-awesome.css', 'lib/bootstrap/css/bootstrap.3.3.7.min.css'],
            'js': ['app/contentScript/webView/tooltipHandler.js'],
            'inlineCss':  {"width": "140px", "height": "40px", "z-index": 2147483640, "border": "none", "border-radius": 6, "overflow": "visible", "display": "display"}
        });
        let tooltip_html = $.parseHTML('<div class="webdataview" id="webdataview_id" style="background-color: ' + color + '; width: 100%; height: auto; overflow: visible; z-index: 2147483647 !important; ">' +
            // '<i class="fa fa-tag fa-fw-lg" id="web-view-assign-label" style="margin-left: 15px"></i> ' +
            // '<i class="fa fa-object-group fa-fw-lg" id="web-view-select-similar" style="color: black;"></i>' +
            '<i class="fa fa-trash-o fa-fw-lg" id="web-view-remove"  style="color: black;" title="Delete"></i>' +
            '<i class="fa fa-plus-circle fa-fw-lg" id="web-view-expand-selection"  style="color: black;" title="Expand Selection"></i>' +
            '<i class="fa fa-minus-circle fa-fw-lg" id="web-view-reduce-selection"  style="color: black;" title="Reduce Selection"></i>' +
            '<i class="fa fa-angle-double-down fa-fw-lg" id="cap_toggle"  style="color: black; font-weight: 100;" title="Select Capabilities"></i>' +
            '<br><div id="cap_target" style="display: none;">' +
            '<input type="checkbox" id="filter_class" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by ClassName</label>' +
            '<br><input type="checkbox" id="filter_ancestor_class" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by AncestorClass</label>' +
            '<br><input type="checkbox" id="filter_id" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Id</label>' +
            '<br><input type="checkbox" id="filter_tag" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Tag name</label>' +
            '<br><input type="checkbox" id="filter_font-size" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Fontsize</label>' +
            '<br><input type="checkbox" id="filter_color" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Fontcolor</label>' +
            '<br><input type="checkbox" id="filter_background-color" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Bg-color</label>' +
            '<br><input type="checkbox" id="filter_font-style" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Font-style</label>' +
            '<br><input type="checkbox" id="filter_font-weight" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Font-weight</label>' +
            // '<br><input type="checkbox" id="filter_child" name="subscribe" value="0">' +
            // '<label for="subscribeNews">Remove Parent Element</label>' +
            '<br><input type="checkbox" id="filter_width" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Width</label>' +
            '<br><input type="checkbox" id="filter_height" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Height</label>' +
            // '<br><input type="checkbox" id="filter_alignleft" name="subscribe" value="0">'+
            // '<label for="subscribeNews">Old Filter by Left Alignment</label>' +
            '<br><input type="checkbox" id="filter_xpath" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by XPath</label>' +
            '<br><input type="checkbox" id="filter_left_align_with" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Left Alignment</label>' +
            '<br><input type="checkbox" id="filter_top_align_with" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Top Alignment</label>' +
            '<br><input type="checkbox" id="filter_prefix" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Prefix </label> <select id="filter_prefix_num" value="1"><option value="1">1</option><option value="2">2</option> <option value="3">3</option><option value="4">4</option></select>' +
            '<br><input type="checkbox" id="filter_suffix" name="subscribe" value="0">'+
            '<label for="subscribeNews">Filter by Suffix </label> <select id="filter_suffix_num" value="1"><option value="1">1</option><option value="2">2</option> <option value="3">3</option><option value="4">4</option></select>' +
            '</div>'+
            '</div>');
        cf.body.append(tooltip_html);

        window.onbeforeunload = function(e) {
            e.preventDefault();
            port.postMessage({answer: "exit", domain_name: location.href});
        };

        port.onMessage.addListener(function(msg) {
            if (msg.question === "feedback"){
                let data = msg.data;
                let stored_query = data.output;
                let k = (145+(stored_query.length-2)*25).toString() + 'px';
                let noti_question = ContentFrame.findElementInContentFrame('#question', '#webview-note');
                let noti_accept = ContentFrame.findElementInContentFrame('#note_accept', '#webview-note');
                let noti_reject = ContentFrame.findElementInContentFrame('#note_reject', '#webview-note');
                let question_html;
                if(data.output.length !== 0){
                    question_html = $.parseHTML('<p id="question"><b>There are existing models with the current url, would you like to see it?</b></p>');
                    noti_question.replaceWith(question_html);
                    noti_reject.css('visibility','hidden');
                    let accept_html = $.parseHTML(' <button type="button" class="btn btn-success" id="note_result">Show Me</button>&nbsp;&nbsp;&nbsp;');
                    noti_accept.replaceWith(accept_html);
                }
                else{
                    question_html = $.parseHTML('<p id="question"><b>There is no model, please write your own.Would you like to get notification in the future?</b></p>');
                    noti_question.replaceWith(question_html);
                }
                function dynamicEvent() {
                    let index_pos = parseInt((this.id).slice(-1));
                    new_model = stored_query[index_pos].model_text;
                    console.log(new_model);
                    chrome.storage.local.get("value", function(items) {
                        if (!chrome.runtime.error) {
                            chrome.storage.local.set({'value': new_model});
                        }
                    });
                    for(let i = 0; i < new_model.length; i++){
                        cur_query = new_model[i].query;   //query text
                        cur_label = new_model[i].label;   //query labels
                        let new_web_noti = new WebDataExtractionNotation(new_model[i]);
                        new_web_noti.extract();
                        let dom_list = new_web_noti.matchquery()[cur_label];
                        // new_web_noti.changeLabelName();
                        let tooltip_color = new_web_noti.label2color[cur_label];
                        new_web_noti.notations[cur_label].applySelectedElements(tooltip_color);
                        for(let j = 0; j < dom_list.length; j++){
                            data_to_push = {};  //dic label name ->
                            data_to_push[cur_label] = dom_list[j];
                            collected_data.push(data_to_push);
                        }
                    }
                }
                ContentFrame.findElementInContentFrame('#note_result', '#webview-note').click(function(e) {
                    e.preventDefault();
                    ContentFrame.findElementInContentFrame('#question', '#webview-note').css('display', 'none');
                    for(i = 0; i < stored_query.length; i++) {
                        let li = document.createElement('li');
                        li.id = 'pop' + i;
                        li.innerHTML = '<li><b>' + stored_query[i].model_name + ': &nbsp;&nbsp;&nbsp;</b><button type="button" class="btn btn-success"  style="background-color: #f92672 !important;">populate</button></li>';
                        ContentFrame.findElementInContentFrame('#query_pair', '#webview-note').append(li);
                        li.onclick = dynamicEvent;
                    }

                });
            }
            else if(msg.question === "no_connection"){
                let noti_question = ContentFrame.findElementInContentFrame('#question', '#webview-note');
                let question_html;
                question_html = $.parseHTML('<p id="question"><b>There is NO connection to server!</b></p>');
                noti_question.replaceWith(question_html);
            }
        });

        ContentFrame.findElementInContentFrame('#cap_toggle', '#webview-tooltip').click(function(e) {
            e.preventDefault();
            let arrow_target = ContentFrame.findElementInContentFrame('#webdataview_id', '#webview-tooltip').find('#cap_toggle');
            arrow_target.toggleClass("fa fa-angle-double-up fa-fw-lg fa fa-angle-double-down fa-fw-lg");

            let stretch = "150px";
            let width_stretch = "195px";
            let x = ContentFrame.findElementInContentFrame('#cap_target', '#webview-tooltip')[0];
            if (x.style.display === "none") {
                x.style.display = "block";
                $("#webview-tooltip")[0].style.height = stretch;
                $("#webview-tooltip")[0].style.width = width_stretch;
            } else {
                x.style.display = "none";
                $("#webview-tooltip")[0].style.height = "40px";
                $("#webview-tooltip")[0].style.width = "140px";

            }
        });

        /**
         * Helper function that:
         * highlights the selected element
         * decides label name and color
         * executes the query (do the filtering)
         * pushes data to collected_data
         * @param referenceElement
         * @param cur_query
         * @param flag_val flag value to indicate if a filter is selected
         */
        function helper(referenceElement, cur_query, flag_val){
            if(flag_val === 0){
                tooltip_color = "rgb" + COLORS[class_to_color_idx[referenceElement.className]]; // classname to color
                cur_query.highlightSelectedElements(tooltip_color);
                field_label = ntc.name(rgb2hex(tooltip_color))[1]; //any color -> close name to it
                fieldname_color[field_label] = tooltip_color;
                let dom_elements = cur_query.execute();
                console.log(dom_elements);
                let data_to_push = null;
                for(let i = 0; i < dom_elements.length; i++){
                    data_to_push = {};  //dic label name ->
                    data_to_push[field_label] = dom_elements[i];
                    collected_data.push(data_to_push);
                }
                console.log(collected_data);
            }
            else{
                cur_query.highlightSelectedElements(tooltip_color);
                let new_collect = [];
                let target_class = referenceElement.className;
                for (let j=0; j < collected_data.length; j++) {
                    let kval = Object.values(collected_data[j])[0];
                    if(kval.className !== target_class){
                        new_collect.push(collected_data[j]);
                    }
                }
                collected_data = new_collect;
            }
        }

        function addjQuerySelector(filter_id, selector_callback) {
            let filter_name = filter_id.replace(/^#filter_/, '');
            ContentFrame.findElementInContentFrame(filter_id, '#webview-tooltip').click(function (e) {
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


        ContentFrame.findElementInContentFrame('#filter_class', '#webview-tooltip').click(function(e) {
            if (referenceElement.className === '' || referenceElement.className === undefined) {
                alert("This element has no Class attribute!");
                ContentFrame.findElementInContentFrame('#filter_class', '#webview-tooltip').attr("disabled","true");
                return;
            }
            let cur = e.target;
            if (cur.value === "0") {  //Add model to collection
                cur.value = "1";
                currentFilters.add("filter_class");

                let target_class = referenceElement.className;
                cur_query.class = target_class;
                helper(referenceElement, cur_query, 0);
            }

            else{  //Take model off collection
                cur.value = "0";
                currentFilters.delete("filter_class");
                cur_query.class = false;
                helper(referenceElement, cur_query, 1);
            }
        });

        ContentFrame.findElementInContentFrame('#filter_ancestor_class', '#webview-tooltip').click(function(e) {
            let cur = e.target;
            if(cur.value === "0"){  //Add model to collection
                cur.value = "1";
                currentFilters.add("filter_ancestor_class");
                let prs = $(referenceElement).parents();
                let target_tag = "";
                for (let i = 0; i < prs.length; i++) {
                    if (prs[i].className != undefined) {
                        target_tag = prs[i].className;
                        break;
                    }
                }

                cur_query.jQuerySelector["ancestor_class"] = function() {
                    let cur_prs = $(this).parents();
                    let cur_tag = "";
                    for (let i = 0; i < cur_prs.length; i++) {
                        if (cur_prs[i].className != undefined) {
                            cur_tag = cur_prs[i].className;
                            break;
                        }
                    }
                    return cur_tag === target_tag;
                };
                helper(referenceElement, cur_query, 0);
            }
            else{  //Take model off collection
                cur.value = "0";
                currentFilters.delete("filter_ancestor_class");
                delete cur_query.jQuerySelector["ancestor_class"];
                helper(referenceElement, cur_query, 1);
            }
        });

        ContentFrame.findElementInContentFrame('#filter_id', '#webview-tooltip').click(function(e) {
            if(referenceElement.id === '' || referenceElement.id === undefined ){
                alert("This element has no Id attribute!");
                ContentFrame.findElementInContentFrame('#filter_id', '#webview-tooltip').attr("disabled","true");
                return;
            }
            let cur = e.target;
            if(cur.value === "0"){  //Add model to collection
                cur.value = "1";
                currentFilters.add("filter_id");

                let target_id = referenceElement.id;
                cur_query.id = target_id;
                helper(referenceElement, cur_query, 0);
            }

            else{  //Take model off collection
                cur.value = "0";
                currentFilters.delete("filter_id");
                cur_query.id = false;
                helper(referenceElement, cur_query, 1);
            }
        });

        ContentFrame.findElementInContentFrame('#filter_tag', '#webview-tooltip').click(function(e) {
            let cur = e.target;
            if(cur.value === "0"){  //Add model to collection
                cur.value = "1";
                currentFilters.add("filter_tag");
                let target_tag = referenceElement.tagName;
                cur_query.jQuerySelector["tagName"] = function() {
                    return this.tagName === target_tag;
                };
                helper(referenceElement, cur_query, 0);
            }
            else{  //Take model off collection
                cur.value = "0";
                currentFilters.delete("filter_tag");
                delete cur_query.jQuerySelector["tagName"];
                helper(referenceElement, cur_query, 1);
            }
        });

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

        addjQuerySelector('#filter_width', function () {
            let target_width = jQuery(referenceElement).width();
            return Math.abs($(this).width() - target_width) < 2;
        });

        addjQuerySelector('#filter_height', function () {
            let target_height = jQuery(referenceElement).height();
            return Math.abs($(this).height() - target_height) < 2;
        });

        addjQuerySelector('#filter_prefix', function () {
            let target_prefix = jQuery(referenceElement).text().split(' ').slice(0,ContentFrame.findElementInContentFrame('#filter_prefix_num', '#webview-tooltip').val()).join(' ');
            return $(this).text().indexOf(target_prefix) === 0;
        });

        addjQuerySelector('#filter_suffix', function () {
        	let txt = jQuery(referenceElement).text().trim();
            let target_suffix = txt.split(' ').splice(-ContentFrame.findElementInContentFrame('#filter_suffix_num', '#webview-tooltip').val()).join(' ');
            let cur_txt = $(this).text().trim()
			let idx = cur_txt.lastIndexOf(target_suffix);
			return (idx > 0 && cur_txt.length - idx === target_suffix.length);
        });

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

        addjQuerySelector('#filter_prefix', function () {
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

        ContentFrame.findElementInContentFrame('#web-view-select-similar', '#webview-tooltip').click(function(e) {
            if (referenceElement.className === '' || referenceElement.className === undefined) {
                alert("This element has no Class attribute!");
                return;
            }
            let cur = e.target;
            if (cur.value === "0") {  //Add model to collection
                cur.value = "1";
                currentFilters.add("filter_class");

                let target_class = referenceElement.className;
                cur_query.class = target_class;
                helper(referenceElement, cur_query, 0);
            }

            else{  //Take model off collection
                cur.value = "0";
                currentFilters.delete("filter_class");
                cur_query.class = false;
                helper(referenceElement, cur_query, 1);
            }

        });

        ContentFrame.findElementInContentFrame('#web-view-remove', '#webview-tooltip').click(function(e) {
            e.preventDefault();
            $('#webview-popper-container').remove();
            referenceElement.style.outline = null;
            let new_collect = [];
            for (let j=0; j < collected_data.length; j++) {
                let kval = Object.values(collected_data[j])[0];
                if(kval !== referenceElement){
                    new_collect.push(collected_data[j]);
                }
            }
            collected_data = new_collect;
        });

        ContentFrame.findElementInContentFrame('#web-view-expand-selection', '#webview-tooltip').click(function(e) {
            e.preventDefault();
            if (selectionExpansion.indexOf(referenceElement) === -1) {
                selectionExpansion = [];
                prev_color_to_class_idx = [];
                selectionExpansionIdx = 0;
            }
            // if length of selExpansion is 0, add referenceElement
            if (selectionExpansion.length === 0) {
                selectionExpansion.push(referenceElement);
            }
            // get parent of referenceElement
            let parent = $(referenceElement).parent().get(0);
            // parent area should be strictly larger than child area
            while(parent.offsetHeight*parent.offsetWidth <= referenceElement.offsetHeight*referenceElement.offsetWidth){
                parent = $(parent).parent().get(0);
            }
            // add to selection expansion
            selectionExpansion.push(parent);
            // increment index of selection expansion
            selectionExpansionIdx += 1;
            // set color to classname mapping same as its child node's
            referenceElement =  selectionExpansion[selectionExpansionIdx];
            prev_color_to_class_idx.push(class_to_color_idx[referenceElement.className]);
            class_to_color_idx[referenceElement.className] = class_to_color_idx[selectionExpansion[0].className];
            // click on indexed selection Expansion
            cur_query.highlightSelectedElements('none');
            cur_query = new Query({});
            $(selectionExpansion[selectionExpansionIdx]).trigger("click");
        });

        ContentFrame.findElementInContentFrame('#web-view-reduce-selection', '#webview-tooltip').click(function(e) {
            e.preventDefault();
            // if length of selExpansion is 0
            if (selectionExpansion.indexOf(referenceElement) === -1) {
                selectionExpansion = [];
                prev_color_to_class_idx = [];
                selectionExpansionIdx = 0;
            }

            if (selectionExpansion.length <= 0) { return; }

            let parentHighlight = selectionExpansion[selectionExpansionIdx].style.outline;

            selectionExpansionIdx -= 1;
            // click on indexed selection Expansion
            if (selectionExpansion[selectionExpansionIdx+1] && selectionExpansion[selectionExpansionIdx+1].style.outline) {
                // console.log("parent style is not null");
                selectionExpansion[selectionExpansionIdx+1].style.outline = null;
                cur_query.highlightSelectedElements('none');
                if (selectionExpansion[selectionExpansionIdx]) {
                    selectionExpansion[selectionExpansionIdx].style.outline = parentHighlight;
                }
            }

            // remove color to classname mapping of its parent
            class_to_color_idx[referenceElement.className] = prev_color_to_class_idx[prev_color_to_class_idx.length-1];
            referenceElement =  selectionExpansion[selectionExpansionIdx];
            // remove from prev color TODO
            delete prev_color_to_class_idx[prev_color_to_class_idx.length-1];
            cur_query = new Query({}); 
            $(referenceElement).trigger("click");
        });

        // assign
        ContentFrame.findElementInContentFrame('#web-view-assign-label', '#webview-tooltip').click(function() {
            cf.body.empty();
            let assign_color_html = "<table style=\"width:100%; height:100%; background-color: rgb(255,255,255)\">";
            for (let i=0; i<4; i++) {
                assign_color_html += "<tr>"
                for (let j=0; j<6; j++) {
                    assign_color_html += "<td class=\"web-view-assign-color\" style=\"cursor:pointer;background-color: rgb(255,255,255)" + COLORS[i*6+j]+ "\"></td>"
                }
                assign_color_html += "</tr>"
            }
            assign_color_html += "</table>";
            cf.iframe.css({"height":"100px"});
            cf.body.append($.parseHTML(assign_color_html));
            self.instance.show();
            let assigned_color = undefined;
            ContentFrame.findElementInContentFrame('.web-view-assign-color', '#webview-tooltip').click(function(e) {
                let assigned_color = e.target.style.backgroundColor;
                let assigned_color_label_name = ntc.name(rgb2hex(assigned_color))[1];
                if (labels_list.indexOf(assigned_color_label_name) === -1) {
                    appendLabel2Widget(assigned_color_label_name, assigned_color_label_name);
                }
                let tooltip_html = $.parseHTML('<div class="webdataview" style="background-color: ' + assigned_color + '; width: 100%; height: 100%">' +
                    // '<i class="fa fa-object-group fa-fw-lg" id="web-view-select-similar"></i>' +
                    '<i class="fa fa-trash-o fa-fw-lg" id="web-view-remove" title="Delete"></i>' +
                    '<i class="fa fa-plus-circle fa-fw-lg" id="web-view-expand-selection"  style="color: black;" title="Expand Selection"></i>' +
                    '<i class="fa fa-minus-circle fa-fw-lg" id="web-view-reduce-selection"  style="color: black;" title="Reduce Selection"></i>' +        
                    '<i class="fa fa-angle-double-down fa-fw-lg" id="cap_toggle" title="Select Capabilities"></i>' +
                    '</div>');
                cf.iframe.css({"height":"40px"});
                cf.body.empty();
                cf.body.append(tooltip_html);


                // change field_label of selected nodes or add them to collected_data
                for (let idx = 0; idx < selected_nodes.length; idx++) {
                    selected_nodes[idx].style.outline = "2px solid " + assigned_color;
                    for (let j=0; j < collected_data.length; j++) {
                        let found = false;
                        let keys = Object.keys(collected_data[j]);
                        keys.forEach(function(key) {
                            if (collected_data[j][key] === selected_nodes[idx]) {
                                collected_data[j][assigned_color_label_name] = collected_data[j][key];
                                delete collected_data[j][key];
                                found = true;
                            }
                        });
                        if (!found) {
                            let data_to_push = {};
                            data_to_push[assigned_color_label_name] = selected_nodes[idx];
                            collected_data.push(data_to_push);
                        }
                    }
                }
            });
        });
    }

    show() {
        self.instance.show();
    }

    hide() {
        self.instance.hide();
    }
}

// list of selected VIPS blocks
let selected_nodes = [];
let tooltip_node = undefined;
let alignSelectionWithClusterClassFlag = false;
let used_col_idx = 0;
let class_to_color_idx = {};

let TOOLTIP_IDS_ARRAY = ["web-view-remove"];
let prev;
document.addEventListener("click", selectionHandler, true);

let css_title = null;
let css_store = null;
function greeting(name) {
    let hover_message = "";
    if(currentFilters.has("filter_class")){
        hover_message = hover_message + " className: ";
        hover_message = hover_message + name.attr('class');
        hover_message = hover_message + "\n";
    }
    if(currentFilters.has("filter_id")){
        hover_message = hover_message + " id: ";
        hover_message = hover_message + name.attr('id');
        hover_message = hover_message + "\n";
    }
    for (i = 0, len = css_filters.length; i < len; i++) {
        let prop = css_filters[i];
        if (currentFilters.has(prop)) {
            hover_message = hover_message + " " + prop + ": " + name.css(prop) + "\n";
        }
    }
    // if(currentFilters.has("filter_fontsize")){
    //     hover_message = hover_message + " Fontsize: ";
    //     hover_message = hover_message + name.css("font-size");
    //     hover_message = hover_message + "\n";
    // }
    // if(currentFilters.has("filter_fontcolor")){
    //     hover_message = hover_message + " Fontcolor: ";
    //     hover_message = hover_message + name.css("color");
    //     hover_message = hover_message + "\n";
    // }
    // name.prop('title', hover_message);
}

function doWhenEnterDOM(node, count) {
    // Should not be able to select menus
    if (node.closest('#webdataview-widget-container').length) return;
    // Should not enter a node if it is already selected, which 
    // happens when moving mouse too fast
    if (node.data('wdv_original')===undefined) {
        // if ($.now() % 5 == 0) { // use it to reduce cost
        //     removeAllSelections(); //pretty expensive
        // }
        removeAllSelections(); //pretty expensive, use the method above to reduce cost
        node.data('wdv_original',{title:node.prop('title'),outline:node.css('outline')});
        node.css('outline', '1px dotted black');
        greeting(node);
    }
    // else if (count < 10) {
    //     setTimeout(doWhenEnterDOM(node,count+1),250);
    // }
}

function doWhenExitDOM(node, count) {
    if (node.closest('#webdataview-widget-container').length) return;
    if (node.data('wdv_original')!==undefined) {
        if (node.data('wdv_original')['is_selected']===undefined) {
            node.prop('title', node.data('wdv_original')['title']);
            node.css('outline', node.data('wdv_original')['outline']);
        }
        node.removeData('wdv_original');
    }
    // else if (count < 10) {
    //     setTimeout(doWhenExitDOM(node,count+1),250);
    // }
}

function removeAllSelections() {
    var elements = $('*').filter(function(){return $(this).data('wdv_original') !== undefined;});
    for (i = 0; i < elements.length; i++) {
        doWhenExitDOM($(elements[i]),0)
    }
}

$('*').hover(
    function(e){
        // The condition is to prevent the case when moving the mouse too fast
        // that it re-enters the element before finishing the previous entering
        doWhenEnterDOM($(this),0);
        e.preventDefault();
        e.stopPropagation();
        return false;
    },function(e){
        // The condition is to prevent the case when moving the mouse too fast
        // that it goes out of the element before finishing the previous going out
        doWhenExitDOM($(this),0);
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
);

function selectionHandler(event) {
    if ($(event.target).closest('#webdataview-widget-container').length) return;
    event.preventDefault();
    event.stopPropagation();
    currentFilters.clear();
    let event_target = event.target;
    apply_array.push(event_target);
    if (TOOLTIP_IDS_ARRAY.indexOf(event.target.id ) != -1) {
        tooltipHandler(event.target.id);
        return;
    }
    /*
     let idx = getVipsIndexFromBoxId(event.target.id);
     // if click outside of view, then deselect all elements, hide tooltip, empty selectedBlockIndices and return
     if (!idx) {
     deselectVipsBlockArray(selectedBlockIndices);
     destroyTooltip();
     selectedBlockIndices = [];
     return;
     }
     let selectIndexColor = getClusterColorFromIndex(idx);
     if (alignSelectionWithClusterClassFlag) {
     alignWithSelectedBlockCluster(idx, selectIndexColor);
     return;
     }
     // toggle Selection for an index that is already selected
     if(selectedBlockIndices.indexOf(idx) != -1) {
     deselectVipsBlock(idx);
     // if no selected box, destroy tooltip
     if (isEmptyArray(selectedBlockIndices))
     destroyTooltip();
     }
     else {
     event.target.style.border = "2px solid " + selectIndexColor;
     selectedBlockIndices.push(idx);
     updateTooltip(idx, selectIndexColor);
     }
     */
    $('#webview-popper-container').remove();

    let tooltip_color;
        if(!click_flag){ //first time click
            click_flag = true;
            class_to_color_idx[event.target.className] = used_col_idx;
            tooltip_color = "rgb" + COLORS[used_col_idx];
            used_col_idx = used_col_idx + 1;
            appendLabel2Widget(ntc.name(rgb2hex(tooltip_color))[1], tooltip_color);
        }
        else{
            tooltip_color = "rgb" + COLORS[used_col_idx-1];
        }
    cccccc = tooltip_color;
    let tip = new TestTooltip(event.target, tooltip_color);

    if (!tooltip_node || event.target.className !== tooltip_node.className) {
        for (let i = 0; i < selected_nodes.length; i++) {
            selected_nodes[i].style.outline = "none";
        }
        selected_nodes = [];
    }
    selected_nodes.push(event.target);
    tooltip_node = event.target;
    // console.log("event target is: ", tooltip_node);
    if (tooltip_node && $(tooltip_node).data('wdv_original')!==undefined) {
        // if (tooltip_node.data('wdv_original')['is_selected']===undefined) {
        $(tooltip_node).data('wdv_original')['is_selected']='true';
    }
    tooltip_node.style.outline = '2px dotted ' + tooltip_color;
    tooltip_node.style['outline-offset'] = '-2px';
    let field_label = ntc.name(rgb2hex(tooltip_color))[1];
    let data_to_push = {};
    data_to_push[field_label] = event_target;
    collected_data.push(data_to_push);
}

function updateTooltip(idx, color) {
    if(tooltipBoxIdx)
        destroyTooltip();
    tooltipBoxIdx = idx;
    let box = globalBlocks[idx]['-att-box'];
    $(box).popover("show");
    $('.popover').css('background-color', color);
    //$('.popover.top .arrow').css('border-top-color', color);
}

function destroyTooltip() {
    let box = globalBlocks[tooltipBoxIdx]['-att-box'];
    $(box).popover("hide");
    tooltipBoxIdx = undefined;
}

function isEmptyArray(arr) {
    if (arr && arr.length==0)
        return true;
    return false;
}

function deselectVipsBlock(idx) {
    let idxClusterColor = getClusterColorFromIndex(idx);
    let box = globalBlocks[idx]['-att-box'];

    // reset border
    box.style.border = "2px solid rgba(0,0,0,0)";
    box.style.borderLeft = "2.5px solid " + idxClusterColor;

    // remove from selectedBlockIndices
    selectedBlockIndices.splice(selectedBlockIndices.indexOf(idx), 1);

    // hide tooltip
    $(box).popover("hide");
}

function deselectVipsBlockArray(arrayIndices) {
    for (let i = 0; i < arrayIndices.length; i++) {
        deselectVipsBlock(arrayIndices[i]);
    }
}

/*
 * returns color corresponding to cluster of block 'idx' from CSS_COLOR_NAMES in wdvKMeans.js
 */
function getClusterColorFromIndex(idx) {
    return CSS_COLOR_NAMES[id2cluster[idx]];
}

/*
 * returns vips globalBlocks Index for box id if validation succeeds
 */
function getVipsIndexFromBoxId(strIdx) {
    // validate vips block
    let vipsBoxIdPattern =  /vips(\d+)$/i;
    let regMatch = strIdx.match(vipsBoxIdPattern);
    if(regMatch) {
        // parse index
        let idx = parseInt(regMatch[1]);
        return idx;
    }
    // false for error checking
    return false;
}

function assignLabel() {
    for (let i = 0; i < selectedBlockIndices.length; i++) {
        let idx = selectedBlockIndices[i];
        labels[idx] = label;
        // change colors & cluster & id2cluster
    }
}

function deleteSubtreeOfSelectedBlocks() {
    destroyTooltip();
    for(let i = 0; i < selectedBlockIndices.length; i++) {
        let idx = selectedBlockIndices[i];
        let box = globalBlocks[idx]['-att-box'];
        box.style.visibility = "hidden";
    }
    selectedBlockIndices = [];
}

function removeFromClusterClass() {
    destroyTooltip();
    for(let i = 0; i < selectedBlockIndices.length; i++) {
        let idx = selectedBlockIndices[i];
        let box = globalBlocks[idx]['-att-box'];
        box.style.border = "none";
        let clusterid = id2cluster[idx];
        if (clusters[clusterid].indexOf(idx) > -1)
            clusters[clusterid].splice(idx, 1);
        id2cluster[idx] = undefined;
    }
    selectedBlockIndices = [];
}

function selectCluster() {
    let clusterid = id2cluster[tooltipBoxIdx];
    let clusterColor = getClusterColorFromIndex(tooltipBoxIdx);
    if(clusterid){
        for (let i = 0; i < clusters[clusterid].length; i++) {
            let idx = clusters[clusterid][i];
            if(selectedBlockIndices.indexOf(idx) < 0)
                selectedBlockIndices.push(idx);
            let box = globalBlocks[idx]['-att-box'];
            box.style.border = "2px solid " + clusterColor;
        }
    }
}

function alignSelectionWithClusterClass() {
    for(let i = 0; i < selectedBlockIndices.length; i++) {
        let idx = selectedBlockIndices[i];
        let box = globalBlocks[idx]['-att-box'];
        box.style.borderStyle = "dotted";
    }

    destroyTooltip();
    alignSelectionWithClusterClassFlag = true;
}

function alignWithSelectedBlockCluster(idx, clusterColor) {
    let clusterId = id2cluster[idx];

    for(let i = 0; i < selectedBlockIndices.length; i++) {
        let idx = selectedBlockIndices[i];
        let currentClusterId = id2cluster[idx];
        if (clusters[currentClusterId].indexOf(idx) > -1)
            clusters[currentClusterId].splice(idx, 1);
        clusters[clusterId].push(idx);
        id2cluster[idx] = clusterId;
    }
    deselectVipsBlockArray(selectedBlockIndices);
    alignSelectionWithClusterClassFlag = false;
}

// function to convert hex format to a rgb color
function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
