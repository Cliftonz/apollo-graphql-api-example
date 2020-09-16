let data = require('../../data/data');

module.exports = {
    root: (req, res) => {
        let names = [];
        for (let key in data.companies) {
            names.push(key);
        }
        res.json(names);
    },
    name: (req, res) => {
        let name = req.params.companyName;
        if (data.companies.hasOwnProperty(name)) {
            res.json(data.companies[name]);
            return
        }
        res.status(404);
        res.send('not found');
    },
    employees: (req, res) => {
        let name = req.params.companyName;
        if (data.companies.hasOwnProperty(name)) {
            res.json(data.employees[name]);
            return
        }
        res.status(404);
        res.send('not found');
    },
    singleEmployee: (req, res) => {
        let companyName = req.params.companyName;
        let employeeName = req.params.employeeName;

        if (!data.employees.hasOwnProperty(companyName)) {
            res.status(404);
            res.json('company not found');
            return;
        }

        for (let e of data.employees[companyName]) {
            if (e.name === employeeName) {
                res.json(e);
                return
            }
        }

        res.status(404);
        res.json('employee not found');
    },
    createEmployee: (req, res) => {
        let companyName = req.params.companyName;
        let employeeName = req.params.employeeName;
        let body = req.body;

        if (body['name'] !== employeeName) {
            res.status(400);
            res.json({error: "name does not match request employee name"});
            return;
        }

        if (!body['job']) {
            res.status(400);
            res.json({error: "employee job not specified"});
            return;
        }

        if (!data.employees.hasOwnProperty(companyName)) {
            res.status(404);
            res.json('company not found');
            return;
        }

        data.employees[companyName] = data.employees[companyName].filter(value => { return value.name !== employeeName; });

        data.employees[companyName].push(body);
        res.sendStatus(204);
    },
    removeEmployee: (req, res) => {
        let companyName = req.params.companyName;
        let employeeName = req.params.employeeName;

        // let a = [1, 2, 3];
        // a.filter((value => { return value === 1; }))

        if (!data.employees.hasOwnProperty(companyName)) {
            res.status(404);
            res.json('company not found');
            return;
        }

        data.employees[companyName] = data.employees[companyName].filter(value => { return value.name !== employeeName; });

        res.sendStatus(204);
    },
}