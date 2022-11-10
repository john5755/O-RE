package io.ssafy.p.k7a504.ore.excel.api;

import io.ssafy.p.k7a504.ore.excel.service.ExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/excel")
public class ExcelController {
    private final ExcelService excelService;
    @PostMapping("/download/{pageId}")
    public void ExcelDown(@PathVariable Long pageId, HttpServletResponse response){
        excelService.writeExcel(pageId, response);
    }
}
