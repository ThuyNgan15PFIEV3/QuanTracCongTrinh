var isFirst = true;
var result_TatCa = {
    labels: [],
    datasets: []
}
var result_TuyChon = {
    labels1: [],
    datasets1: []
}


function getDifferColor(j) {
    var result = 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',0.5)';
    return result;
}

function modifyData_TatCa(data) {
    if (isFirst) {
        isFirst = false;
        for (var j = 1; j < 28; j++) {
            result_TatCa.datasets.push({
                label: 'Lunsau' + j,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderColor: getDifferColor(j),
                data: []
            })
        }
    } else {
        result_TatCa.labels = [];
        for (var j = 1; j < 28; j++) {
            result_TatCa.datasets[j - 1].data = [];
        }
    }
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        result_TatCa.labels.push(data[i].Timestamp);
        for (var j = 1; j < 28; j++) {
            result_TatCa.datasets[j - 1].data.push(data[i]['Lunsau' + j]);
        }
    }
    return result_TatCa;
}

function modifyData_TuyChon(data) {
    if (isFirst) {
        isFirst = false;
        for (var j = 1; j < 28; j++) {
            result_TatCa.datasets.push({
                label: 'Lunsau' + j,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderColor: getDifferColor(j),
                data: []
            })
        }
    } else {
        result_TatCa.labels = [];
        for (var j = 1; j < 28; j++) {
            result_TatCa.datasets[j - 1].data = [];
        }
    }
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        result_TatCa.labels.push(data[i].Timestamp);
        for (var j = 1; j < 28; j++) {
            result_TatCa.datasets[j - 1].data.push(data[i]['Lunsau' + j]);
        }
    }
    return result_TatCa;
}

$(document).ready(function() {
    $(document).on('change', '#section', function() {
        $.get("http://localhost:3000/api/selectType_lunSau", function(data) {
            console.log(data.data);
            var section = $('#section').val();
            console.log(section);
            var options = '<option value="0">Tất cả</option>';
            $(data.data).each(function(index, value) {
                if (value.Section == section) {
                    options += '<option value="' + value.Serial_Number + '">' + value.Serial_Number + '</option>';
                }
            });
            $('#serialNum').html(options);
        });
    });
    $("#submitSelect").on('click', function() {
        let serialNum = $('#serialNum').val();
        let section = $("#section").val();
        let startDay = $("#startDay").val();
        let endDay = $("#endDay").val();
        console.log(serialNum);
        if (serialNum == '0') {
            $.ajax({
                url: "http://localhost:3000/api/option_lunSau_tuyen",
                type: "POST",
                data: {
                    section: section,
                    startDay: startDay,
                    endDay: endDay
                },
                success: function(data) {
                    console.log($("#section").val());
                    console.log($("#startDay").val());
                    console.log($("#endDay").val());
                    console.log(data);
                    if (!data.data.recordset) return;
                    try {
                        data.data.recordset = JSONd.parse(data.data.recordset);
                    } catch (e) {}
                    var newData = modifyData_TuyChon(data.data.recordset)
                    console.log(newData);
                    var ctx = $("#chartContainer_LunSau");
                    var chart = new Chart(ctx, {
                        animation: false,
                        type: 'line',
                        data: newData,
                        options: {
                            animation: {
                                duration: 0
                            }
                        }
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        } else if (section == '0' && serialNum == '0' && startDay == undefined && endDay == undefined) {
            $.ajax({
                url: "http://localhost:3000/api/lunSau_tatCa",
                type: "GET",
                success: function(data) {
                    console.log(data);
                    if (!data.data.recordset) return;
                    try {
                        data.data.recordset = JSON.parse(data.data.recordset);
                    } catch (e) {}
                    var newData = modifyData_TatCa(data.data.recordset)
                    console.log(newData);
                    var ctx = $("#chartContainer_LunSau");
                    var chart = new Chart(ctx, {
                        animation: false,
                        type: 'line',
                        data: newData,
                        options: {
                            animation: {
                                duration: 0
                            }
                        }
                    });
                },
                error: function(data) {
                    console.log(data);
                }
            });
        } else {
            $.ajax({
                url: "http://localhost:3000/api/option_lunSau",
                type: "POST",
                data: {
                    section: $("#section").val(),
                    serialNum: $("#serialNum").val(),
                    startDay: $("#startDay").val(),
                    endDay: $("#endDay").val()
                },
                success: function(data) {
                    console.log($("#sensor").val());
                    console.log($("#section").val());
                    console.log($("#startDay").val());
                    console.log($("#endDay").val());
                    console.log(data);
                    if (!data.data.recordset) return;
                    try {
                        data.data.recordset = JSONd.parse(data.data.recordset);
                    } catch (e) {}
                    var newData = modifyData_TuyChon(data.data.recordset)
                    console.log(newData);
                    var ctx = $("#chartContainer_LunSau");
                    var chart = new Chart(ctx, {
                        animation: false,
                        type: 'line',
                        data: newData,
                        options: {
                            animation: {
                                duration: 0
                            }
                        }
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });
});
(function() {
    $.ajax({
        url: "http://localhost:3000/api/lunSau_tatCa",
        type: "GET",
        success: function(data) {
            console.log(data);
            if (!data.data.recordset) return;
            try {
                data.data.recordset = JSON.parse(data.data.recordset);
            } catch (e) {}
            var newData = modifyData_TatCa(data.data.recordset)
            console.log(newData);
            var ctx = $("#chartContainer_LunSau");
            var chart = new Chart(ctx, {
                animation: false,
                type: 'line',
                data: newData,
                options: {
                    animation: {
                        duration: 0
                    }
                }
            });
        },
        error: function(data) {
            console.log(data);
        }
    });

})();