package com.etland.web.cat;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class Category {
	private String categoryID,categoryName,description;
}
