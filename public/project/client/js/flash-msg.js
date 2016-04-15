"use strict";
(function () {
    angular
        .module("flashMessage", [])
        .directive("flashMessage", FlashMessage);

    function FlashMessage() {
        return {
            template: function (element, attribute) {
                var type = attribute.type;
                var header = attribute.header;
                var message = attribute.msg;
                return '<div class="flash-msg-container text-center">' +
                            '<div class="alert alert-' + type + '">' +
                                '<strong>'  + header + '</strong>! ' + message +
                            '</div>' +
                        '</div>'
            }
        }
    }
})();