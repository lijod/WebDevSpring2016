"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, FormService, UserService){

        var vm = this;
        var userId = -1;

        function init() {
            var loggedInUser = UserService.getCurrentUser();
            if(loggedInUser === undefined) {
                $location.url("/home");
                return;
            } else {
                userId = loggedInUser._id;
                updateFormsForCurrentUser();
            }

            vm.addForm = addForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.selectForm = selectForm;
            vm.selected = -1;
        }

        init();

        function addForm(form) {
            if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                return;
            }
            FormService.createFormForUser(userId, form, function(newForm) {
                console.log("Form added:");
                console.log(form);
                vm.selected = -1;
                vm.form = {};
                updateFormsForCurrentUser()
            });
        }

        function updateForm(form) {
            if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                vm.selected = -1;
                vm.form = {};
                return;
            }
            FormService.updateFormById(form._id, form, function(newForm) {
                console.log("Form Updated:");
                console.log(form);
                vm.forms[vm.selected] = newForm;
                vm.selected = -1;
                vm.form = {};
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById(
                vm.forms[index]._id,
                function(udpatedForms) {
                    console.log("Form Deleted:");
                    console.log(index);
                    vm.selected = -1;
                    vm.form = {};
                    updateFormsForCurrentUser();
                });
        }

        function selectForm(index) {
            var editForm = {
                "_id" : vm.forms[index]["_id"],
                "userId" : vm.forms[index]["userId"],
                "title" : vm.forms[index]["title"]
            };
            vm.form = editForm;
            vm.selected = index;
        }

        function updateFormsForCurrentUser() {
            FormService.findAllFormsForUser(userId, function (formsByUserId) {
                vm.forms = formsByUserId;
            });
        }

    }

})();