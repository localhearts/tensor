$(document).ready(function () {
    // $('input[name="datefilter"]').daterangepicker({
    //     autoUpdateInput: false,
    //     locale: {
    //         cancelLabel: 'Clear'
    //     }
    // });
    // $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
    //     $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    // });

    // $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
    //     $(this).val('');
    // });
    'use strict';
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var Maindate = new Date();
    var Mainyear = Maindate.getFullYear();
    var Mainmonth = String(Maindate.getMonth() + 1).padStart(2, '0');
    var Mainday = String(Maindate.getDate()).padStart(2, '0');
    var MainFulldate = Mainyear + '-' + Mainmonth + '-' + Mainday;
    var month = monthNames[Maindate.getMonth()]
    var lastWeek = getLastWeek();
    var lastWeekMonth = String(lastWeek.getMonth() + 1).padStart(2, '0');
    var lastWeekDay = String(lastWeek.getDate()).padStart(2, '0');
    var lastWeekYear = lastWeek.getFullYear();
    var lastYearDisplay = Mainyear + '-01-01';
    var lastMonthDisplay = Mainyear + '-' + Mainmonth + '-' + '01';
    var lastWeekDisplay = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;


    var gte = getParameterByName('gte');
    var lte = getParameterByName('lte');
    var keyword = getParameterByName('keyword');
    var notifier = getParameterByName('notifier');
    var dt = getParameterByName('dt')
    Search('2022-07-14','2022-07-14','*').then();
  


    async function Search(parseAwal, parseAkhir, keyword) {
        $('div.count-total').html('<div class="lds-facebook count-total"><div></div><div></div><div></div></div>');
        $('div.count-elevated').html('<div class="lds-facebook count-elevated"><div></div><div></div><div></div></div>');
        $('div.count-medium').html('<div class="lds-facebook count-medium"><div></div><div></div><div></div></div>');
        $.get('../api/sensor/doc/' + parseAwal + '/' + parseAkhir + '/' + keyword )
        .then((response) => {
            var aggregation = response.aggregation;
            $('div.count-total').html(aggregation.total_data.value);
            $('div.count-medium').html(aggregation.impact.buckets.medium.doc_count);
            $('div.count-elevated').html(aggregation.impact.buckets.elevated.doc_count);
        })
    }
    async function SeaSrch(parseAwal, parseAkhir, keyword, notifier) {
        var search_data = Array();

        $('div.count-total').html('<div class="lds-facebook count-total"><div></div><div></div><div></div></div>');
        $('div.count-sch-id').html('<div class="lds-facebook count-sch-id"><div></div><div></div><div></div></div>');
        $('div.count-go-id').html('<div class="lds-facebook count-go-id"><div></div><div></div><div></div></div>');
        $('div.count-ac-id').html('<div class="lds-facebook count-ac-id"><div></div><div></div><div></div></div>');
        $('div.count-or-id').html('<div class="lds-facebook count-or-id"><div></div><div></div><div></div></div>');
        $('div.count-web-id').html('<div class="lds-facebook count-web-id"><div></div><div></div><div></div></div>');
        $('div.count-net-id').html('<div class="lds-facebook count-net-id"><div></div><div></div><div></div></div>');
        $('div.count-co-id').html('<div class="lds-facebook count-co-id"><div></div><div></div><div></div></div>');
        $('div#chartdiv').html('<div class="lds-facebook" id="chartdiv" style="left:50%;top:30%;"><div></div><div></div><div></div></div>');
        $('div#topserverdiv').html('<div class="lds-facebook" id="topserverdiv" style="left:40%;top:30%;"><div></div><div></div><div></div></div>');
        $('div#topcitydiv').html('<div class="lds-facebook" id="topcitydiv" style="left:40%;top:30%;"><div></div><div></div><div></div></div>');
        $('div#topipdiv').html('<div class="lds-facebook" id="topipdiv" style="left:40%;top:30%;"><div></div><div></div><div></div></div>');
        $('div#topcountry').html('<div class="lds-facebook" id="topcountry" style="left:45%;top:30%;"><div></div><div></div><div></div></div>');
        $('div#topnotifierdiv').html('<div class="lds-facebook" id="topnotifierdiv" style="left:45%;top:30%;"><div></div><div></div><div></div></div>');
        $('div#defacer-cloud').html('<div class="lds-facebook" id="defacer-cloud" style="left:45%;top:30%;"><div></div><div></div><div></div></div>');
        $('div#team-cloud').html('<div class="lds-facebook" id="team-cloud" style="left:45%;top:30%;"><div></div><div></div><div></div></div>');

        $.get('../api/medict/data/' + parseAwal + '/' + parseAkhir + '/' + keyword + '/' + notifier)
            .then((response) => {
                search_data = response;
                var defacer = search_data.defacer;
                var isp = search_data.isp;
                var list = search_data.data;
                var aggregation = response.aggregation;
                $('div.count-total').html(aggregation.total_data.value);
                $('div.count-sch-id').html(aggregation.impact.buckets.schid.doc_count);
                $('div.count-go-id').html(aggregation.impact.buckets.goid.doc_count);
                $('div.count-ac-id').html(aggregation.impact.buckets.acid.doc_count);
                $('div.count-or-id').html(aggregation.impact.buckets.orid.doc_count);
                $('div.count-web-id').html(aggregation.impact.buckets.webid.doc_count);
                $('div.count-net-id').html(aggregation.impact.buckets.netid.doc_count);
                $('div.count-co-id').html(aggregation.impact.buckets.coid.doc_count);

                // MAPS

                // Adding a Circle
                var locations = response.maps;

                var map = L.map('leaflet3').setView([-1.6524051, 122.5073844], 4.4);
                let myFilter = [
                    'hue:0deg',
                    'invert:100%',
                    'grayscale:100%',
                    'opacity:100%'
                ]
                let myTileLayer = L.tileLayer.colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">© 2022 De Medict </a>',
                    filter: myFilter,
                }).addTo(map);
                var pulsingIcon = L.icon.pulse({ iconSize: [10, 10], color: 'red' });
                for (var i = 0; i < locations.length; i++) {
                    marker = new L.marker([locations[i][1], locations[i][2]], {
                        icon: pulsingIcon
                    }).bindPopup("<b>DETAIL:</b><br><br>Total : " + locations[i][0] + "<br>Latitude : " + locations[i][1] + "<br>Longitude : " + locations[i][2] + "").addTo(map);
                    // marker = new L.marker([locations[i][1], locations[i][2]])
                    //   .bindPopup(locations[i][0])
                    //   .addTo(map);
                }


                // 3D PIE NOTIFIER CHART

                var top_notifier = aggregation.impact;
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("topnotifierdiv", am4charts.PieChart3D);
                chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                chart.legend = new am4charts.Legend();
                chart.legend.position = "bottom";
                chart.legend.labels.template.fill = am4core.color("#FFF");
                chart.legend.valueLabels.template.fill = am4core.color("#FFF");

                // Add data
                chart.data = [
                    {
                        "key": "SCH.ID",
                        "doc_count": top_notifier.buckets.schid.doc_count
                    },
                    {
                        "key": "AC.ID",
                        "doc_count": top_notifier.buckets.acid.doc_count
                    },
                    {
                        "key": "CO.ID",
                        "doc_count": top_notifier.buckets.coid.doc_count
                    },
                    {
                        "key": "GO.ID",
                        "doc_count": top_notifier.buckets.goid.doc_count
                    },
                    {
                        "key": "NET.ID",
                        "doc_count": top_notifier.buckets.netid.doc_count
                    },
                    {
                        "key": "OR.ID",
                        "doc_count": top_notifier.buckets.orid.doc_count
                    },
                    {
                        "key": "WEB.ID",
                        "doc_count": top_notifier.buckets.webid.doc_count
                    }

                ];

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries3D());
                pieSeries.dataFields.value = "doc_count";
                pieSeries.dataFields.category = "key";
                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;
                //series.labels.template.urlTarget = "_blank";
                // Disable tooltips


                pieSeries.tooltip.label.interactionsEnabled = true;
                pieSeries.tooltip.keepTargetHover = true;
                pieSeries.slices.template.tooltipHTML = '<b>{category}</b><br><a href="dashboard?dt=other&keyword={category.urlEncode()}&datefilter=' + parseAwal + '+-+' + parseAkhir + '&notifier=*">More info</a>';
                // 3D PIE COUNTRY CHART

                var top_notifier = aggregation.defacer_country.buckets;
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("topcountry", am4charts.PieChart3D);
                chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                chart.legend = new am4charts.Legend();
                chart.legend.position = "bottom";
                chart.legend.labels.template.fill = am4core.color("#FFF");
                chart.legend.valueLabels.template.fill = am4core.color("#FFF");


                // Add data
                chart.data = top_notifier;

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries3D());
                pieSeries.dataFields.value = "doc_count";
                pieSeries.dataFields.category = "key";
                pieSeries.labels.template.disabled = true;
                pieSeries.ticks.template.disabled = true;

                // Disable tooltips
                pieSeries.tooltip.label.interactionsEnabled = true;
                pieSeries.tooltip.keepTargetHover = true;
                pieSeries.slices.template.tooltipHTML = '<b>{category}</b><br><a href="dashboard?dt=other&keyword={category.urlEncode()}&datefilter=' + parseAwal + '+-+' + parseAkhir + '&notifier=*">More info</a>';






                var top_ip = aggregation.top_ip.buckets;
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("topipdiv", am4charts.PieChart);

                // Add data
                chart.data = top_ip;

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "doc_count";
                pieSeries.dataFields.category = "key";
                pieSeries.innerRadius = am4core.percent(50);
                pieSeries.ticks.template.disabled = true;
                pieSeries.labels.template.disabled = true;
                pieSeries.tooltip.label.interactionsEnabled = true;
                pieSeries.tooltip.keepTargetHover = true;
                pieSeries.slices.template.tooltipHTML = '<b>{category}</b><br><a href="dashboard?dt=other&keyword={category.urlEncode()}&datefilter=' + parseAwal + '+-+' + parseAkhir + '&notifier=*">More info</a>';


                var rgm = new am4core.RadialGradientModifier();
                rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
                pieSeries.slices.template.fillModifier = rgm;
                pieSeries.slices.template.strokeModifier = rgm;
                pieSeries.slices.template.strokeOpacity = 0.4;
                pieSeries.slices.template.strokeWidth = 0;

                chart.legend = new am4charts.Legend();
                chart.legend.position = "right";
                chart.legend.labels.template.fill = am4core.color("#FFF");
                chart.legend.valueLabels.template.fill = am4core.color("#FFF");



                var top_city = aggregation.top_city.buckets;
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("topcitydiv", am4charts.PieChart);

                // Add data
                chart.data = top_city;

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "doc_count";
                pieSeries.dataFields.category = "key";
                pieSeries.innerRadius = am4core.percent(50);
                pieSeries.ticks.template.disabled = true;
                pieSeries.labels.template.disabled = true;
                pieSeries.tooltip.label.interactionsEnabled = true;
                pieSeries.tooltip.keepTargetHover = true;
                pieSeries.slices.template.tooltipHTML = '<b>{category}</b><br><a href="dashboard?dt=other&keyword={category.urlEncode()}&datefilter=' + parseAwal + '+-+' + parseAkhir + '&notifier=*">More info</a>';


                var rgm = new am4core.RadialGradientModifier();
                rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
                pieSeries.slices.template.fillModifier = rgm;
                pieSeries.slices.template.strokeModifier = rgm;
                pieSeries.slices.template.strokeOpacity = 0.4;
                pieSeries.slices.template.strokeWidth = 0;

                chart.legend = new am4charts.Legend();
                chart.legend.position = "right";
                chart.legend.labels.template.fill = am4core.color("#FFF");
                chart.legend.valueLabels.template.fill = am4core.color("#FFF");

                var top_server = aggregation.top_server.buckets;
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("topserverdiv", am4charts.PieChart);

                // Add data
                chart.data = top_server;

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "doc_count";
                pieSeries.dataFields.category = "key";
                pieSeries.innerRadius = am4core.percent(60);
                pieSeries.ticks.template.disabled = true;
                pieSeries.labels.template.disabled = true;
                pieSeries.tooltip.label.interactionsEnabled = true;
                pieSeries.tooltip.keepTargetHover = true;
                pieSeries.slices.template.tooltipHTML = '<b>{category}</b><br><a href="dashboard?dt=other&keyword={category.urlEncode()}&datefilter=' + parseAwal + '+-+' + parseAkhir + '&notifier=*">More info</a>';


                var rgm = new am4core.RadialGradientModifier();
                rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
                pieSeries.slices.template.fillModifier = rgm;
                pieSeries.slices.template.strokeModifier = rgm;
                pieSeries.slices.template.strokeOpacity = 0.4;
                pieSeries.slices.template.strokeWidth = 0;

                chart.legend = new am4charts.Legend();
                chart.legend.position = "right";
                chart.legend.labels.template.fill = am4core.color("#FFF");
                chart.legend.valueLabels.template.fill = am4core.color("#FFF");


                $('#team-cloud').ready(function () {
                    var telegramcloud = aggregation.team_cloud.buckets;
                    am4core.useTheme(am4themes_animated);
                    var chart = am4core.create("team-cloud", am4plugins_wordCloud.WordCloud);
                    chart.fontFamily = "Courier New";
                    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

                    series.randomness = 0.1;
                    series.rotationThreshold = 0.5;
                    series.minWordLength = 2;
                    series.data = telegramcloud;
                    series.dataFields.word = "key";
                    series.dataFields.value = "doc_count";
                    series.heatRules.push({
                        "target": series.labels.template,
                        "property": "fill",
                        "min": am4core.color("#FF5733"),
                        "max": am4core.color("#FFC300"),
                        "dataField": "value"
                    });

                    series.labels.template.url = "dashboard?dt=other&keyword={word}&datefilter=" + parseAwal + "+-+" + parseAkhir + "&notifier=*";
                    //series.labels.template.urlTarget = "_blank";
                    //series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";


                });
                $('#defacer-cloud').ready(function () {
                    var telegramcloud = aggregation.defacer_cloud.buckets;
                    am4core.useTheme(am4themes_animated);
                    var chart = am4core.create("defacer-cloud", am4plugins_wordCloud.WordCloud);
                    chart.fontFamily = "Courier New";
                    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

                    series.randomness = 0.1;
                    series.rotationThreshold = 0.5;
                    series.minWordLength = 2;
                    series.data = telegramcloud;
                    series.dataFields.word = "key";
                    series.dataFields.value = "doc_count";
                    series.heatRules.push({
                        "target": series.labels.template,
                        "property": "fill",
                        "min": am4core.color("#FF5733"),
                        "max": am4core.color("#FFC300"),
                        "dataField": "value"
                    });

                    series.labels.template.url = "dashboard?dt=other&keyword={word}&datefilter=" + parseAwal + "+-+" + parseAkhir + "&notifier=*";
                    //series.labels.template.urlTarget = "_blank";
                    //series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";


                });
                $('#datatable-defacer').DataTable({
                    order: [],
                    data: defacer,
                    columns: [
                        { data: 'domain' },
                        { data: 'defacer' },
                        { data: 'count' },

                    ],

                });
                $('#datatable-isp').DataTable({
                    order: [],
                    data: isp,
                    columns: [
                        { data: 'isp' },
                        { data: 'count' },

                    ],

                });

                $('#datatable-data').DataTable({
                    order: [],
                    data: list,
                    columnDefs: [
                        { type: 'date-eu', targets: 0 }
                      ],
                    columns: [
                        {
                            data: 'date',
                            render: function (data, type, row, meta) {
                                let get_Date = moment.tz(data, 'UTC');
                                return get_Date.local().format('DD/MM/YYYY');
                            }
                        },
                        { data: 'ipaddress' },
                        { data: 'dafacer' },
                        { data: 'tld_domain' },
                        { data: 'webserver' },

                        {
                            data: 'ip_location',
                            render: function (data, type, row, meta) {
                                return data ? data.city : '';
                            }
                        },
                        {
                            data: 'ip_location',
                            render: function (data, type, row, meta) {
                                return data ? data.country : '';
                            }
                        },
                        { data: 'hackurl' },
                        { data: 'team' },
                    ],



                });
                var time_series = response.aggregation.time_series.buckets;
                var domain_time_series = response.aggregation.domain_time_series.buckets;
                var domainBar = $('#domain-timeseries');

                domainBar = new Chart(domainBar, {
                    type: 'bar',
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            labels: {
                                fontColor: "#fff",
                                fontSize: 12
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "#fff",
                                    fontSize: 12,
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "#fff",
                                    fontSize: 12,
                                    stepSize: 1,
                                    beginAtZero: true
                                }
                            }]
                        }
                    },
                    data: {
                        labels: domain_time_series.map(o => o.key_as_string),
                        datasets: [{
                            data: domain_time_series.map(o => o.domain_timeseries.buckets.acid.doc_count),
                            label: 'AC.ID',
                            backgroundColor: '#17A589',
                            borderColor: '#17A589'
                        },
                        {
                            data: domain_time_series.map(o => o.domain_timeseries.buckets.goid.doc_count),
                            label: 'GO.ID',
                            backgroundColor: '#FFC300',
                            borderColor: '#FFC300'
                        },
                        {
                            data: domain_time_series.map(o => o.domain_timeseries.buckets.schid.doc_count),
                            label: 'SCH.ID',
                            backgroundColor: '#C70039',
                            borderColor: '#C70039'
                        },
                        {
                            data: domain_time_series.map(o => o.domain_timeseries.buckets.orid.doc_count),
                            label: 'OR.ID',
                            backgroundColor: '#FF5733',
                            borderColor: '#FF5733'
                        },
                        {
                            data: domain_time_series.map(o => o.domain_timeseries.buckets.netid.doc_count),
                            label: 'NET.ID',
                            backgroundColor: '#D733FF',
                            borderColor: '#D733FF'
                        },
                        {
                            data: domain_time_series.map(o => o.domain_timeseries.buckets.webid.doc_count),
                            label: 'WEB.ID',
                            backgroundColor: '#FF33B8',
                            borderColor: '#FF33B8'
                        },
                        {
                            data: domain_time_series.map(o => o.domain_timeseries.buckets.coid.doc_count),
                            label: 'CO.ID',
                            backgroundColor: '#088DE4',
                            borderColor: '#088DE4'
                        }
                    ]
                    }
                });

                var barChart = $('#dashboard-line');
                barChart = new Chart(barChart, {
                    type: 'bar',
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            labels: {
                                fontColor: "#fff",
                                fontSize: 12
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "#fff",
                                    fontSize: 12,
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "#fff",
                                    fontSize: 12,
                                    stepSize: 1,
                                    beginAtZero: true
                                }
                            }]
                        }
                    },
                    data: {
                        labels: time_series.map(o => o.key_as_string),
                        datasets: [{
                            data: time_series.map(o => o.doc_count),
                            label: 'Data',
                            backgroundColor: 'rgba(93,173,224,0.8)',
                            borderColor: '#5dade0'
                        },
                    ]
                    }
                });
            });
    }

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    function getLastWeek() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return lastWeek;
    }

});