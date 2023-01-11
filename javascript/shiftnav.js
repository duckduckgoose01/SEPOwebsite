'use strict';(function(b,f){var g=function(b,g,f){var a;return function(){var d=this,c=arguments;a?clearTimeout(a):f&&b.apply(d,c);a=setTimeout(function(){f||b.apply(d,c);a=null},g||100)}};jQuery.fn[f]=function(b){return b?this.bind("resize",g(b)):this.trigger(f)}})(jQuery,"shiftsmartresize");
var shift_supports=function(){var b=document.createElement("div"),f=["Khtml","Ms","O","Moz","Webkit"];return function(g){var h=f.length;if(g in b.style)return!0;for(g=g.replace(/^[a-z]/,function(b){return b.toUpperCase()});h--;)if(f[h]+g in b.style)return!0;return!1}}();
(function(b,f,g,h){function k(a,d){this.element=a;this.$shiftnav=b(this.element);this.$menu=this.$shiftnav.find("ul.shiftnav-menu");this.settings=b.extend({},l,d);this._defaults=l;this._name="shiftnav";this.touchenabled="ontouchstart"in f||0<navigator.maxTouchPoints||0<navigator.msMaxTouchPoints;f.navigator.pointerEnabled?(this.touchStart="pointerdown",this.touchEnd="pointerup",this.touchMove="pointermove"):f.navigator.msPointerEnabled?(this.touchStart="MSPointerDown",this.touchEnd="MSPointerUp",
this.touchMove="MSPointerMove"):(this.touchStart="touchstart",this.touchEnd="touchend",this.touchMove="touchmove");this.toggleevent="touchend"==this.touchEnd?this.touchEnd+" click":this.touchEnd;this.transitionend="transitionend.shiftnav webkitTransitionEnd.shiftnav msTransitionEnd.shiftnav oTransitionEnd.shiftnav";this.settings.clicktest&&(this.touchEnd="click");this.init()}var l={mouseEvents:!0,retractors:!0,touchOffClose:!0,clicktest:!1,windowstest:!1,debug:!1,open_current:!1,collapse_accordions:!1,
scroll_offset:100,disable_transforms:!1,close_on_target_click:!1,process_uber_segments:!0};k.prototype={init:function(){this.$shiftnav.removeClass("shiftnav-nojs");this.$toggles=b('.shiftnav-toggle[data-shiftnav-target="'+this.$shiftnav.data("shiftnav-id")+'"]');this.initializeShiftNav();this.initializeTargets();this.initializeSubmenuToggleMouseEvents();this.initializeSubmenuToggleKeyboardEvents();this.initializeRetractors();this.initializeResponsiveToggle()},initializeShiftNav:function(){var a=b("body"),
d=this;if(!a.hasClass("shiftnav-enabled")){a.addClass("shiftnav-enabled");"on"==shiftnav_data.lock_body&&a.addClass("shiftnav-lock");"on"==shiftnav_data.lock_body_x&&a.addClass("shiftnav-lock-x");"off"!=shiftnav_data.shift_body?""!=shiftnav_data.shift_body_wrapper?b(shiftnav_data.shift_body_wrapper).addClass("shiftnav-wrap"):(a.wrapInner('<div class="shiftnav-wrap"></div>'),b("video[autoplay]").each(function(){b(this).get(0).play()})):a.addClass("shiftnav-disable-shift-body");b("#shiftnav-toggle-main, #wpadminbar, .shiftnav-fixed-left, .shiftnav-fixed-right").appendTo("body");
var c=b(".shiftnav-wrap"),e=b("#shiftnav-toggle-main");if(e.length)if(!e.hasClass("shiftnav-toggle-style-burger_only")&&e.hasClass("shiftnav-togglebar-gap-auto")||e.hasClass("shiftnav-togglebar-gap-on")){var n=e.outerHeight();c.css("padding-top",n);e.addClass("shiftnav-togglebar-gap-on");"off"==shiftnav_data.shift_body&&(c="body.shiftnav-disable-shift-body{ padding-top:"+n+"px; }",""!==shiftnav_data.breakpoint&&(c="@media screen and (max-width:"+(shiftnav_data.breakpoint-1)+"px){ "+c+" }"),e=null,
e=g.getElementById("shiftnav-dynamic-css"),e||(e=g.createElement("style"),e.appendChild(g.createTextNode("")),g.head.appendChild(e)),(e=e.sheet)&&"insertRule"in e&&e.insertRule(c,0))}else b("body").hasClass("admin-bar")&&b("html").addClass("shiftnav-nogap");c=!1;e=navigator.userAgent.toLowerCase();/android/.test(e)&&(c=!0,/android [1-3]\./.test(e)?c=!0:/chrome/.test(e)?c=!1:/firefox/.test(e)&&(c=!1));(!shift_supports("transform")||c||d.settings.disable_transforms)&&a.addClass("shiftnav-no-transforms");
b(".shiftnav-searchbar-toggle").each(function(){var a=b(this).next(".shiftnav-searchbar-drop");b(this).on(d.toggleevent,function(c){d.toggleSearchBar(c,a,d)}).on("keyup.shiftnav-searchbar-toggle",function(c){13===c.keyCode&&d.toggleSearchBar(c,a,d)}).on("keydown.shiftnav-searbar-toggle",function(a){13===a.keyCode&&a.stopPropagation()})});b(".shiftnav-searchbar-drop").on(this.toggleevent,function(a){a.stopPropagation()});if(this.settings.touchOffClose)b(".shiftnav-searchbar-drop .shiftnav-search-input").on("blur",
function(a){""!=b(this).val()||m||b(this).parents(".shiftnav-searchbar-drop").removeClass("shiftnav-searchbar-drop-open")});var m;b(".shiftnav-searchbar-toggle").on("mousedown",function(a){m=!0});b(".shiftnav-searchbar-toggle").on("mouseup",function(a){m=!1});b(".shiftnav").css("max-height",f.innerHeight);b(f).shiftsmartresize(function(){b(".shiftnav").css("max-height",f.innerHeight)})}this.$shiftnav.appendTo("body");this.$shiftnav.hasClass("shiftnav-right-edge")?this.edge="right":this.edge="left";
this.openclass="shiftnav-open shiftnav-open-"+this.edge;this.$shiftnav.find(".shiftnav-panel-close").on("click",function(a){d.closeShiftNav()});this.$shiftnav.find(".shiftnav-sr-close").on("click",function(a){d.closeShiftNav();d.focusMainToggle()});this.$shiftnav.find(".shiftnav-submenu-activation").each(function(){var a=b(this).siblings(".shiftnav-target").outerHeight();b(this).css({height:a,width:a})});d.settings.process_uber_segments&&this.$shiftnav.find(".sub-menu .menu-item.current-menu-item").parents(".menu-item").addClass("current-menu-ancestor");
d.settings.open_current&&b(".shiftnav .shiftnav-sub-accordion.current-menu-item, .shiftnav .shiftnav-sub-accordion.current-menu-ancestor").addClass("shiftnav-active")},initializeTargets:function(){var a=this;this.$shiftnav.find(".shiftnav-scrollto").removeClass("current-menu-item").removeClass("current-menu-ancestor");this.$shiftnav.on("click",".menu-item > .shiftnav-target",function(d){var c=b(this).data("shiftnav-scrolltarget");if(c){var e=b(c).first();if(0<e.length)return d=b(this).parent(".menu-item"),
d.siblings().removeClass("current-menu-item").removeClass("current-menu-ancestor"),d.addClass("current-menu-item"),d=e.offset().top,d-=a.settings.scroll_offset,b("html,body").animate({scrollTop:d},1E3,"swing",function(){a.closeShiftNav()}),!1;(e=b(this).attr("href"))&&-1==e.indexOf("#")&&(-1==c.indexOf("#")&&(c="#"+c),f.location=e+c,d.preventDefault())}else b(this).is("span")&&(d=b(this).parent(".menu-item"),d.hasClass("shiftnav-active")?a.closeSubmenu(d,"disabledLink",a):a.openSubmenu(d,"disabledLink",
a));"a"===b(this).prop("tagName").toLowerCase()&&a.settings.close_on_target_click&&a.closeShiftNav()})},initializeSubmenuToggleMouseEvents:function(){if(this.settings.mouseEvents&&!this.settings.clicktest&&!this.settings.windowstest){this.settings.debug&&console.log("initializeSubmenuToggleMouseEvents");var a=this;this.$shiftnav.on("mouseup.shift-submenu-toggle",".shiftnav-submenu-activation",function(b){a.handleMouseActivation(b,this,a)})}},disableSubmenuToggleMouseEvents:function(){this.settings.debug&&
console.log("disableSubmenuToggleMouseEvents");$shiftnav.off("mouseover.shift-submenu-toggle");$shiftnav.off("mouseout.shift-submenu-toggle")},initializeSubmenuToggleKeyboardEvents:function(){this.settings.debug&&console.log("initializeSubmenuToggleKeyboardEvents");var a=this;this.$shiftnav.on("keyup.shift-submenu-toggle",".shiftnav-submenu-activation",function(d){if(13===d.keyCode){a.handleMouseActivation(d,this,a);var c=b(this).siblings(".shiftnav-submenu-activation").first();c.length&&setTimeout(function(){c.focus()},
10)}})},initializeRetractors:function(){if(this.settings.retractors){var a=this;this.$shiftnav.on("mouseup.shiftnav",".shiftnav-retract",function(b){a.handleSubmenuRetractorEnd(b,this,a)});this.$shiftnav.on("keyup.shiftnav",".shiftnav-retract",function(b){13===b.keyCode&&a.handleSubmenuRetractorEnd(b,this,a)})}},initializeResponsiveToggle:function(){var a=this;this.$toggles.on("click","a",function(a){a.stopPropagation()});this.$toggles.on("click",function(d){a.toggle(b(this),a,d)});this.$toggles.on("keydown",
function(a){if(9===a.keyCode){var c=b(this).data("shiftnav-target");c=b('[data-shiftnav-id="'+c+'"]');c.length&&c.hasClass("shiftnav-open-target")&&(a.preventDefault(),c.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").first().focus())}});if("shiftnav-main"===this.$shiftnav.attr("id"))b("#shiftnav-toggle-main.shiftnav-toggle-main-entire-bar").on("keydown",function(d){13===
d.keyCode&&a.toggle(b(this),a,d)})},toggle:function(a,d,c){c.preventDefault();c.stopPropagation();if("click"!=c.originalEvent.type||!b(this).data("disableToggle")){if(d.$shiftnav.hasClass("shiftnav-open-target"))d.closeShiftNav();else{a=a.attr("id");var e="shiftnav-toggle-main"==a?"[Main Toggle Bar]":'"'+b(this).text()+'"';"shiftnav-toggle-main-button"!=a&&"shiftnav-toggle-main"!=a||!b("body").hasClass("shiftnav-open")?d.openShiftNav("toggle: "+e):b(".shiftnav.shiftnav-open-target").shiftnav("closeShiftNav")}"click"!==
c.originalEvent.type&&"keydown"!==c.originalEvent.type&&(b(this).data("disableToggle",!0),setTimeout(function(){b(this).data("disableToggle",!1)},1E3));return!1}},openShiftNav:function(a){var d=this;this.settings.debug&&console.log("openShiftNav "+(a||"?"));b("body").removeClass("shiftnav-open-right shiftnav-open-left").addClass(this.openclass).addClass("shiftnav-transitioning");b(".shiftnav-open-target").removeClass("shiftnav-open-target");this.$shiftnav.addClass("shiftnav-open-target").on(d.transitionend,
function(){b("body").removeClass("shiftnav-transitioning");b(this).off(d.transitionend)});this.$shiftnav.trigger("shiftnav-open");this.disableTouchoffClose();this.initializeTouchoffClose();b("body").on("focusin.shiftnavPanel",function(a){d.closeShiftNav();d.focusMainToggle()});this.$shiftnav.on("focusin.shiftnavPanel",function(a){a.stopPropagation()});b(g).on("keyup.shiftnavPanel",function(a){27===a.keyCode&&(d.closeShiftNav(),d.focusMainToggle())})},closeShiftNav:function(){var a=this;b("body").removeClass(this.openclass).addClass("shiftnav-transitioning");
this.$shiftnav.removeClass("shiftnav-open-target").on(a.transitionend,function(){b("body").removeClass("shiftnav-transitioning");b(this).off(a.transitionend)});this.$shiftnav.trigger("shiftnav-close");this.disableTouchoffClose();b("body").off("focusin.shiftnavPanel");this.$shiftnav.off("focusin.shiftnavPanel");b(g).off("keyup.shiftnavPanel")},focusMainToggle:function(a){"shiftnav-main"===this.$shiftnav.attr("id")&&b('#shiftnav-toggle-main .shiftnav-toggle[data-shiftnav-target="shiftnav-main"]').focus()},
initializeTouchoffClose:function(){if(this.settings.touchOffClose){var a=this;b(g).on("click.shiftnav "+this.touchEnd+".shiftnav",function(b){a.handleTouchoffClose(b,this,a)})}},disableTouchoffClose:function(){b(g).off(".shiftnav")},handleMouseActivation:function(a,d,c){c.settings.debug&&console.log("handleMouseover, add mouseout",a);a=b(d).parent();a.hasClass("shiftnav-active")?c.closeSubmenu(a,"mouseActivate",c):c.openSubmenu(a,"mouseActivate",c)},handleSubmenuRetractorEnd:function(a,d,c){a.preventDefault();
a.stopPropagation();a=b(d).parent("ul").parent("li");c.closeSubmenu(a,"handleSubmenuRetractor",c);c.settings.debug&&console.log("handleSubmenuRetractorEnd "+a.find("> a").text())},handleTouchoffClose:function(a,d,c){b("body").is(".shiftnav-transitioning")||0!==b(a.target).parents().add(b(a.target)).filter(".shiftnav, .shiftnav-toggle, .shiftnav-ignore").length||(c.settings.debug&&console.log("touchoff close ",a),a.preventDefault(),a.stopPropagation(),c.closeShiftNav(),c.disableTouchoffClose())},scrollPanel:function(a){if("off"==
shiftnav_data.scroll_panel)return 0;if("undefined"==typeof a)return this.$shiftnav.find(".shiftnav-inner").scrollTop();this.$shiftnav.find(".shiftnav-inner").scrollTop(a)},openSubmenu:function(a,d,c){a.hasClass("shiftnav-active")||(a.hasClass("shiftnav-sub-shift")?(a.siblings(".shiftnav-active").removeClass("shiftnav-active"),a.toggleClass("shiftnav-caulk"),c.$shiftnav.addClass("shiftnav-sub-shift-active")):c.settings.collapse_accordions&&a.siblings(".shiftnav-active").removeClass("shiftnav-active"),
a.parents("ul").removeClass("shiftnav-sub-active-current"),a.find("> ul").addClass("shiftnav-sub-active").addClass("shiftnav-sub-active-current"),setTimeout(function(){a.addClass("shiftnav-active");a.trigger("shiftnav-open-submenu");a.removeClass("shiftnav-caulk");setTimeout(function(){var d=c.scrollPanel();a.data("scroll-back",d);d=a.offset().top+d-b(f).scrollTop();c.scrollPanel(d)},100)},1))},closeSubmenu:function(a,d,c){this.settings.debug&&console.log("closeSubmenu "+a.find(">a").text()+" ["+
d+"]");a.hasClass("menu-item-has-children")&&a.hasClass("shiftnav-active")&&(a.addClass("shiftnav-in-transition"),a.each(function(){var a=b(this),e=a.find("> ul");e.on(c.transitionend+"_closesubmenu",function(){c.settings.debug&&console.log("finished submenu close transition");a.removeClass("shiftnav-in-transition");e.off(c.transitionend+"_closesubmenu")});c.closeSubmenu(a.find(".shiftnav-active"),d+"_recursive",c)}));a.removeClass("shiftnav-active");if(a.hasClass("shiftnav-sub-shift")){0==a.parents(".shiftnav-sub-shift").length&&
c.$shiftnav.removeClass("shiftnav-sub-shift-active");var e=a.data("scroll-back");"undefined"!==e&&c.scrollPanel(e)}a.find("> ul").removeClass("shiftnav-sub-active").removeClass("shiftnav-sub-active-current");a.closest("ul").addClass("shiftnav-sub-active-current");a.trigger("shiftnav-close-submenu")},closeAllSubmenus:function(){b(this.element).find("li.menu-item-has-children").removeClass("shiftnav-active")},toggleSearchBar:function(a,d,c){a.stopPropagation();a.preventDefault();d.hasClass("shiftnav-searchbar-drop-open")?
(d.removeClass("shiftnav-searchbar-drop-open"),b("body").off("click.shiftnav-searchbar-drop")):(d.addClass("shiftnav-searchbar-drop-open"),d.find(".shiftnav-search-input").focus(),c.settings.touchOffClose&&setTimeout(function(){b("body").on("click.shiftnav-searchbar-drop",function(a){b(".shiftnav-searchbar-drop").removeClass("shiftnav-searchbar-drop-open");b("body").off("click.shiftnav-searchbar-drop")})},100))}};b.fn.shiftnav=function(a){var d=arguments;if(a===h||"object"===typeof a)return this.each(function(){b.data(this,
"plugin_shiftnav")||b.data(this,"plugin_shiftnav",new k(this,a))});if("string"===typeof a&&"_"!==a[0]&&"init"!==a){var c;this.each(function(){var e=b.data(this,"plugin_shiftnav");e instanceof k&&"function"===typeof e[a]&&(c=e[a].apply(e,Array.prototype.slice.call(d,1)));"destroy"===a&&b.data(this,"plugin_shiftnav",null)});return c!==h?c:this}}})(jQuery,window,document);
(function(b){function f(a){if(!l){l=!0;"undefined"!=typeof console&&"window.load"==a&&console.log("ShiftNav initialized via "+a);b(".shiftnav-loading").remove();jQuery(".shiftnav").shiftnav({open_current:"on"==shiftnav_data.open_current?!0:!1,collapse_accordions:"on"==shiftnav_data.collapse_accordions?!0:!1,breakpoint:parseInt(shiftnav_data.breakpoint),touchOffClose:"on"==shiftnav_data.touch_off_close?!0:!1,scroll_offset:shiftnav_data.scroll_offset,disable_transforms:"on"==shiftnav_data.disable_transforms?
!0:!1,close_on_target_click:"on"==shiftnav_data.close_on_target_click?!0:!1,process_uber_segments:"on"==shiftnav_data.process_uber_segments?!0:!1});if("."==window.location.hash.substring(1,2)&&(a=b(window.location.hash.substring(1)),a.length)){var c=a.offset().top-shiftnav_data.scroll_offset;a.length&&window.scrollTo(0,c)}window.location.hash&&(a=window.location.hash,"."==a.substring(1,2)&&(a=a.substring(1)),a=a.replace(/[^#a-z0-9!$&'()*+,;=]/gi,""),a=b(".shiftnav").find('.shiftnav-target[data-shiftnav-scrolltarget="'+
a+'"]').parent(),a.length&&(a.siblings().removeClass("current-menu-item").removeClass("current-menu-ancestor"),a.addClass("current-menu-item")));"1"==shiftnav_data.pro&&(g(),b(window).on("scroll",k(h(g,200),200)));b(".shiftnav").trigger("shiftnav-loaded")}}function g(){var c=b("body"),e=b(window).scrollTop(),f="";e<=shiftnav_data.scroll_top_boundary?f="top":e>a?f="down":e<a&&(f="up");if(f!==d)switch(c.removeClass("shiftnav--scroll-top shiftnav--scroll-up shiftnav--scroll-down"),f){case "top":c.addClass("shiftnav--scroll-top");
break;case "down":c.addClass("shiftnav--scroll-down");break;case "up":c.addClass("shiftnav--scroll-up")}c.trigger("shiftnav-window-scroll",{scrollTop:e,scrollDir:f,prevScrollDir:d});d=f;a=e}function h(a,b,d){var c;return function(){var e=this,f=arguments,g=d&&!c;clearTimeout(c);c=setTimeout(function(){c=null;d||a.apply(e,f)},b);g&&a.apply(e,f)}}function k(a,b){var c;return function(){var d=arguments;c||(a.apply(this,d),c=!0,setTimeout(function(){c=!1},b))}}var l=!1;jQuery(function(a){f("document.ready")});
b(window).on("load",function(){f("window.load")});var a=0,d=""})(jQuery);