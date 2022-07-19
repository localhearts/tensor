$(document).ready(function () {
  $("#btn-close").click(function () {
    $("#lds-facebook").hide();
  });
  $(".modal-app-risk").click(function () {
    var href = $(this).data("bs-target");
    var id = $(this).data("id");
    var gte = "2022-07-15";
    var lte = "2022-07-15";
    $("#datatable").DataTable().clear().destroy();
    ModalTables(gte, lte, id);
  });

  $("#topsensor").click(function () {
    var id = $("#topsensor .modal-app-risk").data("id");
    var gte = "2022-07-15";
    var lte = "2022-07-15";
    console.log(id);
    $("#datatable").DataTable().clear().destroy();
    ModalService(gte, lte, id);
  });

  $("#topdirection").click(function () {
    var id = $("#topdirection .modal-app-risk").data("id");
    var gte = "2022-07-15";
    var lte = "2022-07-15";
    console.log(id);
    $("#datatable").DataTable().clear().destroy();
    ModalDirection(gte, lte, id);
  });

  $("#dstcountrycloud").click(function () {
    var id = $("#dstcountrycloud .modal-app-risk").data("id");
    var gte = "2022-07-15";
    var lte = "2022-07-15";
    console.log(id);
    $("#datatable").DataTable().clear().destroy();
    DstCountry(gte, lte, id);
  });

  $("#srccountrycloud").click(function () {
    var id = $("#srccountrycloud .modal-app-risk").data("id");
    var gte = "2022-07-15";
    var lte = "2022-07-15";
    console.log(id);
    $("#datatable").DataTable().clear().destroy();
    SrcCountry(gte, lte, id);
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
  ("use strict");
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var Maindate = new Date();
  var Mainyear = Maindate.getFullYear();
  var Mainmonth = String(Maindate.getMonth() + 1).padStart(2, "0");
  var Mainday = String(Maindate.getDate()).padStart(2, "0");
  var MainFulldate = Mainyear + "-" + Mainmonth + "-" + Mainday;
  var month = monthNames[Maindate.getMonth()];
  var lastWeek = getLastWeek();
  var lastWeekMonth = String(lastWeek.getMonth() + 1).padStart(2, "0");
  var lastWeekDay = String(lastWeek.getDate()).padStart(2, "0");
  var lastWeekYear = lastWeek.getFullYear();
  var lastYearDisplay = Mainyear + "-01-01";
  var lastMonthDisplay = Mainyear + "-" + Mainmonth + "-" + "01";
  var lastWeekDisplay = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;

  var gte = getParameterByName("gte");
  var lte = getParameterByName("lte");
  var keyword = getParameterByName("keyword");
  var notifier = getParameterByName("notifier");
  var dt = getParameterByName("dt");
  Search("2022-07-15", "2022-07-15", "*").then();

  async function ModalService(gte, lte, id) {
    $("#lds-facebook").show();
    var search_data = Array();
    var params = { gte: gte, lte: lte, keyword: id };
    $.post("../api/sensor/service/search/", params)
      .then((response) => {
        search_data = response.data;
      })
      .done(function () {
        $("#lds-facebook").hide();
        $("#datatable").DataTable({
          data: search_data,
          destroy: true,
          columns: [
            {
              data: "_source.date",
              render: function (data, type, row, meta) {
                let get_Date = moment.tz(data, "UTC");
                return get_Date.local().format("DD/MM/YYYY");
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.apprisk ? data.apprisk : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srccountry ? data.srccountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.dstcountry ? data.dstcountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.msg ? data.msg : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.httpmethod ? data.httpmethod : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.path ? data.path : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.hostname ? data.hostname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srcip ? data.srcip : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.devname ? data.devname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.level ? data.level : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.direction ? data.direction : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.service ? data.service : "-";
              },
            },
          ],
        });
      })
      .fail(function () {
        toastr.error("Request Timeout", "Notification", {
          positionClass: "toast-top-right",
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "1000",
          extendedTimeOut: "1000",
        });
      });
  }

  async function ModalDirection(gte, lte, id) {
    $("#lds-facebook").show();
    var search_data = Array();
    var params = { gte: gte, lte: lte, keyword: id };
    $.post("../api/sensor/direction/search/", params)
      .then((response) => {
        search_data = response.data;
      })
      .done(function () {
        $("#lds-facebook").hide();
        $("#datatable").DataTable({
          data: search_data,
          destroy: true,
          columns: [
            {
              data: "_source.date",
              render: function (data, type, row, meta) {
                let get_Date = moment.tz(data, "UTC");
                return get_Date.local().format("DD/MM/YYYY");
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.apprisk ? data.apprisk : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srccountry ? data.srccountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.dstcountry ? data.dstcountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.msg ? data.msg : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.httpmethod ? data.httpmethod : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.path ? data.path : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.hostname ? data.hostname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srcip ? data.srcip : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.devname ? data.devname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.level ? data.level : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.direction ? data.direction : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.service ? data.service : "-";
              },
            },
          ],
        });
      })
      .fail(function () {
        toastr.error("Request Timeout", "Notification", {
          positionClass: "toast-top-right",
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "1000",
          extendedTimeOut: "1000",
        });
      });
  }

  async function ModalTables(gte, lte, id) {
    $("#lds-facebook").show();
    var search_data = Array();
    var params = { gte: gte, lte: lte, keyword: id };
    $.post("../api/sensor/tables/search/", params)
      .then((response) => {
        search_data = response.data;
      })
      .done(function () {
        $("#lds-facebook").hide();
        $("#datatable").DataTable({
          data: search_data,
          destroy: true,
          columns: [
            {
              data: "_source.date",
              render: function (data, type, row, meta) {
                let get_Date = moment.tz(data, "UTC");
                return get_Date.local().format("DD/MM/YYYY");
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.apprisk ? data.apprisk : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srccountry ? data.srccountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.dstcountry ? data.dstcountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.msg ? data.msg : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.httpmethod ? data.httpmethod : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.path ? data.path : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.hostname ? data.hostname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srcip ? data.srcip : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.devname ? data.devname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.level ? data.level : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.direction ? data.direction : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.service ? data.service : "-";
              },
            },
          ],
        });
      })
      .fail(function () {
        toastr.error("Request Timeout", "Notification", {
          positionClass: "toast-top-right",
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "1000",
          extendedTimeOut: "1000",
        });
      });
  }

  async function DstCountry(gte, lte, id) {
    $("#lds-facebook").show();
    var search_data = Array();
    var params = { gte: gte, lte: lte, keyword: id };
    $.post("../api/sensor/dst-country/search/", params)
      .then((response) => {
        search_data = response.data;
      })
      .done(function () {
        $("#lds-facebook").hide();
        $("#datatable").DataTable({
          data: search_data,
          destroy: true,
          columns: [
            {
              data: "_source.date",
              render: function (data, type, row, meta) {
                let get_Date = moment.tz(data, "UTC");
                return get_Date.local().format("DD/MM/YYYY");
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.apprisk ? data.apprisk : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srccountry ? data.srccountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.dstcountry ? data.dstcountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.msg ? data.msg : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.httpmethod ? data.httpmethod : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.path ? data.path : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.hostname ? data.hostname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srcip ? data.srcip : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.devname ? data.devname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.level ? data.level : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.direction ? data.direction : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.service ? data.service : "-";
              },
            },
          ],
        });
      })
      .fail(function () {
        toastr.error("Request Timeout", "Notification", {
          positionClass: "toast-top-right",
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "1000",
          extendedTimeOut: "1000",
        });
      });
  }

  async function SrcCountry(gte, lte, id) {
    $("#lds-facebook").show();
    var search_data = Array();
    var params = { gte: gte, lte: lte, keyword: id };
    $.post("../api/sensor/src-country/search/", params)
      .then((response) => {
        search_data = response.data;
      })
      .done(function () {
        $("#lds-facebook").hide();
        $("#datatable").DataTable({
          data: search_data,
          destroy: true,
          columns: [
            {
              data: "_source.date",
              render: function (data, type, row, meta) {
                let get_Date = moment.tz(data, "UTC");
                return get_Date.local().format("DD/MM/YYYY");
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.apprisk ? data.apprisk : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srccountry ? data.srccountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.dstcountry ? data.dstcountry : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.msg ? data.msg : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.httpmethod ? data.httpmethod : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.path ? data.path : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.hostname ? data.hostname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.srcip ? data.srcip : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.devname ? data.devname : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.level ? data.level : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.direction ? data.direction : "-";
              },
            },
            {
              data: "_source",
              render: function (data, type, row, meta) {
                return data.service ? data.service : "-";
              },
            },
          ],
        });
      })
      .fail(function () {
        toastr.error("Request Timeout", "Notification", {
          positionClass: "toast-top-right",
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "1000",
          extendedTimeOut: "1000",
        });
      });
  }

  async function Search(parseAwal, parseAkhir, keyword) {
    $("div.count-total").html(
      '<div class="lds-facebook count-total"><div></div><div></div><div></div></div>'
    );
    $("div.count-elevated").html(
      '<div class="lds-facebook count-elevated"><div></div><div></div><div></div></div>'
    );
    $("div.count-medium").html(
      '<div class="lds-facebook count-medium"><div></div><div></div><div></div></div>'
    );
    $("div.count-critical").html(
      '<div class="lds-facebook count-critical"><div></div><div></div><div></div></div>'
    );
    $("div.count-high").html(
      '<div class="lds-facebook count-high"><div></div><div></div><div></div></div>'
    );
    $("div.count-low").html(
      '<div class="lds-facebook count-low"><div></div><div></div><div></div></div>'
    );
    $.get(
      "../api/sensor/doc/" + parseAwal + "/" + parseAkhir + "/" + keyword
    ).then((response) => {
      var aggregation = response.aggregation;
      $("div.count-total").html(formatNumber(aggregation.total_data.value));
      $("div.count-medium").html(
        formatNumber(aggregation.impact.buckets.medium.doc_count)
      );
      $("div.count-elevated").html(
        formatNumber(aggregation.impact.buckets.elevated.doc_count)
      );
      $("div.count-critical").html(
        formatNumber(aggregation.impact.buckets.critical.doc_count)
      );
      $("div.count-high").html(
        formatNumber(aggregation.impact.buckets.high.doc_count)
      );
      $("div.count-low").html(
        formatNumber(aggregation.impact.buckets.low.doc_count)
      );
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
      pieSeries.slices.template.tooltipHTML =
        '<a class="text-white modal-app-risk" data-bs-toggle="modal" data-bs-target="#datalist" data-id="{category}">{category}</a>';

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
      pieSeries.slices.template.tooltipHTML =
        '<a class="text-white modal-app-risk" data-bs-toggle="modal" data-bs-target="#datalist" data-id="{category}">{category}</a>';

      $("#srccountrycloud").ready(function () {
        var srccountry = aggregation.country_tag_src.buckets;
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create(
          "srccountrycloud",
          am4plugins_wordCloud.WordCloud
        );
        chart.fontFamily = "Courier New";
        var series = chart.series.push(
          new am4plugins_wordCloud.WordCloudSeries()
        );

        series.randomness = 0.1;
        series.rotationThreshold = 0.5;
        series.minWordLength = 2;
        series.data = srccountry;
        series.dataFields.word = "key";
        series.dataFields.value = "doc_count";
        series.heatRules.push({
          target: series.labels.template,
          property: "fill",
          min: am4core.color("#FF5733"),
          max: am4core.color("#FFC300"),
          dataField: "value",
        });

        series.tooltip.label.interactionsEnabled = true;
        series.tooltip.keepTargetHover = true;
        //series.labels.template.urlTarget = "_blank";
        series.labels.template.tooltipHTML =
          '<a class="text-white modal-app-risk" data-bs-toggle="modal" data-bs-target="#datalist" data-id="{word}">{word}</a>';
      });
      $("#dstcountrycloud").ready(function () {
        var dstcountry = aggregation.country_tag_dst.buckets;
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create(
          "dstcountrycloud",
          am4plugins_wordCloud.WordCloud
        );
        chart.fontFamily = "Courier New";
        var series = chart.series.push(
          new am4plugins_wordCloud.WordCloudSeries()
        );

        series.randomness = 0.1;
        series.rotationThreshold = 0.5;
        series.minWordLength = 2;
        series.data = dstcountry;
        series.dataFields.word = "key";
        series.dataFields.value = "doc_count";
        series.heatRules.push({
          target: series.labels.template,
          property: "fill",
          min: am4core.color("#FF5733"),
          max: am4core.color("#FFC300"),
          dataField: "value",
        });
        series.tooltip.label.interactionsEnabled = true;
        series.tooltip.keepTargetHover = true;
        //series.labels.template.urlTarget = "_blank";
        series.labels.template.tooltipHTML =
          '<a class="text-white modal-app-risk" data-bs-toggle="modal" data-bs-target="#datalist" data-id="{word}">{word}</a>';
      });
    });
  }

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return lastWeek;
  }
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
});
