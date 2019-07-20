const sql = require('mssql');
const conn = require('../config/db-config');

const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

export default class ExportController {
    expDocx = async(req, res, next) => {
        var option = req.query.select;
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
        try {
            let pool = await sql.connect(conn);
            let request = await pool.request();
            let sqlQuery = "SELECT TOP " + numberDay + " * FROM [GD2_NHIETDO] ORDER BY ID DESC";
            request.query(sqlQuery, function(err, data) {
                if (err) {
                    sql.close();
                    console.log(err.message);
                    res.sendStatus(500);
                } else {
                    data["option"] = option;
                    sql.close();
                    var content = fs
                        .readFileSync(path.resolve('', './templates/export-template.docx'), 'binary');
                    var zip = new JSZip(content);
                    var doc = new Docxtemplater();
                    doc.loadZip(zip);
                    doc.setData(data);
                    try {
                        // render the document ie replace the variables
                        doc.render()
                    } catch (error) {
                        console.log(error.message);
                        res.sendStatus(500);
                    }
                    var buf = doc.getZip()
                        .generate({ type: 'nodebuffer' });
                    fs.writeFileSync(path.resolve('', './templates/Report.docx'), buf);
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