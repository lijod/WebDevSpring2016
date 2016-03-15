"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {

        var vm = this;

        function init() {
            vm.fieldList = [
                "Single Line Text",
                "Multi Line Text",
                "Date",
                "Dropdown",
                "Checkboxes",
                "Radio Buttons"
            ];

            var formId = $routeParams.formId;

            FieldService.getFieldsForForm(formId)
                .then(function(response) {
                    vm.fields = response.data;
                    console.log(vm.fields);
                },
                function() {
                    console.log("error field->init->findAllFieldsForForm");
                });
        }

        init();
    }

})();