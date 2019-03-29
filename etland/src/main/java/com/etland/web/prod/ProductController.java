package com.etland.web.prod;

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
import com.etland.web.cmm.PrintService;
import com.etland.web.cmm.Users;
import com.etland.web.cust.CustController;

@RestController
public class ProductController {
	
private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	
	@Autowired Product prod;
	@Autowired PrintService ps;
	@Autowired ProductMapper prodMap;
	@Autowired Map<String,Object> map;
	@Autowired Users<?> user;
	
	@PostMapping("/phones/{userid}")
	public Product login(
			@PathVariable String userid,
			@RequestBody Product param) {
		logger.info("----------2.login진입------------");
		IFunction i = (Object o) -> prodMap.selectproduct(param);
		return  (Product) i.apply(param);
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/phones/page/{page}")
	public List<Product> list(
			@PathVariable String page,
			@RequestBody Map<?, ?> param) {
		
		logger.info("----------2.list진입------------");
		IFunction i = (Object o) -> prodMap.selectproducts(param);
		List<Product> ls = (List<Product>) i.apply(param);
		ps.accept(ls);
		return ls;
		
	}
	
	@PostMapping("/phones")
	public Map<String,Object> join(
			@RequestBody Product param) {
		logger.info("----------2.register진입------------");
		IConsumer c =  (Object o) -> prodMap.insertproduct(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		return map;
	}
	
	@PutMapping("/phones/{userid}")
	public Map<String,Object> update(
			@RequestBody Product param) {
		logger.info("----------2.update진입------------");
		
		IConsumer c =  (Object o) -> prodMap.updateproduct(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
	@DeleteMapping("/phones/{userid}")
	public Map<String,Object> delete(
			@PathVariable String userid,
			@RequestBody Product param) {
		logger.info("----------2.delete진입------------");
		
		IConsumer c =  (Object o) -> prodMap.deleteproduct(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
}
