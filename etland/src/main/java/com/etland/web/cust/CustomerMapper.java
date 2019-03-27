package com.etland.web.cust;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomerMapper {
	public void insertCustomer(Customer cust);

	public List<Customer> selectCustomer(Map<?,?> m);

	public List<Customer> selectCustomers(Map<?,?> m);

	public Customer selectCustomer(Customer cust);
	
	public Customer retriveCustomer(Customer cust);

	public int countCustomer(Map<?,?> m);

	public void updateCustomer(Customer cust);

	public Map<String, Object> selectProfile(Map<?,?> m);

	public void deleteCustomer(Customer cust);

	public Map<String, Object> SelectPhone(Map<?,?> m);
}
