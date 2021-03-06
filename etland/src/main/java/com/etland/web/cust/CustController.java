package com.etland.web.cust;


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
import com.etland.web.cmm.Proxy;
import com.etland.web.cmm.Users;
import com.etland.web.emp.EmployeeMapper;

@RestController
public class CustController {
	private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	
	@Autowired Customer cust;
	@Autowired PrintService ps;
	@Autowired CustomerMapper custMap;
	@Autowired EmployeeMapper empMap;
	@Autowired Map<String,Object> map;
	@Autowired Users<?> user;
	@Autowired Proxy pxy;
	@PostMapping("/customers/{userid}")
	public Customer login(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("----------2.login진입------------");
		IFunction i = (Object o) ->  custMap.selectCustomer(param);
		return  (Customer) i.apply(param);
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/customers/page/{page}")
	public Map<?,?> list(
			@PathVariable String page
			) {
		logger.info("----------2.list진입------------");
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_Size", "5");
		ISupplier s = () -> custMap.countAllCustomer();
		map.put("total_count",s.get());
		pxy.carryOut(map);
		IFunction i = (Object o) -> custMap.selectCustomers(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls",ls);
		map.put("pxy",pxy);
		
		return  map;
		
	}
	
	@PostMapping("/customers")
	public Map<String,Object> join(
			@RequestBody Customer param) {
		logger.info("----------2.register진입------------");
		IConsumer c =  (Object o) -> custMap.insertCustomer(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		return map;
	}
	
	@PutMapping("/customers/{userid}")
	public Map<String,Object> update(
			@RequestBody Customer param) {
		logger.info("----------2.update진입------------");
		
		IConsumer c =  (Object o) -> custMap.updateCustomer(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
	@DeleteMapping("/customers/{userid}")
	public Map<String,Object> delete(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("----------2.delete진입------------");
		
		IConsumer c =  (Object o) -> custMap.deleteCustomer(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
}