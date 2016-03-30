"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            findFormByTitleForUser: findFormByTitleForUser,
            findFormById: findFormById
        };

        return api;

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId, userId) {
            return $http.delete("/api/assignment/user/" + userId + "/form/" + formId);
        }

        function findFormByTitleForUser(userId, title) {
            return $http.get("/api/assignment/user/" + userId + "/formbytitle/" + title);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }

    }


})();