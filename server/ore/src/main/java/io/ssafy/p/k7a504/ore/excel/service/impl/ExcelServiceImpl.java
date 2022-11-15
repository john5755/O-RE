package io.ssafy.p.k7a504.ore.excel.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.excel.dto.MakeExcelDto;
import io.ssafy.p.k7a504.ore.excel.service.ExcelService;
import io.ssafy.p.k7a504.ore.page.domain.Content;
import io.ssafy.p.k7a504.ore.page.repository.ContentRepository;
import io.ssafy.p.k7a504.ore.page.repository.PageRepository;
import io.ssafy.p.k7a504.ore.userInput.repository.UserInputRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;


@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ExcelServiceImpl implements ExcelService {
    private final PageRepository pageRepository;
    private final UserInputRepository userInputRepository;
    private final ContentRepository contentRepository;


    private MakeExcelDto writeExcel(Long pageId) {
        Content content = contentRepository.findByPageIdAndIsTable(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.DONT_HAVE_TABLE));
        HashMap<String, Object> map = new HashMap<>();
        try {
            map = new ObjectMapper().readValue(content.getContentValue(), HashMap.class);
        }
        catch (Exception ex) {
            throw new CustomException(ErrorCode.CANT_CONVERT_TO_JSON);
        }

        LinkedHashMap<String, Object> linkedHashMap = (LinkedHashMap<String, Object>) map.get("tagProps");
        String tableName = (String) linkedHashMap.get("header");
        List<String> titleList = (List<String>) linkedHashMap.get("title");
        List<Object> dataList = (List<Object>) linkedHashMap.get("data");

        return new MakeExcelDto(tableName, titleList, dataList);

    }
    @Override
    public ResponseEntity<byte[]> makeExcel(Long pageId, HttpServletResponse response) {

        MakeExcelDto makeExcelDto = writeExcel(pageId);

        try {
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(makeExcelDto.getTableName());

            CellStyle headStyle = workbook.createCellStyle();
            headStyle.setBorderTop(BorderStyle.THIN);
            headStyle.setBorderBottom(BorderStyle.THIN);
            headStyle.setBorderLeft(BorderStyle.THIN);
            headStyle.setBorderRight(BorderStyle.THIN);
            headStyle.setAlignment(HorizontalAlignment.CENTER);

            CellStyle bodyStyle = workbook.createCellStyle();
            bodyStyle.setBorderTop(BorderStyle.THIN);
            bodyStyle.setBorderBottom(BorderStyle.THIN);
            bodyStyle.setBorderLeft(BorderStyle.THIN);
            bodyStyle.setBorderRight(BorderStyle.THIN);

            Row header = sheet.createRow(0);
            Cell headerCell;
            int headerCellNo = 0;

            for (String key : makeExcelDto.getTitleList()) {
                headerCell = header.createCell(headerCellNo++);
                headerCell.setCellValue(key);
                headerCell.setCellStyle(headStyle);
            }

            Row row;
            Cell cell;
            int rowNo = 1;
            List<Object> list = makeExcelDto.getDataList();
            for (int i = 0; i < list.size(); i++) {
                List<Object> data = (List<Object>) list.get(i);
                row = sheet.createRow(rowNo++);
                int cellNo = 0;
                for (Object object : data) {
                    cell = row.createCell(cellNo++);
                    cell.setCellStyle(bodyStyle);
                    cell.setCellValue(object.toString());
                }
            }

            ByteArrayOutputStream os = new ByteArrayOutputStream();
            workbook.write(os);
            os.close();

            String contentType = "application/vnd.ms-excel";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ore.xlsx")
                    .body(os.toByteArray());
        }catch (Exception e){
            throw new CustomException(ErrorCode.CANT_CONVERT_TO_EXCEL);
        }

    }
}

