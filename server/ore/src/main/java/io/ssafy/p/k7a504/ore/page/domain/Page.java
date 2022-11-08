package io.ssafy.p.k7a504.ore.page.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
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

    @OneToMany(mappedBy = "page", fetch = FetchType.LAZY)
    private List<PageUser> PageUser;

    private  String content;

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
     * @param pageAddRequestDto
     * @return 새로운 Page
     */
    public static Page createPage(TeamUser teamUser, PageAddRequestDto pageAddRequestDto) {
        if (!teamUser.checkTeamUserCanCreatePage()) {
            throw new CustomException(ErrorCode.NO_AUTH_TO_CREATE);
        }

        return new Page(
                teamUser.getTeam(), pageAddRequestDto.getName(), pageAddRequestDto.getPageStatus(), pageAddRequestDto.getContent().toString());
    }

    private void confirmPageStatus(PageStatus pageStatus) {
        this.pageStatus = pageStatus;
    }
}
