package com.etland.web.cmm;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;
@Component @Data @Lazy
public class Proxy {
	private int pageNum, pageSize, blockSize, startRow, endRow, startpage, endpage, prevBlock, nextBlock, totalCount;

    private boolean existPrev, existNext;

    public void carryOut(Map<?,?> paramMap) {

    	
    	//page_num,page_size,block_Size

        String _pageNum = (String) paramMap.get("page_num");
        pageNum = ((String) paramMap.get("page_num") == null) ? 1 : Integer.parseInt(_pageNum);
        System.out.println("페이지네이션 페이지넘" + pageNum);

        String _pageSize = (String) paramMap.get("page_size");
        pageSize = ((String) paramMap.get("page_size") == null) ? 5 : Integer.parseInt(_pageSize);
        System.out.println("페이지네이션 페이지사이즈" + pageSize);

        String _blockSize = (String) paramMap.get("block_Size");
        blockSize = ((String) paramMap.get("block_Size") == null) ? 5 : Integer.parseInt(_blockSize);

        totalCount = Integer.parseInt((String) paramMap.get("total_count"));

        int nmg = totalCount % pageSize;
        int pageCount = (nmg == 0) ? totalCount / pageSize : totalCount / pageSize + 1;

        System.out.println("총페이지 수:" + pageCount);

        startRow = (pageNum - 1) * pageSize + 1;
        System.out.println("스타트 로우:" + startRow);

        endRow = (totalCount > pageNum * pageSize) ? pageNum * pageSize : totalCount;
        System.out.println("END로우:" + endRow);

        int blocknum = (pageNum - 1) / blockSize;
        endpage = startpage + (blockSize - 1);

        if (existPrev) {
            startpage = blocknum * blockSize + 1;
        } else {
            startpage = 1;
        }
        
        if(endpage>pageCount) {
            endpage = pageCount;
       }

        existPrev = (startpage - pageSize) > 0;
        existNext = (startpage + pageSize) <= pageCount;
        prevBlock = startpage - pageSize;
        nextBlock = startpage + pageSize;

        System.out.println("프리브블록: " + prevBlock);
        System.out.println("넥스트블록: " + nextBlock);
    }

}
