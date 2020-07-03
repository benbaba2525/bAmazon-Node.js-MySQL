// SETUP
// =====================================================================================
const mysql = require("mysql");
const colors = require('colors');
const inquirer = require("inquirer");
const Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password:"ben12345",
    database:"bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("\n            **************************************************************\n".magenta);
    console.log("                          Welcome to Supervisor menu options ".bold);
    console.log("\n            **************************************************************\n\n".magenta);

 // run the displayMenu function after the connection is made to display menu for manager to choose
 displayMenu();


});

// GLOBAL VARIABLES
// =====================================================================================
var deptToDelete = [];

// FUNCTIONS
// =====================================================================================
var resetData = function() {
    deptToDelete = [];
};

var displayMenu = function() {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Choose on a menu options :',
        choices: [
            'View Departments',
            'View Products Sales by Department',
            'Create New Department',
            'Delete A Department'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Products Sales by Department':
                viewDepartmentSales();
                break;
            case 'Create New Department':
                createDepartment();
                break;
            case 'Delete A Department':
                deleteDepartment();
                break;
        }
    });
};


var viewDepartments = function() {
    connection.query('SELECT * FROM departments', (err, res) => {
        var listTable = new Table({
            head: ['Department ID'.magenta, 'Department Name'.magenta, 'Overhead'.magenta],
            colWidths: [15, 25, 15]
        });

        for (var i = 0; i < res.length; i++) {
            listTable.push([res[i].department_id, res[i].department_name, `$${res[i].over_head_costs}`])
           
        }

        console.log(`\n\n${listTable.toString()}\n\n`);
        displayMenu();
    });
};


function viewDepartmentSales() {

    connection.query(`SELECT department_id, departments.department_name, over_head_costs, SUM(price) AS productSale,(SUM(price)-over_head_costs) AS profit
    FROM products JOIN departments
    ON products.department_name = departments.department_name
    GROUP BY department_id;`, function(err, res) {
        if (err) throw err;

            var listTable = new Table({
                head: ['Department ID'.magenta, 'Department Name'.magenta, 'Overhead'.magenta,'Product Sales'.magenta, 'Total Profit'.magenta],
                colWidths: [15, 25, 15,15,15]
            });
    
            for (var i = 0; i < res.length; i++) {
       
                listTable.push([res[i].department_id, res[i].department_name, `$${res[i].over_head_costs}`,res[i].productSale,res[i].profit])

            }
    
            console.log(`\n\n${listTable.toString()}\n\n`);
            displayMenu();
        });
};


      
       
       
       
       
var createDepartment = function() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter the department name:'
        },
        {
            name: 'overhead',
            type: 'input',
            message: 'Enter the overhead costs for this department:',
            validate: (value) => {
                if (!isNaN(value) && value > 0) {
                    return true;
                } else {
                    console.log(chalk.red(' => Oops, please enter a number greater than 0'));
                    return false;
                }
            }
        },
    ]).then((answers) => {
        connection.query('INSERT INTO departments SET ?', {
            department_name: answers.name,
            over_head_costs: answers.overhead
        }, (err, res) => {
            if (err) throw err;
            console.log(chalk.blue.bold('\n\tDepartment successfully added!\n'));
            connection.end();
        });
    });
};

var deleteDepartment = function() {
    inquirer.prompt({
        name: 'deptID',
        type: 'input',
        message: 'Enter the ID of the department you\'d like to remove:'
    }).then((answer) => {
        connection.query('SELECT * FROM departments WHERE ?', { department_id: answer.deptID }, (err, res) => {
            inquirer.prompt({
                name: 'confirm',
                type: 'confirm',
                message: `You would like to delete` + chalk.blue.bold(` '${res[0].department_name}'. `) + `Is this correct?`
            }).then((answer) => {
                if (answer.confirm) {
                    deptToDelete.push(res);
                    connection.query('DELETE FROM departments WHERE ?', { department_id: deptToDelete[0][0].department_id }, (err, res) => {
                        if (err) throw err;
                        console.log(chalk.blue.bold('\n\tDepartment successfully deleted!\n'));
                        connection.end();
                    });
                } else {
                    deleteDepartment();
                }
            });
        });
    });
};