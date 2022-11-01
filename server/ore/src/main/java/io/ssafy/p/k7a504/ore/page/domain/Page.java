package io.ssafy.p.k7a504.ore.page.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.element.domain.Element;
import io.ssafy.p.k7a504.ore.element.domain.ElementType;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Page {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="team_id")
    private Team team;

    private String name;

    @Enumerated(EnumType.STRING)
    private PageStatus pageStatus;

    private  String content;

//    @JsonIgnore
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "page")
//    private List<Element> elements = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "page")
    private List<PageUser> pageUserList = new ArrayList<>();

    private Page(Team team, String name, String pageStatus, String content) {
        this.team = team;
        this.name = name;
        this.pageStatus = PageStatus.valueOf(pageStatus);
        this.content = content;
    }

    /**
     * Manager 이상 권한의 TeamUser가 최초로 Page를 생성하는 메서드
     * @param teamUser
     * @param name
     * @return 새로운 Page
     */
    public static Page createPage(TeamUser teamUser, String name, String pageStatus, String content) {
        if (!teamUser.checkTeamUserCanCreatePage()) {
            throw new CustomException(ErrorCode.CANT_CREATE_TEAM);
        }

        Page page = new Page(teamUser.getTeam(), name, pageStatus, content);
        PageUser pageUser = PageUser.enrollPage(page, teamUser.getUser());
        pageUser.adjustRoleByMaintainer(pageUser, PageUserRole.MAINTAINER);
        page.pageUserList.add(pageUser);

        return page;
    }


//    /**
//     * Page 가 Input Element 를 가지고 있는지 확인하고 가지고 있다면 PageStatus를 INCLUDE_INPUT으로, 없다면 EXCLUDE_INPUT으로 설정
//     */
//    public void changePageStatusByContainingInput() {
//        // TODO elements 가 있는지 확인하는 검증 필요
//
//        // FIXME element의 Type이 Enum으로 변경되면 그에 맞게 변경해야 함
//        boolean result = elements.stream()
//                .anyMatch(element -> element.getType() == ElementType.INPUT
//                        || element.getType() == ElementType.CHECKBOX
//                        || element.getType() == ElementType.SELECT
//                        || element.getType() == ElementType.RADIO
//                );
//        PageStatus pageStatus = PageStatus.EXCLUDE_INPUT;
//        if(result) pageStatus = PageStatus.INCLUDE_INPUT;
//        confirmPageStatus(pageStatus);
//    }

    private void confirmPageStatus(PageStatus pageStatus) {
        this.pageStatus = pageStatus;
    }
}
