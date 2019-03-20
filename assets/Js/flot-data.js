//Flot Moving Line Chart
$(function() {
    var container = $("#main");
    // Determine how many data points to keep based on the placeholder's initial size;
    // this gives us a nice high-res plot while avoiding more than one point per pixel.
    //var maximum = container.outerWidth() / 2 || 300;
    var maximum = 30;
    //alert(maximum);
    //
    var data = [];
    function getRandomData() {
        $.ajax({
            type:"get",
            url:"getFlowCounts",
            async:"false",
            success:function(flowCount){
                var y=flowCount;
                data.push(y < 0 ? 0 : y > 100 ? 100 : y);
                // zip the generated y values with the x values
                var res = [];
                if(data.length<=maximum)
                {
                    var i=0;
                    for(;i<maximum-data.length;i++)
                        res.push([i,0]);
                    var count=0;
                    for(;i<maximum;i++,count++)
                        res.push([i,data[count]])
                }
                else
                {
                    data = data.slice(1);
                    for (var i = 0; i < data.length; ++i) {
                        res.push([i, data[i]])
                    }
                }
                //return res;
                series = [{
                    data: res,
                    lines: {
                        fill: true
                    }
                }];
                //
                var plot = $.plot(container, series, {
                    grid: {
                        borderWidth: 1,
                        minBorderMargin: 20,
                        labelMargin: 10,
                        backgroundColor: {
                            colors: ["#fff", "#e4f4f4"]
                        },
                        margin: {
                            top: 8,
                            bottom: 20,
                            left: 20
                        },
                        markings: function(axes) {
                            var markings = [];
                            var xaxis = axes.xaxis;
                            for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                                markings.push({
                                    xaxis: {
                                        from: x,
                                        to: x + xaxis.tickSize
                                    },
                                    color: "rgba(232, 232, 255, 0.2)"
                                });
                            }
                            return markings;
                        }
                    },
                    xaxis: {
                        tickFormatter: function() {
                            return "";
                        }
                    },
                    yaxis: {
                        min: 0,
                        max: 110
                    },
                    legend: {
                        show: true
                    }
                });
                plot.draw();
                //setInterval(getRandomData(),5000);
                getRandomData();
            }
        });
        //return res;
    }
    //
    getRandomData();
    // Update the random dataset at 25FPS for a smoothly-animating chart
    //
    //setInterval(function updateRandom() {
    //    series[0].data = getRandomData();
    //    plot.setData(series);
    //    plot.draw();
    //}, 2000);    // 40
});