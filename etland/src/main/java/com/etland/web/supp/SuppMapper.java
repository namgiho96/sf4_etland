package com.etland.web.supp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.etland.web.cmm.Proxy;
import com.etland.web.supp.Supplier;

@Repository
public interface SuppMapper {

	public void insertSupplier(Supplier supp);

	public List<Supplier> selectSupplierList();

	public List<?> selectSuppliers(Proxy pxy);

	public String txSupplier(String supplierID);

	public Supplier retriveSupplier(Supplier supp);

	public int countSupplier(Map<?, ?> map);

	public int countAllSupplier();

	public void updateSupplier(Supplier cust);

	public Map<String, Object> selectProfile(Map<?, ?> map);

	public void deleteSupplier(Supplier supp);

	public Map<String, Object> SelectPhone(Map<?, ?> map);

}
