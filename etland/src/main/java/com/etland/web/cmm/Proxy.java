package com.etland.web.cmm;

import java.io.File;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;

import lombok.Data;

@Component
@Data
@Lazy
public class Proxy {
	private int pageNum, pageSize, blocksize, startRow, endRow, startPage, endPage, prevBlock, nextBlock, totalCount;

	private boolean existPrev, existNext;
	private String searchWord, categoryID, supplierID;
	public void carryOut(Map<?, ?> paramMap) {

		// page_num,page_size,block_Size
		searchWord = (String) paramMap.get("searchWord");
		
		
		String _pageNum = (String) paramMap.get("page_num");
		pageNum = ((String) paramMap.get("page_num") == null) ? 1 : Integer.parseInt(_pageNum);
		String _pageSize = (String) paramMap.get("page_size");
		pageSize = ((String) paramMap.get("page_size") == null) ? 5 : Integer.parseInt(_pageSize);
		String _blockSize = (String) paramMap.get("block_size");
		blocksize = ((String) paramMap.get("block_size") == null) ? 5 : Integer.parseInt(_blockSize);
		totalCount = (int) paramMap.get("total_count");
		int nmg = totalCount % pageSize;
		int pageCount = (nmg == 0) ? totalCount / pageSize : totalCount / pageSize + 1;


		startRow = (pageNum - 1) * pageSize;
		endRow = (totalCount > pageNum * pageSize) ? pageNum * pageSize : totalCount;

		int blocknum = (pageNum - 1) / blocksize;
		if (existPrev) {
			startPage = blocknum * blocksize + 1;
		} else {
			startPage = 1;
		}
		endPage = startPage + (blocksize - 1);
		startPage = pageNum - ((pageNum - 1) % blocksize);
		endPage = startPage + (blocksize - 1);
		if (endPage > pageCount) {
			endPage = pageCount;
		}

		existPrev = (startPage - pageSize) > 0;
		existNext = (startPage + pageSize) <= pageCount;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;

		System.out.println("startpage: " + startPage);
		System.out.println("endpage: " + endPage);
	}
	
	@Autowired Image img ;
	public void fileupload(String CustomerID) {
		
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(1024 * 1024 * 40);
		upload.setFileSizeMax(1024 * 1024 * 50);
		List<FileItem> items = null;
		try {
			File file = null;
			//items = upload.parseRequest((RequestContext) new ServletRequestContext(request));
			Iterator<FileItem> iter = items.iterator();
			while(iter.hasNext()) {
				FileItem item = iter.next();
				if(!item.isFormField()) {
					String fileName = item.getName();
					file = new File(""+fileName);
					item.write(file);
					img.setImgName(fileName.substring(0,fileName.indexOf(".")));
					System.out.println("파일명"+fileName.substring(0,fileName.indexOf(".")));
					img.setImgExtention(fileName.substring(fileName.indexOf(".")+1));
					System.out.println("확장자"+fileName.substring(fileName.indexOf(".")+1));
					img.setOwner(CustomerID);
					System.out.println("CustomerID :::"+CustomerID);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
