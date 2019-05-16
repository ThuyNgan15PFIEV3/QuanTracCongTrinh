function getDataChart() {
    $.ajax({
        url: "http://localhost:3000/getData",
        type: "GET",
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log(data);
        }
    });
})