app.controller('agController', function ($scope, $http, $location, ag) {

    $scope.init = function(name) {
        $scope.name = name;
        ag.get(function(err, data) {
           console.log(data);
            $scope.amount_schools = data[name].ag.amount;

            $scope.data = data[name].ag.entries.map(function(item) {
                item.amount_pc = Math.floor(item.amount * 100 / $scope.amount_schools);
                return item;
            });
        });
        console.log(name)
    }
    $scope.data = [
      {name: 'Umwelt (10%)', value: 10},
      {name: 'Sport (20%)', value: 20},
      {name: 'Musik / Tanz (30%)', value: 30},
      {name: 'Gesellschaft / Participation (40%)', value: 40},
      {name: 'Literatur / Medien (50%)', value: 50},
      {name: 'Handwerk (60%)', value: 60},
      {name: 'Kultur / Kunst (70%)', value: 70},
      {name: 'Naturwissenschaft / Technik (80%)', value: 80},
      {name: 'Berufsorientierung (90%)', value: 90},
      {name: 'Sprachen (99%)', value: 99}
  ]
});