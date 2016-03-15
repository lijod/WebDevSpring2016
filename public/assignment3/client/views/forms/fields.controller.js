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
            vm.editField = editField;
            vm.updateField = updateField;
            vm.modalField = {
                label: "",
                placeholder: "",
                options: ""
            };
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

        function editField(field) {
            vm.modalField = {
                "_id": field._id,
                "label": field.label,
                "type": field.type
            };
            var type = field.type;
            if(type == "TEXT" || type == "TEXTAREA") {
                vm.hasPlaceholder = true;
                vm.hasOptions = false;
                vm.modalField.placeholder = field.placeholder;
            } else if(type === "OPTIONS" || type === "CHECKBOXES" || type === "RADIOS") {
                vm.hasOptions = true;
                vm.hasPlaceholder = false;
                setFieldOptions(field.options);
            } else {
                vm.hasOptions = false;
                vm.hasPlaceholder = false;
            }
        }

        function updateField(field) {
            if(field.type === "OPTIONS" || field.type === "CHECKBOXES" || field.type === "RADIOS") {
                field.options = getFieldOptions();
            }
            FieldService.updateField(vm.formId, field._id, field)
                .then(function(response) {
                    vm.fields = response.data;
                },
                function() {
                    console.log("error field->updateField->updateField");
                });
        }

        function setFieldOptions(options) {
            var str = "";
            var counter = 0;
            for(var o in options) {
                str += options[o].label + ":" + options[o].value;
                if(counter < options.length - 1){
                    str += "\n";
                }
                counter++;
            }

            vm.modalField.options = str;
        }

        function getFieldOptions() {
            var optionArray = vm.modalField.options.split("\n");
            var returnArray = [];
            for(var o in optionArray) {
                var option = optionArray[o].split(":");
                if(option.length == 2) {
                    returnArray.push({
                       "label" : option[0],
                       "value" : option[1]
                    });
                }
            }
            return returnArray;
        }
    }

})();