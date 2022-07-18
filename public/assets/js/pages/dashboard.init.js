$(document).ready(function () {
    $('.modal-app-risk').click(function() {
        $('#datatable').DataTable({destroy: true}).destroy();
         var href = $(this).data('bs-target');
         var id = $(this).data('id');
         var gte = "2022-07-15";
         var lte = "2022-07-15";
         ModalTables(gte, lte, id);
         console.log(href);
     

     });
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
    Search('2022-07-15','2022-07-15','*').then();
    
    
    async function ModalTables(gte, lte, id) {
        var search_data = Array();
        var params = { 'gte': gte, 'lte': lte, 'keyword': id }
        $.post('../api/sensor/search/', params)
           .then((response) => {
               search_data = response.data;
              
            $('#datatable').DataTable({
                   data: search_data,
                   destroy: true,
                   columns: [
                       {
                           data: '_source.date',
                           render: function (data, type, row, meta) {
                               let get_Date = moment.tz(data, 'UTC');
                               return get_Date.local().format('DD/MM/YYYY');
                           }
                       },
                       {
                        data:'_source.apprisk',
                       }
                   ],

               });
            


            
           });
    }
    async function Search(parseAwal, parseAkhir, keyword) {
        $('div.count-total').html('<div class="lds-facebook count-total"><div></div><div></div><div></div></div>');
        $('div.count-elevated').html('<div class="lds-facebook count-elevated"><div></div><div></div><div></div></div>');
        $('div.count-medium').html('<div class="lds-facebook count-medium"><div></div><div></div><div></div></div>');
        $('div.count-critical').html('<div class="lds-facebook count-critical"><div></div><div></div><div></div></div>');
        $('div.count-high').html('<div class="lds-facebook count-high"><div></div><div></div><div></div></div>');
        $('div.count-low').html('<div class="lds-facebook count-low"><div></div><div></div><div></div></div>');
        $.get('../api/sensor/doc/' + parseAwal + '/' + parseAkhir + '/' + keyword )
        .then((response) => {
            var aggregation = response.aggregation;
            $('div.count-total').html(formatNumber(aggregation.total_data.value));
            $('div.count-medium').html(formatNumber(aggregation.impact.buckets.medium.doc_count));
            $('div.count-elevated').html(formatNumber(aggregation.impact.buckets.elevated.doc_count));
            $('div.count-critical').html(formatNumber(aggregation.impact.buckets.critical.doc_count));
            $('div.count-high').html(formatNumber(aggregation.impact.buckets.high.doc_count));
            $('div.count-low').html(formatNumber(aggregation.impact.buckets.low.doc_count));
                        // 3D PIE TOP DIRECTION
            
                        var top_sensor_service = aggregation.top_sensor_service.buckets;
                        am4core.useTheme(am4themes_animated);
                        // Themes end
                        
                        // Create chart instance
                        var chart = am4core.create("topsensor", am4charts.PieChart3D);
                        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
                        
                        chart.legend = new am4charts.Legend();
                        chart.legend.position = "right";
                        chart.legend.labels.template.fill = am4core.color("#FFF");
                        chart.legend.valueLabels.template.fill = am4core.color("#FFF");
                        
                        
                        // Add data
                        chart.data = top_sensor_service;
                        
                        // Add and configure Series
                        var pieSeries = chart.series.push(new am4charts.PieSeries3D());
                        pieSeries.dataFields.value = "doc_count";
                        pieSeries.dataFields.category = "key";
                        pieSeries.labels.template.disabled = true;
                        pieSeries.ticks.template.disabled = true;
                        
                        // Disable tooltips
                        pieSeries.tooltip.label.interactionsEnabled = true;
                        pieSeries.tooltip.keepTargetHover = true;
                        pieSeries.slices.template.tooltipHTML = '<a class="text-white" data-bs-toggle="modal" data-bs-target="#datalist"><b>{category}</b></a>';

            // 3D PIE TOP DIRECTION
            
            var top_notifier = aggregation.top_direction.buckets;
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create("topdirection", am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            
            chart.legend = new am4charts.Legend();
            chart.legend.position = "top";
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
            pieSeries.slices.template.tooltipHTML = '<a class="text-white" data-bs-toggle="modal" data-bs-target="#datalist"><b>{category}</b></a>';
            
        })
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
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
});