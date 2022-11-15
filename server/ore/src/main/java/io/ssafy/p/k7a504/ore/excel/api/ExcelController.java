package io.ssafy.p.k7a504.ore.excel.api;

import io.ssafy.p.k7a504.ore.excel.service.ExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/excel")
public class ExcelController {
    private final ExcelService excelService;
    @GetMapping("/download/{pageId}")
    public ResponseEntity<byte[]> excelDown(@PathVariable Long pageId, HttpServletResponse response){
        return excelService.makeExcel(pageId, response);
    }
}

