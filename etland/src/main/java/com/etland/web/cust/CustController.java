package com.etland.web.cust;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etland.web.cmm.IFunction;
import com.etland.web.cmm.PrintService;

@RestController
@RequestMapping("/cust")
public class CustController {
	private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	@Autowired Customer cust;
	@Autowired PrintService ps;
	@Autowired CustomerMapper custMap;
	@PostMapping("/login")
	public Customer login(@RequestBody Customer param) {
		logger.info("----------cust진입------------");
		
		return (Customer)(new IFunction() {
			
				@Override
				public Object apply(Object o) {
					ps.accept("커스터머 조효ㅚ 진입");
					return custMap.selectCustomer(param);
				}
			}.apply(param));
	}
	
	
}