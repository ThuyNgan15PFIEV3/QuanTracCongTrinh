const bcrypt = require('bcryptjs');
import { JWTHelper } from '../helpers';

const sql = require('mssql');
const conn = require('../config/db-config');
export default class UserController {
    login = async(req, res, next) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            if (email === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "Email is required filled"
                });
            }
            if (password === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "Password is required filled"
                });
            }
            let pool = await sql.connect(conn);
            let request = await pool.request();
            let sqlQuery = "SELECT * FROM [Users] WHERE email='" + email + "'";
            request.query(sqlQuery, async function(err, result) {
                if (err) {
                    sql.close();
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else if (result.recordset.length == 0) {
                    sql.close();
                    return res.json({
                        success: false,
                        error: "Email is wrong"
                    });
                } else {
                    console.log(result);
                    const data = result.recordset[0];
                    console.log(data.password);
                    const isValidPassword = await bcrypt.compareSync(password, data.password);
                    if (!isValidPassword) {
                        sql.close();
                        return res.json({
                            success: false,
                            error: "Password is wrong"
                        });
                    }
                    const token = await JWTHelper.sign({
                        id: data.ID,
                        hoTen: data.hoTen,
                        email: data.email
                    });
                    console.log(token);
                    return res.status(200).json({
                        success: true,
                        data: token
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }
    };
    createNewUser = async(req, res, next) => {
        try {
            let ID = req.body.ID;
            let email = req.body.email;
            let password = req.body.password;
            let name = req.body.name;
            let address = req.body.address;
            let phone = req.body.phone;
            let role = req.body.role;
            let hashedPass = bcrypt.hashSync(password, 10);
            if (email === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "email is required filed"
                })
            };
            if (password === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "password is required filed"
                })
            };
            if (role === undefined) {
                role = "normal"
            };
            sql.close();
            let pool = await sql.connect(conn);
            let sqlQuery1 = "SELECT * FROM [Users] WHERE email='" + email + "'";
            let result1 = await pool.request().query(sqlQuery1);
            if (result1.recordset.length !== 0) {
                console.log("email is existed");
                return res.status(400).json({
                    success: false,
                    error: "Email is existed!"
                });
            } else {
                sql.close();
                let sqlQuery = "INSERT INTO [Users] (ID, email, password, name, address, phone, role) VALUES (@ID, @email, @password, @name, @address, @phone, @role)";
                let pool = await sql.connect(conn);
                let request = await pool.request();
                request.input('ID', sql.Int, ID);
                request.input('email', sql.NVarChar, email);
                request.input('password', sql.NVarChar, hashedPass);
                request.input('name', sql.NVarChar, name);
                request.input('address', sql.NVarChar, address);
                request.input('phone', sql.NChar, phone);
                request.input('role', sql.NChar, role);
                request.query(sqlQuery, function(err, result) {
                    if (err) {
                        sql.close();
                        console.log("Error while querying database :- " + err);
                        res.send(err);
                    } else {
                        sql.close();
                        return res.status(200).json({
                            success: true,
                            data: result
                        });
                    }
                });
            }
        } catch (e) {
            sql.close();
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }
    };

};