package com.etland.web.cat;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.etland.web.cmm.Proxy;

@Repository
public interface CateMapper {

	public void insertCategory(Category cate);

	public List<Category> selectCategoryList();

	public List<?> selectCategorys(Proxy pxy);

	public String txCategory(String categoryname);

	public Category retriveCategory(Category cate);

	public int countSupplier(Map<?, ?> map);

	public int countAllCategory();

	public void updateCategory(Category cate);

	public void deleteCategory(Category cate);

}
