1Select d.name as department , e1.name as employee, e1.salary as Salary
2From Employee e1 join Department d on e1.DepartmentId = d.Id
3Where  3 > (select count(distinct (e2.Salary))
4            from  Employee e2
5            where e2.Salary > e1.Salary
6            and e1.DepartmentId = e2.DepartmentId)