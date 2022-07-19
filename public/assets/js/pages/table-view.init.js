$(document).ready(function () {
  var id = $(this).data("id");
  var gte = "2022-07-15";
  var lte = "2022-07-15";
  $("#table-view").DataTable().clear().destroy();
  TableView(gte, lte, id);
});

async function TableView(gte, lte, id) {
  $("#lds-facebook").show();
  var search_data = Array();
  var params = { gte: gte, lte: lte, keyword: id };
  $.post("../api/sensor/table-view/search/", params)
    .then((response) => {
      search_data = response.data;
    })
    .done(function () {
      $("#lds-facebook").hide();
      $("#table-view").DataTable({
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
