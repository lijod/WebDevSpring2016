"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var api = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            getFieldForForm : getFieldForForm,
            deleteFieldForForm : deleteFieldForForm,
            updateField : updateField,
            changeFieldIndexForForm: changeFieldIndexForForm
        };

        return api;

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId)
        }

        function deleteFieldForForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function changeFieldIndexForForm(formId, pos1, pos2) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + pos1 + "/" + pos2);
        }
    }

})();