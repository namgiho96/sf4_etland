package com.etland.web.cust;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.etland.web.cmm.Proxy;

@Repository
public interface CustomerMapper {
	public void insertCustomer(Customer cust);

	public List<Customer> selectCustomerList();

	public List<?> selectCustomers(Proxy pxy);

	public Customer selectCustomer(Customer cust);
	
	public Customer retriveCustomer(Customer cust);

	public int countCustomer(Map<?,?> map);
	
	public int countAllCustomer();

	public void updateCustomer(Customer cust);

	public Map<String, Object> selectProfile(Map<?,?> map);

	public void deleteCustomer(Customer cust);

	public Map<String, Object> SelectPhone(Map<?,?> map);
}
