"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {

        var vm = this;

        function init() {
            vm.addField = addField;
            vm.removeField = removeField;
            vm.fieldList = [
                "Single Line Text",
                "Multi Line Text",
                "Date",
                "Dropdown",
                "Checkboxes",
                "Radio Buttons"
            ];

            vm.formId = $routeParams.formId;

            FieldService.getFieldsForForm(vm.formId)
                .then(function (response) {
                        vm.fields = response.data;
                        console.log(vm.fields);
                    },
                    function () {
                        console.log("error field->init->findAllFieldsForForm");
                    });
        }

        init();

        function addField(fieldType) {
            console.log(fieldType);
            var fieldTemplate = [
                {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
                {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
                {"_id": null, "label": "New Date Field", "type": "DATE"},
                {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": []},
                {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": []},
                {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": []}
            ];

            FieldService.createFieldForForm(vm.formId, fieldTemplate[fieldType])
                .then(function (response) {
                        vm.fields = response.data;
                    },
                    function () {
                        console.log("error field->addField->createFieldForForm");
                    });
        }

        function removeField(field) {
            FieldService.deleteFieldForForm(vm.formId, field._id)
                .then(function(response) {
                    vm.fields = response.data;
                },
                function() {
                    console.log("error field->removeField->deleteFieldForForm");
                });
        }
    }

})();