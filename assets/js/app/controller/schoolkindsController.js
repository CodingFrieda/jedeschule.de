app.controller('schoolkindsController', function($scope, $location, statesService, chartistUtilsService) {
    var relevantYears = ['2007', '2015'];

    $scope.init = function(state) {
        $scope.state = state;
        statesService.get($scope.state, function(err, statedata) {
            var data = relevantYears.map(function(year) {
                return statedata.schularten[year]
            });
            var keys = Object.keys(data[0]);
            var nvd3data = keys.map(function(key) {
                var result = {key: key};
                for (var i = 0; i < data.length; i++) {
                    result[relevantYears[i]] = data[i][key];
                }
                return result;
            });

            $scope.nvd3data = _.filter(nvd3data, function(elem) {
                var delta = Math.abs(elem[relevantYears[0]] - elem[relevantYears[1]]);
                return (delta / elem[relevantYears[0]] > 0.08 && delta > 10) &&
                    elem.key !== "Keine Zuordung zu einer Schulart möglich";
            });
            var keys = _.map($scope.nvd3data, "key");
            var firstYear = _.map($scope.nvd3data, "2007");
            var secondYear = _.map($scope.nvd3data, "2015");
            $scope.teacher_data = {
                labels: keys.map(function(key) {
                    return chartistUtilsService.breakSchooltype(key);
                }),
                series: [
                    {name: "2007", "data": firstYear},
                    {name: "2015", "data": secondYear}
                ]
            };

            $scope.teacher_options = {
                seriesBarDistance: 20,
                height: '300px',
                chartPadding: {
                    top: 0,
                    right: 8,
                    bottom: 20,
                    left: 0
                },
                plugins: [
                    Chartist.plugins.legend({
                        clickable: false
                    }),
                    Chartist.plugins.ctBarLabels({
                        position: {
                            y: function(data) {
                                return data.y2 - 5
                            }
                        }
                    })
                ]
            };


            $scope.chart_events = {
                draw: chartistUtilsService.rotateLabelAwareDraw
            };
            $scope.chart_responsive = [
                ['screen and (max-width: 768px)', {
                    chartPadding: {
                        top: 0,
                        right: 8,
                        bottom: 180,
                        left: 0
                    }
                }
                ]
            ]
        });
    }
});