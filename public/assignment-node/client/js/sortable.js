"use strict";
(function(){
    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);

    function fieldSortable(FieldService) {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var axis = attributes.axis;
            $(element).sortable({
                axis: axis,
                handle: ".drag-btn",
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var formId = scope.model.formId;
                    FieldService.switchFieldIndexForForm(formId, start, end)
                        .then(function(response) {
                            scope.model.fields = response.data;
                        },
                        function() {
                            console.log("error fieldSortable->switchFieldIndexForForm");
                        });
                }
            });
        }
        return {
            link: link
        }
    }
})();