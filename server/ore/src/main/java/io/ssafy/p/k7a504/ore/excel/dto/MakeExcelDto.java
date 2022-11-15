package io.ssafy.p.k7a504.ore.excel.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MakeExcelDto {
    private String tableName;
    private List<String> titleList;
    private List<Object> dataList;

    public MakeExcelDto(String tableName, List<String> titleList, List<Object> dataList){
        this.tableName=tableName;
        this.titleList=titleList;
        this.dataList=dataList;
    }
}
