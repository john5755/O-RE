package io.ssafy.p.k7a504.ore.excel.service;

import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface ExcelService {
    ResponseEntity<byte[]> makeExcel(Long pageId, HttpServletResponse response);
}
