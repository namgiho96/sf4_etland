package com.etland.web.supp;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class Supplier {
	private String supplierID,supplierName,contactName,address,city,postalCode,country,phone;
}
