package com.etland.web.cmm;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
@Lazy
public class Proxy {
	private int pageNum, pageSize, blocksize, startRow, endRow, startPage, endPage, prevBlock, nextBlock, totalCount;

	private boolean existPrev, existNext;

	public void carryOut(Map<?, ?> paramMap) {

		// page_num,page_size,block_Size

		String _pageNum = (String) paramMap.get("page_num");
		pageNum = ((String) paramMap.get("page_num") == null) ? 1 : Integer.parseInt(_pageNum);
		System.out.println("페이지네이션 페이지넘" + pageNum);

		String _pageSize = (String) paramMap.get("page_size");
		pageSize = ((String) paramMap.get("page_size") == null) ? 5 : Integer.parseInt(_pageSize);
		System.out.println("페이지네이션 페이지사이즈" + pageSize);

		String _blockSize = (String) paramMap.get("block_size");
		blocksize = ((String) paramMap.get("block_size") == null) ? 5 : Integer.parseInt(_blockSize);

		totalCount = (int) paramMap.get("total_count");
		System.out.println("총카운트 : " + totalCount);

		int nmg = totalCount % pageSize;
		int pageCount = (nmg == 0) ? totalCount / pageSize : totalCount / pageSize + 1;

		System.out.println("총페이지 수:" + pageCount);

		startRow = (pageNum - 1) * pageSize;
		System.out.println("스타트 로우:" + startRow);

		endRow = (totalCount > pageNum * pageSize) ? pageNum * pageSize : totalCount;
		System.out.println("END로우:" + endRow);

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

}
