describe('Ionic Content directive', function() {
  var compile, scope;

  beforeEach(module('ionic'));

  beforeEach(inject(function($compile, $rootScope, $timeout, $window) {
    compile = $compile;
    scope = $rootScope;
    timeout = $timeout;
    window = $window;
    ionic.Platform.setPlatform('Android');
  }));

  it('Has $ionicScroll controller', function() {
    var element = compile('<ion-content></ion-content>')(scope);
    expect(element.controller('$ionicScroll').element).toBe(element[0]);
  });

  it('Has content class', function() {
    var element = compile('<ion-content></ion-content>')(scope);
    expect(element.hasClass('scroll-content')).toBe(true);
  });

  it('should add padding classname', function() {
    var element = compile('<ion-content padding="shouldPad"></ion-content>')(scope);
    var scrollElement = element.find('.scroll');
    expect(scrollElement.hasClass('padding')).toEqual(false);
    element.scope().$apply('shouldPad = true');
    expect(scrollElement.hasClass('padding')).toEqual(true);
    element.scope().$apply('shouldPad = false');
    expect(scrollElement.hasClass('padding')).toEqual(false);
  });

  it('Disables bouncing when has-bouncing = false', function() {
    ionic.Platform.setPlatform('iPhone');
    var element = compile('<ion-content has-bouncing="false"></ion-content>')(scope);
    scope.$apply();
    var newScope = element.isolateScope();
    var scrollView = scope.scrollView;
    expect(scrollView.options.bouncing).toBe(false);
  });

  it('Disables bouncing by default on Android', function() {
    ionic.Platform.setPlatform('Android');
    var element = compile('<ion-content></ion-content>')(scope);
    scope.$apply();
    var newScope = element.isolateScope();
    var scrollView = scope.scrollView;
    expect(scrollView.options.bouncing).toBe(false);
  });

  it('Disables bouncing by default on Android unless', function() {
    ionic.Platform.setPlatform('Android');
    var element = compile('<ion-content has-bouncing="true"></ion-content>')(scope);
    scope.$apply();
    var newScope = element.isolateScope();
    var scrollView = scope.scrollView;
    expect(scrollView.options.bouncing).toBe(true);
  });


  it('Should set start x and y', function() {
    var element = compile('<ion-content start-x="100" start-y="300"></ion-content>')(scope);
    scope.$apply();
    var newScope = element.isolateScope();
    var scrollView = scope.scrollView;
    var vals = scrollView.getValues();
    expect(vals.left).toBe(100);
    expect(vals.top).toBe(300);
  });

});
/* Tests #555 */
describe('Ionic Content Directive scoping', function() {
  beforeEach(module('ionic', function($controllerProvider) {
    $controllerProvider.register('ContentTestCtrl', function($scope){
      this.$scope = $scope;
    });
  }));
  it('should have same scope as content', inject(function($compile, $rootScope) {
    var element = $compile('<ion-content ng-controller="ContentTestCtrl">' +
                           '<form name="myForm"></form>' +
                           '</ion-content>')($rootScope.$new());
    var contentScope = element.scope();
    var ctrl = element.data('$ngControllerController');
    expect(contentScope.myForm).toBeTruthy();
    expect(ctrl.$scope.myForm).toBeTruthy();
  }));
});
