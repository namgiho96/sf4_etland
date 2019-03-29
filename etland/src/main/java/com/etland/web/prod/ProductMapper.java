package com.etland.web.prod;
import java.util.List;
import java.util.Map;

public interface ProductMapper {
	
	
	public void insertproduct(Product prod);

	public List<Product> selectproductList(Map<?,?> map);

	public List<Product> selectproducts(Map<?,?> map);

	public Product selectproduct(Product prod);
	
	public Product retriveproduct(Product prod);

	public int countproduct(Map<?,?> map);

	public boolean existsproductID(Product prod);

	public void updateproduct(Product prod);

	public Map<String, Object> selectProfile(Map<?,?> map);

	public void deleteproduct(Product prod);

	public Map<String, Object> SelectPhone(Map<?,?> map);
}
