package io.ssafy.p.k7a504.ore.pageUser.domain;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PageUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="page_id")
    private Page page;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private PageUserRole pageUserRole;

    /**
     * TeamUser가 해당 Page에 참가하는 메서드
     * @param page
     * @param user
     * @return PageUser
     */
    public static PageUser enrollPage(Page page, User user) {
        return new PageUser(page, user, PageUserRole.VIEWER);
    }

    private PageUser(Page page, User user, PageUserRole pageUserRole) {
        this.page = page;
        this.user = user;
        this.pageUserRole = pageUserRole;
    }

    /**
     * Maintainer 또는 Editor 권한의 PageUser가 다른 PageUser의 권한을 승급
     * @param pageUser
     * @param pageUserRole
     */
    public void grantRole(PageUser pageUser, PageUserRole pageUserRole) {
        if (!checkCanChangeRole(pageUser)) {
            // TODO 권한을 변경할 수 없다는 예외 처리
        }
        pageUser.setPageUserRole(pageUserRole);
    }

    /**
     * Maintainer 권한의 PageUser가 다른 PageUser의 권한 조정하는 메소드
     * @param pageUser
     * @param pageUserRole
     */
    public void adjustRoleByMaintainer(PageUser pageUser, PageUserRole pageUserRole) {
        if (this.pageUserRole != PageUserRole.MAINTAINER) {
            // TODO 권한이 없다는 예외처리
        }
        pageUser.setPageUserRole(pageUserRole);
    }

    private boolean checkCanChangeRole(PageUser pageUser) {
        if(this.pageUserRole == PageUserRole.VIEWER) {
            return false;
        }
        if(this.pageUserRole.getPriority() <= pageUser.getPageUserRole().getPriority()) {
            return false;
        }
        return true;
    }

    private void setPageUserRole(PageUserRole pageUserRole) {
        this.pageUserRole = pageUserRole;
    }

}
