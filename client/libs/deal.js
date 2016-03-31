window.onload = function () {
  var dsv = d3.dsv(";", "text/plain");
  dsv("stat_deal.csv", function(error, data){
    function print_filter(filter){
      var f=eval(filter);
      if (typeof(f.length) != "undefined") {}else{}
      if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
      if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
      console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    }

    var ndx = crossfilter(data);

    // formate date
    var parseDate = d3.time.format("%Y-%m-%d").parse;
  	data.forEach(function(d) {
      d.date = parse_date(d.date)
  		d.date = parseDate(d.date);
      d.year = d.date.getFullYear();
      d.month = d.date.getMonth() + 1;
  	});

    var dateDim = ndx.dimension(function(d){return d.date});
    var dealSum = dateDim.group().reduceSum(function(d){return d.deal_sum});
    var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;
    // var minDate = dc// parseDate("2014-01-01");
    // var maxDate = // parseDate("2016-01-31");

    var line_chart = dc.lineChart("#line-chart");
    line_chart.width(1200).height(400)
    .x(d3.time.scale().domain([minDate,maxDate]))
    .margins({left: 50, top: 10, right: 10, bottom: 20})
    .dimension(dateDim)
    .group(dealSum);

    var yearDim = ndx.dimension(function(d){return d.year});
    var dealSumByYear = yearDim.group().reduceSum(function(d){return d.deal_sum});
    var year_pie_chart = dc.pieChart("#year-pie-chart");
    year_pie_chart.width(200).height(200)
    .dimension(yearDim)
    .group(dealSumByYear);

    var cityDim = ndx.dimension(function(d){return d.city_name});
    var dealSumByCity = cityDim.group().reduceSum(function(d){return d.deal_sum});

    var pie_chart = dc.pieChart("#pie-chart");
    pie_chart.width(200).height(200)
    .dimension(cityDim)
    .group(dealSumByCity);

    dc.renderAll()
  });

  function parse_date(date){
    date = date + "";
    year = date.slice(0,4)
    month = date.slice(4,6)
    day = date.slice(6)
    return year + '-' + month + '-' + day
  }
}
