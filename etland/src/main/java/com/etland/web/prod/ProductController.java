package com.etland.web.prod;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.etland.web.cat.CateMapper;
import com.etland.web.cat.Category;
import com.etland.web.cmm.IConsumer;
import com.etland.web.cmm.IFunction;
import com.etland.web.cmm.ISupplier;
import com.etland.web.cmm.PrintService;
import com.etland.web.cmm.Proxy;
import com.etland.web.cmm.Users;
import com.etland.web.cust.CustController;
import com.etland.web.supp.SuppMapper;
import com.etland.web.supp.Supplier;

@RestController
public class ProductController {
	
private static final Logger logger = LoggerFactory.getLogger(CustController.class);
	
	@Autowired Product prod;
	@Autowired PrintService ps;
	@Autowired ProductMapper prodMap;
	@Autowired Map<String,Object> map;
	@Autowired Users<?> user;
	@Autowired Proxy pxy;
	@Autowired CateMapper cateMap;
	@Autowired SuppMapper suppMap;
	@Autowired Category cate;
	@Autowired Supplier supp;
    @Resource(name = "uploadPath")private String uploadPath;
    
	
	
	@PostMapping("/phones/{userid}")
	public Product login(
			@PathVariable String userid,
			@RequestBody Product param) {
		logger.info("----------2.login진입------------");
		IFunction i = (Object o) -> prodMap.selectproduct(param);
		return  (Product) i.apply(param);
	}
	@GetMapping("/phones/page/{page}")
	public Map<?,?> list(
			
			@PathVariable String page
			) {
		logger.info("----------2.pord_list진입------------");
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_Size", "5");
		ISupplier s =() -> prodMap.countAllproduct();
		map.put("total_count",s.get());
		pxy.carryOut(map);
		IFunction i = (Object o) -> prodMap.selectproducts(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls",ls);
		map.put("pxy",pxy);
		
		
		return map;
		
	}
	@Transactional
	@PostMapping("/phones")
	public Map<?,?> register(
			@RequestBody Product param) {
		logger.info("----------2.register진입------------");
		List<String> ls = param.getFreebies();
		ps.accept("리스트 ::"+ls);
		IFunction f = s -> cateMap.txCategory((String) s);
		IFunction f2 = s -> suppMap.txSupplier((String) s);
		String cateID = (String) f.apply(param.getCategoryID()); //name
		String suppID = (String) f2.apply(param.getSupplierID()); //name
		param.setCategoryID(cateID);
		param.setSupplierID(suppID);
		IConsumer i =  o -> prodMap.insertproduct((Product) o);
		i.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		return map;
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/phones/{srchword}/{page}")
	public Map<?,?> scrhlist(
			@PathVariable String srchword,
			@PathVariable String page
			
			) {
		logger.info("----------2.scrh_list진입------------");
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		String word = "%"+srchword+"%";
		map.put("searchWord",word);
		IFunction sup = (o)-> prodMap.countsearc((String) o);
		map.put("block_Size", "5");
		ps.accept("총 카운터는?"+sup.apply(word));
		ps.accept("시작값: "+pxy.getStartRow());
		ps.accept("마지막값: "+pxy.getEndRow());
		map.put("total_count",sup.apply(word));
		pxy.carryOut(map);
		ps.accept(page.toString());
		ps.accept(srchword.toString());
		IFunction i = (Object o) -> prodMap.txproducts((Proxy) o);
		ps.accept("서치워드 값 :::::"+pxy.getSearchWord());
		map.clear();
		List<Product> ls = (List<Product>) i.apply(pxy);
		map.put("ls",ls);
		ps.accept("리스트 결과값 : "+ls);
		map.put("pxy",pxy);
		ps.accept("PXY 결과값 : "+pxy);
		return map;
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/phones/{srchword}/grid/{page}")
	public Map<?,?> grid(
			@PathVariable String srchword,
			@PathVariable String page
			) {
		 logger.info("=========프로덕트 grid 진입======");
	        map.clear();
	        map.put("search", srchword);
	        map.put("page_num", page);
	        map.put("page_size", "9");
	        map.put("total_count", prodMap.countsearc(srchword));
	        pxy.carryOut(map);
	        ps.accept("검색어:: "+srchword);
	        ps.accept("페이지:: "+page);
	        ps.accept("스타트:: "+pxy.getStartRow());
	        ps.accept("엔드:: "+pxy.getEndRow());
	        map.clear();
	        map.put("ls", prodMap.selectproducts(pxy));
	        ps.accept("리스트 값 ::: "+prodMap.selectproducts(pxy));
	        map.put("pxy", pxy);
	        return map;
	}
	@RequestMapping(value="/phones/files",method=RequestMethod.POST)
	public Map<?,?> fileupload(
			 @RequestBody MultipartFile file
			) throws Exception{
		 logger.info("=========fileupload진입======");
	/*	Iterator<String> it = req.getFileNames();
		if (it.hasNext()) {
			MultipartFile mf = req.getFile(it.next());
			ps.accept("넘어온 파일명 :::::: "+mf.getName());
		}*/
		
		ps.accept("파일 저장 경로"+uploadPath);
		ps.accept("파일명 :: "+file.getName());
		return map;
	}
	
	
	
	
	@PutMapping("/phones/{userid}")
	public Map<String,Object> update(
			@RequestBody Product param) {
		logger.info("----------2.update진입------------");
		
		IConsumer c =  (Object o) -> prodMap.updateproduct(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
	
	
	
	
	@DeleteMapping("/phones/{userid}")
	public Map<String,Object> delete(
			@PathVariable String userid,
			@RequestBody Product param) {
		logger.info("----------2.delete진입------------");
		
		
		IConsumer c =  (Object o) -> prodMap.deleteproduct(param);
		c.accept(param);
		map.clear();
		map.put("msg","SUCCESS");
		
		return map;
	}
}
