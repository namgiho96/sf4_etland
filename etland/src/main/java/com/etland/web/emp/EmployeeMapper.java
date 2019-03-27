package com.etland.web.emp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
@Repository
public interface EmployeeMapper {
	public void insertEmployee(Employee emp);

	public List<Employee> selectAllEmployee(Map<?,?> map);

	public List<Employee> selectEmployees(Map<?,?> map);

	public Employee selectEmployee(Map<?,?> map);

	public int countEmplotees(Map<?,?> m);

	public boolean existsEmployee(Employee emp);

	public void updateEmployee(Employee emp);

	public void deleteEmployee(Employee emp);
}