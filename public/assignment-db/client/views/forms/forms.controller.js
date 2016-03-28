"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, FormService, UserService) {

        var vm = this;
        var userId = -1;

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                        console.log(response);
                        var loggedInUser = response.data;
                        if (loggedInUser !== undefined) {
                            userId = loggedInUser._id;
                            updateFormsForCurrentUser(userId);
                        }
                    },
                    function () {
                        console.log("error forms->init->getCurrentUser");
                    });
            vm.addForm = addForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.selectForm = selectForm;
            vm.selected = -1;
            vm.selectTitle = "";
        }

        init();

        function addForm(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                return;
            }
            getFormByTitleForUser(userId, form.title, function (formByTitle) {
                if (!formByTitle) {
                    FormService.createFormForUser(userId, form)
                        .then(function (response) {
                                console.log("Form added:");
                                console.log(form);
                                vm.forms = response.data;
                                vm.selected = -1;
                                vm.form = {};
                            },
                            function () {
                                console.log("error forms->addForm->createFormForUser");
                            });
                } else {
                    alert("Form title already exists!")
                }
            });
        }

        function updateForm(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                vm.selected = -1;
                vm.form = {};
                return;
            }
            if(form.title === vm.selectTitle){
                return;
            }
            getFormByTitleForUser(userId, form.title, function (formByTitle) {
                if (!formByTitle) {
                    FormService.updateFormById(form._id, form)
                        .then(function (response) {
                                console.log("Form Updated:");
                                console.log(form);
                                vm.forms = response.data
                                vm.selected = -1;
                                vm.form = {};
                                vm.selectTitle = "";
                            },
                            function () {
                                console.log("error forms->updateForm->updateFormById")
                            });
                }
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById(vm.forms[index]._id)
                .then(function (response) {
                        console.log("Form Deleted:");
                        console.log(index);
                        vm.forms = response.data;
                        vm.selected = -1;
                        vm.form = {};
                    },
                    function () {
                        console.log("error forms->deleteForm->deleteFormById")
                    });
        }

        function selectForm(index) {
            var editForm = {
                "_id": vm.forms[index]["_id"],
                "userId": vm.forms[index]["userId"],
                "title": vm.forms[index]["title"],
                "fields": vm.forms[index]["fields"]
            };
            vm.form = editForm;
            vm.selected = index;
            vm.selectTitle = editForm.title;
        }

        function updateFormsForCurrentUser(userId) {
            FormService.findAllFormsForUser(userId)
                .then(function (response) {
                        vm.forms = response.data;
                    },
                    function () {
                        console.log("error forms->updateFormsForCurrentUser->findAllFormsForUser")
                    });
        }

        function getFormByTitleForUser(userId, title, callback) {
            FormService.findFormByTitleForUser(userId, title)
                .then(function (response) {
                        callback(response.data);
                    },
                    function () {
                        console.log("error form->getFormByTitle->findFormByTitle")
                    });
        }

    }

})();