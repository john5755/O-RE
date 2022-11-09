package io.ssafy.p.k7a504.ore.page.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageAddRequestDto {
    @NotNull
    Long teamId;

    @NotBlank
    String name;

    List<Map<String, Object>> content;

    @NotNull
    List<String> headerList;

    @NotBlank
    String pageStatus;
}
