const sql = require('mssql');
const conn = require('../config/db-config');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

export default class ExportController {
    expDocx = async(req, res, next) => {
        sql.connect(conn, function() {
            try {
                let sqlQuery = "SELECT TOP 100 * FROM [GD2_NHIETDO] ORDER BY ID DESC";
                let req = new sql.Request();
                req.query(sqlQuery, function(err, data) {
                    if (err) {
                        sql.close();
                        console.log(err.message);
                        res.sendStatus(500);
                    } else {
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
                        fs.writeFileSync(path.resolve('', './templates/WeeklyReport.docx'), buf);
                        res.download('./templates/WeeklyReport.docx');
                    }
                })
            } catch (e) {
                sql.close();
                console.log(e.message);
                res.sendStatus(500);
            }

        })
    };
}