
(function (Framework7, $$) {
    'use strict';

    var debug = false;

    var Api = {
        server: (debug) ? 'http://127.0.0.1:8977' : 'http://voty.io:8977',
        checkStatus: function (success, fail) {
            $$.get(this.server + '/cse/status', null, function (data) {
                console.log('status check');
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                if (data.res)
                {
                    console.log('success');
                    success(data.data);

                } else {
                    fail(this.status.UNKNOWN);
                }
            });
        },
        status: {UNKNOWN: "UNKNOWN", WAITING: "WAITING", AVAILABLE: "AVAILABLE"}
    };

    console.log('api init');
    console.log(Api.status.UNKNOWN)

    window.Api = Api;
})
(Framework7, Dom7);