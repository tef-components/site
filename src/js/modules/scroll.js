/**
 * Scroll directive
 * This directive adds to angular element scope a new property called
 * 'scrollPosition' with the current vertical window offset
 */
app.directive('scroll', function($window) {
    return function(scope) {
        angular.element($window).bind('scroll', function() {
            scope.scrollPosition = this.pageYOffset;
            scope.$apply();
        });
    };
});
