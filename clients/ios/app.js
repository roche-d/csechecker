/**
 * Created by roche_d on 11/05/15.
 */

// If we need to use custom DOM library, let's save it to $$ variable:
(function (Framework7, $$, Api) {
    'use strict';

    // Initialize app
    var myApp = new Framework7({
        template7Pages: true,
        precompileTemplates: true
    });



    // Add view
    var mainView = myApp.addView('.view-main', {
        // Because we want to use dynamic navbar, we need to enable it for this view:
        dynamicNavbar: true,
        domCache: true
    });

    myApp.onPageInit('*', function (page) {
        console.log(page.name + ' initialized');
    });

    var appData = {
        currentStatus: Api.UNKNOWN
    };

    mainView.router.load({
        template: Template7.templates.currentStatus,
        context: {status: appData.currentStatus}
    });



    var ptrContent = $$('.pull-to-refresh-content');

    ptrContent.on('refresh', function (e) {
        reloadStatusPage();
        myApp.pullToRefreshDone();
    });

    function reloadStatusPage() {

        var show = function (item) {
            var n = new Date(item.date);

            var itemHTML = '<li class="item-content">' +
                '<div class="item-media"><img src="' + '" width="44"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' + item.status + '</div>' +
                '</div>' +
                '<div class="item-subtitle">' + n.getHours() + ':' + ((n.getMinutes() < 10) ? ('0' + n.getMinutes()) : n.getMinutes()) + '</div>' +
                '</div>' +
                '</li>';
            ptrContent.find('ul').prepend(itemHTML);
        };

        Api.checkStatus(function (data) {
            if (data) {
                ptrContent.find('li').remove();
                console.log(appData.currentStatus);
                for (var i=0; i < data.length; i++) {
                    show(data[i]);
                }
            }
        }, function (data) {
            console.log('error');
            appData.currentStatus = data;
            show();
        });

    }


    setInterval(reloadStatusPage, 10000);
    console.log(appData.currentStatus);
    console.log(Api)

    console.log('App started...');


})
(Framework7, Dom7, Api);