const data = require('../data/data')

const resolvers = {
    companies:{
        employees(parent, args, context, info) {
            return data.employees[parent.name.replace(' ','')];
        }
    },
    Query: {
        getemployee(parent, args, context, info) {
            if (data.employees.hasOwnProperty(args.companyName.replace(' ',''))) {
                for( let em in data.employees[args.companyName.replace(' ','')]){
                    //console.log(data.employees[args.companyName.replace(' ','')][em]);
                    if(data.employees[args.companyName.replace(' ','')][em].name === args.name){
                        return data.employees[args.companyName.replace(' ','')][em];
                    }
                }
                throw 'employee doesnt exist'
            } else {
                throw 'company doesnt exist'
            }
        },
        allEmployeesForACompany(parent, args, context, info){
            if (data.employees.hasOwnProperty(args.companyName.replace(' ',''))) {
                console.log(data.employees[args.companyName.replace(' ','')]);
                return data.employees[args.companyName.replace(' ','')];
            } else {
                throw 'doesnt exist'
            }
        },
        getcompany(parent, args, context, info) {
            //console.log(args.name)
            if (data.companies.hasOwnProperty(args.name)) {
                console.log(data.companies[args.name]);
                return data.companies[args.name]
            } else {
                throw 'doesnt exist'
            }
        },
        allcompanies(){
            return data.companies;
        }
    },
    Mutation: {
        addcompany(parent, args, context, info){
            let name1 = args.name;
            let rname = name1.replace(' ','');
            data.companies[rname] = {
                id: 50,
                name: name1,
                numberOfEmployees: args.numberOfEmployees
            }
            return data.companies[rname]
        },
        updateEmployee(parent, args, context, info){
            return "unimplemented"
        }
    }
};

module.exports = resolvers;