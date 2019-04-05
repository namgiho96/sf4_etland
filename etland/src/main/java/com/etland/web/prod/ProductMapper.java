package com.etland.web.prod;
import java.util.List;
import java.util.Map;

import com.etland.web.cmm.Proxy;

public interface ProductMapper {
	
	
	public void insertproduct(Product prod);

	public List<Product> selectproductList(Map<?,?> map);

	public List<?> selectproducts(Proxy pxy);
	
	public List<?> searchproducts(Proxy pxy);
	
	public List<Product> txproducts(Proxy pxy);
	
	public List<Product> txproduct(Proxy pxy);

	public Product selectproduct(Product prod);
	
	public Product retriveproduct(Product prod);

	public int countproduct(Map<?,?> map);
	
	public int countAllproduct();
	
	public int countsearc(String a);

	public boolean existsproductID(Product prod);

	public void updateproduct(Product prod);

	public Map<String, Object> selectProfile(Map<?,?> map);

	public void deleteproduct(Product prod);

	public Map<String, Object> SelectPhone(Map<?,?> map);
}
