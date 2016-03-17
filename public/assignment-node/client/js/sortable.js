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
                opacity: 0.6,
                handle: ".drag-btn",
                start: function(event, ui) {
                    ui.placeholder.height(ui.item.height());
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var formId = scope.model.formId;
                    FieldService.switchFieldIndexForForm(formId, start, end)
                        .then(function(response) {
                            console.log(response.data);
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