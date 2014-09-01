(function($) {
    $.addTabs = function(elm, options) {
        var at = this;
        var $elm = $(elm);

        at.settings = {};
        at.activeTab;
        at.$links;
        at.$content;
        at.initRun = false;
        at.currentIndex;
        at.$elm = $elm;
        
        /**
         * the "constructor" method that gets called when the object is created
         */
        at.init = function() {
            at.settings = $.extend({}, $.fn.addTabs.options, options, $elm.data());
            at.run();
        };

        /**
         * Run the plugin
         */
        at.run = function() {
            if(!at.initRun){
                at.$links = $elm.find(at.settings.links);
                at.$content = $elm.find(at.settings.content);
                at.reset();
                // run
                if(at.$links.length && at.$content.length){
                    at.showInit();
                    at.addClick();
                    at.addEvents();
                    at.initRun = true;
                }
            }
        }

        /**
         * add the click function to the links
         */
        at.addClick = function() {
            at.$links.bind("click.at", function(e) {
                e.preventDefault();
                var $link = $(this);
                at.showTab($link);
            });
        };

        /**
         * add public events
         */
        at.addEvents = function() {
            $elm.on("addTab-show-id", function(event, id) {
                at.showById(id);
            });
            $elm.on("addTab-show-index", function(event, index) {
                at.showByIndex(index);
            });
            $elm.on("addTab-next", function(event) {
                at.next();
            });
            $elm.on("addTab-prev", function(event) {
                at.prev();
            });
        }

        /**
         * Show the initial tab
         * This could be defined in the setting, by a default data attribute or by the default index (0)
         */
        at.showInit = function() {
            var $link,
                $defaultLink = at.findLinkByDefault();
            if($defaultLink.length){
                $link = $defaultLink;
            }
            else if(at.settings.defaulttab){
                $link = at.findLinkByData(at.settings.defaulttab);
            }
            else{
                $link = at.findLinkByIndex(0);
            }
            at.showTab($link);
        };

        /**
         * Shows a tab
         * @param link - jquery link element
         */
        at.showTab = function($link) {
            var id = $link.data(at.settings.data),
                index = at.$links.index($link),
                $content = at.$content.filter(id);
                
            if(index != at.currentIndex && $content.length && !$link.hasClass(at.settings.disabledclass)){
                // Before show callback fire
                at.settings.beforeShowCallback.call(at, $link, $content);

                at.reset();
                $link.addClass(at.settings.activeclass);
                $content.show();
                at.currentIndex = index;
                
                // After show callback fire
                at.settings.afterShowCallback.call(at, $link, $content);
                $elm.trigger("addTab-show", [$link, $content])
            }
        };

        /**
         * Show a tab by id
         * @param id - element id
         */
        at.showById = function(id){
            $link = at.findLinkByData(id);
            if($link.length){
                at.showTab($link);
            }
        }

        /**
         * Show a tab by index
         * @param index - zero based index of the tab
         */
        at.showByIndex = function(index){
            $link = at.findLinkByIndex(index);
            if($link.length){
                at.showTab($link);
            }
        }

        /**
         * finds the link based on the related-data attribute
         * @param data - data value
         */
        at.findLinkByData = function(data){
            return at.$links.filter('[data-' + at.settings.data + '="' + data + '"]');
        };

        /**
         * finds the link based on the default data attribute
         */
        at.findLinkByDefault = function(){
            return at.$links.filter('[data-default-tab]').first();
        };

        /**
         * finds the link based on an index
         * @param index - index value of the link (0 based)
         */
        at.findLinkByIndex = function(index){
            return at.$links.eq(index);
        };

        /**
         * move to the next tab
         */
        at.next = function(){
            var newIdx = at.currentIndex + 1;
            at.manageChange(newIdx);
        }

        /**
         * move to the prev tab
         */
        at.prev = function(){
            var newIdx = at.currentIndex - 1;
            at.manageChange(newIdx);
        }

        /**
         * manage next, prev event
         * @param newIdx new index
         */
        at.manageChange = function(newIdx) {
            var total = at.getTotal();
            if(newIdx > total){
                newIdx = 0;
            }
            if(newIdx < 0){
                newIdx = total;
            }
            var $link = at.findLinkByIndex(newIdx);
            at.showTab($link);
        }

        /**
         * helper function to get total slides
         */
        at.getTotal = function (){
            return at.$links.length-1;
        };

        /**
         * reset to the initial state
         */
        at.reset = function() {
            at.$content.hide();
            at.$links.removeClass(at.settings.activeclass);
        };

        /**
         * Destroy the plugin
         */
        at.destroy = function() {
            at.$content.show();
            at.$links.removeClass(at.settings.activeclass);
            at.$links.unbind("click.at");
            at.removeEvents();
            at.currentIndex = undefined;
            at.initRun = false;
        };

        /**
         * remove public events
         */
        at.removeEvents = function() {
            $elm.unbind("addTab-show-id");
            $elm.unbind("addTab-show-index");
            $elm.unbind("addTab-next");
            $elm.unbind("addTab-prev");
        }

        /**
         * Reinitialise the plugin with new options 
         * @param newOptions object
         */
        at.reInit = function(newOptions) {
            if(at.initRun){
                at.destroy();
            }
            at.settings = $.extend(at.settings, newOptions);
            at.run();
        }

        // call the "constructor" method
        at.init();
    };

    // add the plugin to the jQuery.fn object
    $.fn.addTabs = function(options) {
        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {
            // if plugin has not already been attached to the element
            if (undefined === $(this).data('addTabs')) {
                var plugin = new $.addTabs(this, options);
                $(this).data('addTabs', plugin);
            }
        });
    };

    $.fn.addTabs.options = {
        'links'             : '.tab-link',
        'content'           : '.tab-content',
        'activeclass'       : 'active',
        'disabledclass'     : 'disabled',
        'data'              : 'related-tab',
        'defaulttab'        : '',
        beforeShowCallback  : function() {}, // function($link, $content) { }
        afterShowCallback   : function() {}, // function($link, $content) { }
    };
})(window.jQuery || window.Zepto);