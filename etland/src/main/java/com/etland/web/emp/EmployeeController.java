package com.etland.web.emp;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.etland.web.cmm.IConsumer;
import com.etland.web.cmm.IFunction;
import com.etland.web.cmm.ISupplier;
import com.etland.web.cmm.PrintService;
import com.etland.web.cmm.Users;
import com.etland.web.cust.CustController;

@RestController
public class EmployeeController {
private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	@Autowired Employee emp;
	@Autowired PrintService ps;
	@Autowired EmployeeMapper empMap;
	@Autowired Map<String,Object> map;
	@Autowired Users<?> user;
	
	@GetMapping("/employees")
	public Employee login() {
		logger.info("----------2.emp----login진입------------");
		ISupplier i =  ()->  empMap.findOneEmployee();
		return  (Employee) i.get();
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/employees/page/{page}")
	public List<Users<?>> list(
			@PathVariable String page,
			@RequestBody Map<?, ?> param) {
		logger.info("----------2.list진입------------");
		IFunction i = (Object o) -> empMap.selectEmployees(param);
		
				return (List<Users<?>>) i.apply(param);
		
	}
	
	@PostMapping("/employees")
	public Map<String,Object> join(
			@RequestBody Employee param) {
		logger.info("----------2.register진입------------");
		IConsumer c =  (Object o) -> empMap.insertEmployee(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		return map;
	}
	
	@PutMapping("/employees/{userid}")
	public Map<String,Object> update(
			@PathVariable String userid,
			@RequestBody Employee param) {
		logger.info("----------2.update진입------------");
		
		IConsumer c =  (Object o) -> empMap.updateEmployee(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
	
	@DeleteMapping("/employees/{userid}")
	public Map<String,Object> delete(
			@PathVariable String userid,
			@RequestBody Employee param) {
		logger.info("----------2.delete진입------------");
		
		IConsumer c =  (Object o) -> empMap.deleteEmployee(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
}
