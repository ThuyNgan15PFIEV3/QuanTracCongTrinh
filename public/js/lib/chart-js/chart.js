var isFirst = true;
var result = {
    labels: [],
    datasets: []
}

function getDifferColor(j) {
    var result = 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',0.5)';
    return result;
}

function modifyData(data) {
    if (isFirst) {
        isFirst = false;
        for (var j = 1; j < 9; j++) {
            result.datasets.push({
                label: 'Temp_' + j,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderColor: getDifferColor(j),
                data: []
            })
        }
    } else {
        result.labels = [];
        for (var j = 1; j < 9; j++) {
            result.datasets[j - 1].data = [];
        }
    }
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        result.labels.push(data[i].Time.substring(11, 19));
        for (var j = 1; j < 9; j++) {
            result.datasets[j - 1].data.push(data[i]['Temp_' + j]);
        }
    }
    return result;
}
(function() {
    setInterval(function() {
        $.ajax({
            url: "http://localhost:3000/getData",
            type: "GET",
            success: function(data) {
                console.log(data);
                if (!data.data.recordset) return;
                try {
                    data.data.recordset = JSON.parse(data.data.recordset);
                } catch (e) {}
                var newData = modifyData(data.data.recordset)
                console.log(newData);
                var ctx = $("#chartContainer");
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
    }, 1000);
})();
