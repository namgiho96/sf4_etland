package com.etland.web.prod;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class Product {
	private String  productID,
					productName,
					supplierID,
					categoryID,
					unit,
					color,
					price;
	private List<String> freebies;
}
