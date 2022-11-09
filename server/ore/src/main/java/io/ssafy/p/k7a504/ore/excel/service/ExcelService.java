package io.ssafy.p.k7a504.ore.excel.service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface ExcelService {
    Long writeExcel(Long pageId, HttpServletResponse response);
}
