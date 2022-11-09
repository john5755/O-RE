package io.ssafy.p.k7a504.ore.excel.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.excel.service.ExcelService;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.repository.PageRepository;
import io.ssafy.p.k7a504.ore.userInput.domain.UserInput;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputOfPageResponseDto;
import io.ssafy.p.k7a504.ore.userInput.repository.UserInputRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ExcelServiceImpl implements ExcelService {
    private final PageRepository pageRepository;
    private final UserInputRepository userInputRepository;
    @Override
    public Long writeExcel(Long pageId, HttpServletResponse response) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));
        List<UserInput> userInputList = userInputRepository.findAllByPageId(pageId);
        List<String> userInputs = userInputList.stream().map(UserInput::getInputValue).collect(Collectors.toList());
        List<HashMap<String,Object>> userInputMaps = new ArrayList<>();
        try {
            for(String userInput : userInputs){
                HashMap<String, Object> map = new ObjectMapper().readValue(userInput, HashMap.class);
                userInputMaps.add(map);
            }
        }
        catch (Exception ex) {
            throw new CustomException(ErrorCode.CANT_CONVERT_TO_JSON);
        }
        UserInputOfPageResponseDto userInputOfPageResponseDto = new UserInputOfPageResponseDto(page, userInputMaps);
        try{
            makeExcel(userInputOfPageResponseDto, response);
        }catch(Exception e){
            throw new CustomException(ErrorCode.CANT_CONVERT_TO_EXCEL);
        }
        return pageId;
    }
    private void makeExcel(UserInputOfPageResponseDto userInputOfPageResponseDto, HttpServletResponse response) throws IOException{

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet(userInputOfPageResponseDto.getPageName());

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
        int headerCellNo=0;
        HashMap<String, Object> headerMap = userInputOfPageResponseDto.getInputs().get(0);
        Set<String> keySet = headerMap.keySet();
        for (String key : keySet) {
            headerCell = header.createCell(headerCellNo++);
            headerCell.setCellValue(key);
            headerCell.setCellStyle(headStyle);
        }

        Row row;
        Cell cell;
        int rowNo=1;
        for(HashMap<String, Object> map : userInputOfPageResponseDto.getInputs()) {

            row = sheet.createRow(rowNo++);
            int cellNo=0;
            Collection<Object> valueSet = map.values();
            for(Object object: valueSet){
                cell = row.createCell(cellNo++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(object.toString());
            }
        }
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment;filename="+userInputOfPageResponseDto.getPageName()+".xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();

    }
}
