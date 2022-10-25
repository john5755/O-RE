package io.ssafy.p.k7a504.ore.page.domain;

import io.ssafy.p.k7a504.ore.element.domain.Element;
import io.ssafy.p.k7a504.ore.element.domain.ElementType;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Page {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="team_id")
    private Team team;

    private String name;
    private String sequence;

    @Enumerated(EnumType.STRING)
    private PageStatus pageStatus;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "page")
    private List<Element> elements = new ArrayList<>();


    /**
     * Page 가 Input Element 를 가지고 있는지 확인하고 가지고 있다면 PageStatus를 INCLUDE_INPUT으로, 없다면 EXCLUDE_INPUT으로 설정
     */
    public void changePageStatusByContainingInput() {
        // TODO elements 가 있는지 확인하는 검증 필요

        // FIXME element의 Type이 Enum으로 변경되면 그에 맞게 변경해야 함
        boolean result = elements.stream()
                .anyMatch(element -> element.getType() == ElementType.INPUT
                        || element.getType() == ElementType.CHECKBOX
                        || element.getType() == ElementType.SELECT
                        || element.getType() == ElementType.RADIO
                );
        PageStatus pageStatus = PageStatus.EXCLUDE_INPUT;
        if(result) pageStatus = PageStatus.INCLUDE_INPUT;
        setPageStatus(pageStatus);
    }

    private void setPageStatus(PageStatus pageStatus) {
        this.pageStatus = pageStatus;
    }

}
