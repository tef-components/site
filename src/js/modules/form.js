app.controller('FormCtrl', ['$rootScope', '$scope',

    function($rootScope, $scope, $http) {
        $scope.escapeHTML = function(unsafe) {
            return unsafe
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        };

        $scope.isFormValid = function() {
            return $scope.model.errorCount === 0 && $scope.model.passwordMatch;
        };

        $scope.sendForm = function(route) {

        };

        $scope.init = function() {
            $scope.model = {errorCount: 0, passwordMatch: true};
            $scope.model.message = null;
        };

        $rootScope.$on(EVENTS.ERROR_OCURRED, function(event) {
            $scope.model.errorCount += 1;
        });

        $rootScope.$on(EVENTS.ERROR_SOLVED, function(event) {
            $scope.model.errorCount -= 1;
        });

        $rootScope.$on(EVENTS.UPDATE_FIELD, function(event, response) {
            if (response.content !== undefined) {
                $scope.model[response.name] = $scope.escapeHTML(response.content);
            }
            if ($scope.model.password !== undefined && $scope.model.passwordRepeat !== undefined &&
                $scope.model.password !== '' && $scope.model.passwordRepeat !== '') {
                $scope.model.passwordMatch = $scope.model.password === $scope.model.passwordRepeat;
                $rootScope.$emit(EVENTS.PASSWORD_MATCH, $scope.model.passwordMatch);
            }
        });

        $scope.init();
    }]);

app.controller('InputCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        $scope.getErrorState = function() {
            return $scope.model.errorMessage !== '' && !$scope.model.focused;
        };

        $scope.getClass = function() {
            var classString = 'telefonica input big';
            if ($scope.getErrorState()) {
                classString += ' negative-box';
            }
            return classString;
        };

        $scope.setContent = function(content) {
            if ($scope.model.content === undefined) {
                $scope.model.content = content;
                $scope.setFocusOut();
            }
        };

        $scope.setError = function(errorString) {
            $scope.model.errorString = errorString;
            if (($scope.model.errorString.split(' ').indexOf('required') !== -1) && isRequired($scope.model.content)) {
                $rootScope.$emit(EVENTS.ERROR_OCURRED);
                $scope.model.errorState = true;
            }
        };

        $scope.setName = function(name) {
            $scope.model.name = name;
        };

        $scope.setMin = function(min) {
            $scope.model.min = min;
        };

        $scope.setMax = function(max) {
            $scope.model.max = max;
        };

        $scope.setFocusIn = function() {
            $scope.model.focused = true;
        };

        $scope.setFocusOut = function() {
            $scope.model.focused = false;

            var errorBefore = $scope.model.errorState;
            $scope.model.errorMessage =
                checkErrors($scope.model.errorString, $scope.model.min, $scope.model.max, $scope.model.content);
            $scope.model.errorState = $scope.model.errorMessage !== '';
            if ($scope.model.errorString.split(' ').indexOf('required') !== -1) {
                $scope.model.errorState = $scope.model.errorState || (isRequired($scope.model.content) !== '');
            }
            var errorAfter = $scope.model.errorState;
            console.log(errorBefore + "  " + errorAfter);


            if (errorBefore && !errorAfter) {
                $rootScope.$emit(EVENTS.ERROR_SOLVED);
            }
            if (!errorBefore && errorAfter) {
                $rootScope.$emit(EVENTS.ERROR_OCURRED);
            }

            $rootScope.$emit(EVENTS.UPDATE_FIELD, {name: $scope.model.name, content: $scope.model.content});
        };

        $rootScope.$on(EVENTS.PASSWORD_MATCH, function(event, response) {
            if ($scope.model.name === 'passwordRepeat') {
                if (!response) {
                    $scope.model.errorMessage = 'Passwords do not match.';
                } else if (!$scope.model.errorState) {
                    $scope.model.errorMessage = '';
                }
            }
        });

        $scope.init = function() {
            $scope.model = {min: 6, max: 40, errorString: '', errorMessage: '', errorState: false, name: '',
                focused: false};
        };

        $scope.init();
    }
]);


app.controller('CheckBoxCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope) {

        $scope.toggle = function() {
            $scope.model.checked = !$scope.model.checked;

            if ($scope.model.checked) {
                $rootScope.$emit(EVENTS.ERROR_SOLVED);
            } else {
                $rootScope.$emit(EVENTS.ERROR_OCURRED);
            }
        };

        $scope.init = function() {
            $scope.model = {checked: false};
            $rootScope.$emit(EVENTS.ERROR_OCURRED);
        };

        $scope.init();
    }]);


app.controller('TextAreaCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        $scope.getErrorState = function() {
            return $scope.model.errorMessage !== '' && !$scope.model.focused;
        };

        $scope.getClass = function() {
            var classString = 'telefonica textarea big';
            if ($scope.getErrorState()) {
                classString += ' negative-box';
            }
            return classString;
        };

        $scope.setContent = function(content) {
            if ($scope.model.content === undefined) {
                $scope.model.content = content;
                $scope.setFocusOut();
            }
        };

        $scope.setError = function(errorString) {
            $scope.model.errorString = errorString;
            if (($scope.model.errorString.split(' ').indexOf('required') !== -1) && isRequired($scope.model.content)) {
                $rootScope.$emit(EVENTS.ERROR_OCURRED);
                $scope.model.errorState = true;
            }
        };

        $scope.setName = function(name) {
            $scope.model.name = name;
        };

        $scope.setMin = function(min) {
            $scope.model.min = min;
        };

        $scope.setMax = function(max) {
            $scope.model.max = max;
        };

        $scope.setFocusIn = function() {
            $scope.model.focused = true;
        };

        $scope.setFocusOut = function() {
            $scope.model.focused = false;

            var errorBefore = $scope.model.errorState;
            $scope.model.errorMessage =
                checkErrors($scope.model.errorString, $scope.model.min, $scope.model.max, $scope.model.content);
            $scope.model.errorState = $scope.model.errorMessage !== '';
            if ($scope.model.errorString.split(' ').indexOf('required') !== -1) {
                $scope.model.errorState = $scope.model.errorState || (isRequired($scope.model.content) !== '');
            }
            var errorAfter = $scope.model.errorState;


            if (errorBefore && !errorAfter) {
                $rootScope.$emit(EVENTS.ERROR_SOLVED);
            }
            if (!errorBefore && errorAfter) {
                $rootScope.$emit(EVENTS.ERROR_OCURRED);
            }

            $rootScope.$emit(EVENTS.UPDATE_FIELD, {name: $scope.model.name, content: $scope.model.content});
        };

        $scope.init = function() {
            $scope.model = {min: 1, max: 4000, errorString: '', errorMessage: '', errorState: false, name: '',
                focused: false};
        };

        $scope.init();
    }
]);
