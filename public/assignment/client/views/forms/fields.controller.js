"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FormService, FieldService) {

        var vm = this;

        function init() {
            vm.addField = addField;
            vm.removeField = removeField;
            vm.editField = editField;
            vm.updateField = updateField;
            vm.cloneField = cloneField;
            vm.modalField = {
                label: "",
                placeholder: "",
                options: ""
            };
            vm.fieldList = [
                "Single Line Text",
                "Email",
                "Password",
                "Multi Line Text",
                "Date",
                "Dropdown",
                "Checkboxes",
                "Radio Buttons"
            ];

            vm.formTitle = "";

            vm.formId = $routeParams.formId;

            updateFormName(vm.formId);

            updateFields(vm.formId);

        }

        init();

        function addField(fieldType) {
            if(!fieldType) {
                return;
            }
            console.log(fieldType);
            var fieldTemplate = [
                {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
                {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Field"},
                {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Field"},
                {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
                {"label": "New Date Field", "type": "DATE"},
                {"label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]},
                {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]},
                {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]}
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
            if(type === "TEXT" || type === "TEXTAREA" || type === "EMAIL" || type === "PASSWORD") {
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
            if(!field.label || field.label.trim() === "") {
                return;
            }
            if(field.type === "OPTIONS" || field.type === "CHECKBOXES" || field.type === "RADIOS") {
                var optionArray = getFieldOptions();
                if(optionArray.length === 0) {
                    return;
                }
                field.options = optionArray;
            }
            FieldService.updateField(vm.formId, field._id, field)
                .then(function(response) {
                    vm.fields = response.data;
                },
                function() {
                    console.log("error field->updateField->updateField");
                });
        }

        function cloneField(field) {
            delete field._id;
            FieldService.createFieldForForm(vm.formId, field)
                .then(function (response) {
                        vm.fields = response.data;
                    },
                    function () {
                        console.log("error field->addField->createFieldForForm");
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
            //if(vm.modalField.options || vm.modalField.options.trim() === "") {
            //    return undefined;
            //}
            var optionArray = vm.modalField.options.split("\n");
            var returnArray = [];
            for(var o in optionArray) {
                var option = optionArray[o].split(":");
                if(option.length === 2) {
                    if(option[0].trim() === "" || option[1].trim() === "") {
                        return [];
                    }
                    returnArray.push({
                       "label" : option[0],
                       "value" : option[1]
                    });
                }
            }
            return returnArray;
        }

        function updateFormName(formId) {
            FormService.findFormById(formId)
                .then(function(response) {
                    vm.formTitle = response.data.title;
                },
                function() {
                   console.log("error field->updateFormName->findFormById")
                });
        }

        function updateFields(formId) {
            FieldService.getFieldsForForm(formId)
                .then(function (response) {
                        vm.fields = response.data;
                        console.log(vm.fields);
                    },
                    function () {
                        console.log("error field->init->findAllFieldsForForm");
                    });
        }
    }

})();