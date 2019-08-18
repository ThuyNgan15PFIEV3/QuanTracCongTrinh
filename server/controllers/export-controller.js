const sql = require('mssql');
const conn = require('../config/db-config');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
//Angular parser for condition in report
var expressions = require('angular-expressions');
expressions.filters.lower = function(input) {
    // This condition should be used to make sure that if your input is undefined, your output will be undefined as well and will not throw an error
    if(!input) return input;
    return input.toLowerCase();
}
function angularParser(tag) {
    if (tag === '.') {
        return {
            get: function(s){ return s;}
        };
    }
    const expr = expressions.compile(tag.replace(/(’|“|”)/g, "'"));
    return {
        get: function(s) {
            return expr(s);
        }
    };
}

export default class ExportController {
    expDocx = async(req, res, next) => {
        var option = req.query.option;
        var numberDay;
        if (option == 1) {
            option = "Báo cáo tuần";
            var date = new Date();
            var day = date.getDay();
            if (day == 0) numberDay = 7;
            else numberDay = day;
        } else {
            option = "Báo cáo tháng";
            var date = new Date();
            numberDay = date.getDate();
        }
        var sensor = req.query.sensor;
        var dbSensors = {
            lunsau: "1_Lunsau",
            biendangkhecogian: "2_Biendangkhecogian",
            apluckerong: "3_Apluckerong",
            quantractham: "4_Quantractham",
            aplucmachdong: "5_Aplucmachdong",
            ungsuatcotthep: "6_Ungsuatcotthep"
        };
        var nameSensor ={
            lunsau: "Lún sâu",
            biendangkhecogian: "Biến dạng khe co giãn",
            apluckerong: "Áp lực kẽ rỗng",
            quantractham: "Quan trắc thấm",
            aplucmachdong: "Áp lực mạch động",
            ungsuatcotthep: "Ứng suất cốt thép"
        }
        try {
            let pool = await sql.connect(conn);
            let request = await pool.request();
            let sqlQuery = "SELECT TOP " + 12*numberDay + " * FROM [" + dbSensors[sensor] + "]";
            request.query(sqlQuery, function(err, data) {
                if (err) {
                    sql.close();
                    console.log(err.message);
                    res.sendStatus(500);
                } else {
                    data["option"] = option;
                    data["sensor"] = nameSensor[sensor];
                    sql.close();
                    var content = fs
                        .readFileSync(path.resolve('./templates/export-template.docx'), 'binary');
                    var zip = new PizZip(content);
                    var doc = new Docxtemplater();
                    doc.loadZip(zip).setOptions({parser:angularParser});
                    doc.setData(data);
                    try {
                        doc.render();
                        // render the document ie replace the variables
                    } catch (error) {
                        var e = {
                            message: error.message,
                            name: error.name,
                            stack: error.stack,
                            properties: error.properties,
                        }
                        console.log(JSON.stringify(e));
                        res.sendStatus(500);
                    }
                    var buf = doc.getZip()
                        .generate({ type: 'nodebuffer' });
                    fs.writeFileSync(path.resolve('./templates/Report.docx'), buf);
                    res.download('./templates/Report.docx');
                }
            })
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
}