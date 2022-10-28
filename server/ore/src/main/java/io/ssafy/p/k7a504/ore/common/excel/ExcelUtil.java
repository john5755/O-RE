package io.ssafy.p.k7a504.ore.common.excel;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Component
public class ExcelUtil {

    public String getCellValue(XSSFCell cell) {
        String value = "";
        if(cell == null) {
            return value;
        }

        switch (cell.getCellType()) {
            case STRING:
                value = cell.getStringCellValue();
                break;
            case NUMERIC:
                value = (int) cell.getNumericCellValue() + "";
                break;
            default:
                break;
        }
        return value;
    }

    public List<Map<String, Object>> getListData(MultipartFile file, int startRowNum, int columnLength, BCryptPasswordEncoder encoder) {
        List<Map<String, Object>> excelList = new ArrayList<Map<String,Object>>();
        try {
            OPCPackage opcPackage = OPCPackage.open(file.getInputStream());

            XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);
            XSSFSheet sheet = workbook.getSheetAt(0);
            int rowIndex = 0;

            Set<String> duplication = new HashSet<>();
            for (rowIndex = startRowNum; rowIndex <= sheet.getLastRowNum() & rowIndex <= 1001; rowIndex++) {
                XSSFRow row = sheet.getRow(rowIndex);

                // 빈 행은 Skip
                if (row.getCell(0) != null && !row.getCell(0).toString().equals("")) {
                    Map<String, Object> map = new HashMap<String, Object>();

                    String email = getCellValue(row.getCell(0));
                    if(duplication.contains(email)) continue;
                    else duplication.add(email);

                    map.put("email", email);
                    map.put("password", encoder.encode(getCellValue(row.getCell(1))));
                    map.put("name", getCellValue(row.getCell(2)));

                    String role = getCellValue(row.getCell(3));
                    if(role.equals(UserRole.OWNER.toString()))
                        throw new CustomException(ErrorCode.AUTHORITY_NOT_FOUND);
                    else if(role.equals(UserRole.USER.toString()) || role.equals(UserRole.ADMIN.toString()))
                        map.put("role", UserRole.valueOf(role));
                    else
                        throw new CustomException(ErrorCode.NOT_VALID_USER_ROLE);

                    excelList.add(map);
                }
            }
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return excelList;
    }

}
