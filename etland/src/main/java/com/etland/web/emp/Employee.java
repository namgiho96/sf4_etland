package com.etland.web.emp;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class Employee {
	private String employeeID,manager,name,BirthDate,photo,notes;
}
