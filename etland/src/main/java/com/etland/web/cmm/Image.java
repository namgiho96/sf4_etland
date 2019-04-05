package com.etland.web.cmm;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class Image {
	private String imgSeq,imgName,imgExtention,owner;
}
