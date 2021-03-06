# addTabs

jQuery addTabs plugin. Easily add tabs to your webpage. This simple plugin will work straight out of the box for most use cases. However if you need more power there are plenty of events and callbacks that you can hook into.

* <a href="http://www.philr.org.uk/addTabs/demo/" target="_blank">View Demo Page</a>
* <a href="http://www.philr.org.uk/addTabs/demo/zepto.html" target="_blank">View Demo Page (Zepto Version)</a>
* <a href="https://github.com/PhilRowe/addTabs/archive/master.zip">Download addTabs now!</a>

## Description
* Add many groups of tabs to a single page and initialise with one line of JavaScript
* Configuration options for launch and reinit
* Lazy load images, to speed up page loading
* Access the internal methods for full control
* Cross-browser support: Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)
* Simple skin by default, Customise to make it you own!

## Dependencies
* Developed using <a href="http://jquery.com/" target="_blank">jQuery 1.11.1</a>
* Works with <a href="http://zeptojs.com/" target="_blank">Zepto!</a>

## Install with Bower
Add this plugin to your projects dependencies with <a href="http://bower.io/" target="_blank">bower</a>.

	bower install add-tabs

## Usage

### Add the library
Add both jQuery (if not already present) and the addTabs plugin to the head of your document
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="jquery.collapse.js"></script>
```

**Or** if you want to use Zepto add the <a href="http://zeptojs.com/#download" target="_blank">Zepto libary</a>, the <a href="http://zeptojs.com/#download" target="_blank">Zepto data module</a> and addTabs to the head of your document
```html
<script src="zepto/zepto.js"></script>
<script src="zepto/zepto-data.js"></script>
<script src="../src/jquery.addTabs.js"></script>
```

### Add The Markup
**Optional** add the addTabs CSS file (You could develop your own skin from scratch or add ours to your main style sheet and then modify it)
```html
<link rel="stylesheet" type="text/css" href="addTabs.css">
```

Add the tabs markup to your document e.g.
```html
<div class="tab-container addTabs">
    <div class="tabs">
        <a class="tab-link" data-related-tab="#tab-one">Tab One</a>
        <a class="tab-link" data-related-tab="#tab-two">Tab Two</a>
        <a class="tab-link" data-related-tab="#tab-three">Tab Three</a>
    </div>
    <div class="tab-holder">
        <div id="tab-one" class="tab-content">
            Tab 1 content
        </div>
        <div id="tab-two" class="tab-content">
            Tab 2 Content
        </div>
        <div id="tab-three" class="tab-content">
            Tab 3 Content
        </div>
    </div>
</div>
```

###Launch the plugin
Call addtabs on the outer container, which holds both the tab links and the tab content
```html
<script type="text/javascript">
    $(document).ready(function(){
    	$('.addTabs').addTabs();
    });
</script>
```

##Customisation
### Custom Markup and Data attributes
You may wish to use slightly different markup and classes this can be achieved by informing addTabs of your changes either through the settings (see below) or just through the html:

```html
<div class="tab-container addTabs" data-links="ul >li" data-content=".tab-holder >div">
    <ul>
        <li data-related-tab="#tab-one">Tab One</li>
        <li data-related-tab="#tab-two">Tab Two</li>
        <li data-related-tab="#tab-three">Tab Three</li>
    </ul>
    <div class="tab-holder">
        <div id="tab-one">
            Tab 1 content
        </div>
        <div id="tab-two">
            Tab 2 Content
        </div>
        <div id="tab-three">
            Tab 3 Content
        </div>
    </div>
</div>
```

### Lazy Loading Images
Images can be lazy loaded by adding the **data-lazyload="true"** to the tabs outer div or through the setting object on initialise and moving the src attribute of the image to the data-src attribute.

You can also wrap the image in a div with a class of **.lazy** which will then receive a **.loading** class whilst the image is loading.

The html below shows sample markup of how this can be achieved.

```html
<div id="tab-lazy-ex" class="tab-container" data-lazyload="true">
    <div class="tabs">
        <a class="tab-link" data-related-tab="#tab-lazy-one">Tab One</a>
    </div>
    <div class="tab-holder">
        <div id="tab-lazy-one" class="tab-content">
            <div class="lazy">
                <img data-src="example.jpg" />
            </div>
        </div>
    </div>
</div>
```

### Settings and Callbacks
You can pass settings through to the plugin on setup or reinit. Currently supported options are:

| Property				| Default		| Description
| --------------------- | ------------- | -----------
| links        			| .tab-link		| A selector which can be used to find the tab links, which when clicked will open the corresponding tab
| content      			| .tab-content	| A selector which can be used to find the divs which hold the content of the tabs
| activeclass  			| active		| The name of the class which will be added to the tab links which are active
| disabledclass 		| disabled		| If a tab link has this class it will not be activated
| data 					| related-tab	| The name of the html data attribute against a tab link which holds the ID of the related content div
| defaulttab 			| -				| ID of the tab content div to be shown be default e.g. #tab-one (the default tab can be set other ways)
| lazyload				| false			| Whether or not you want to lazy load images (data-src need to be added to the images in the tab, src needs to be removed)
| lazyloadwrapper		| .lazy			| The class added to the element around the image which will recieve the .loading class
| beforeShowCallback 	| -				| The callback function to be fired before the tab is shown
| afterShowCallback 	| -				| The callback function to be fired after the tab has shown

The following code snippet shows how you would call the plugin with custom options

```js
$('.addTabs').addTabs({
    'default' : '#tab-two',
    beforeShowCallback : function($link, $content){
        alert('The tab is about to show');
    },
});
```

### Trigger Events
You can also alter addTabs by firing events. Currently supported events are:

| Property				| Default		| Description
| --------------------- | ------------- | -----------
| addTab-show-id       	| -				| The ID of the tab content you wish to show e.g. #tab-two
| addTab-show-index     | -				| The index of the tab content that you wish to show, this is a 0 based index so passing 1 would open tab two
| addTab-next       	| -				| Go to the next tab
| addTab-prev       	| -				| Go to the previous tab

The following code snippet shows how you would trigger an event:

```js
$('.addTabs').trigger('addTab-show-id', "#tab-two");
```

### Subscribe to Events
You can listen out for a tab change using the following snippet:

| Event					| Data Returned 	| Description
| --------------------- | ------------- 	| -----------
| addTab-show       	| $link, $content	| A tab has been shown on the page
| addTab-image-loaded   | $image, $content	| A lazy load image has been loaded
| addTab-images-loaded  | $images, $content	| All images in the tab have been loaded

Events can be subscribed to using the following code:
```js
$('.addTabs').on("addTab-show", function(event, link, content){
    console.log(link);
    console.log(content);
});
```

### Reinit addTabs
If you want to change the plugins options once it has been run use the following function

```js
$('.addTabs').data('addTabs').reInit({
	'activeClass' : 'test'
});
```

** Note: ** Only options you want to change need to be passed.

### Destroy addTabs
If you need to destroy the plugin, stop it listening for clicks and events and stop it triggering events and callback (may be useful for a responsive site) the call the destroy function as shown below

```js
$('.addTabs').data('addTabs').destroy();
```
