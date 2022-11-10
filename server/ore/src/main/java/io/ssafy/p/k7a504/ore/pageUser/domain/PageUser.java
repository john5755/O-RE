package io.ssafy.p.k7a504.ore.pageUser.domain;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.user.domain.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="page_id")
    private Page page;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action= OnDeleteAction.CASCADE)
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
        if (!checkCanChangeRole(pageUser, pageUserRole)) {
            throw new CustomException(ErrorCode.NO_AUTH_TO_MODIFY);
        }
        pageUser.setPageUserRole(pageUserRole);
    }

    /**
     * Maintainer 권한의 PageUser가 다른 PageUser의 권한 조정하는 메소드
     * @param pageUser
     * @param pageUserRole
     */
    public void adjustRoleByMaintainer(PageUser pageUser, PageUserRole pageUserRole) {
        if(this.getId()==pageUser.getId()){
            pageUser.setPageUserRole(pageUserRole);
        }
        else if (this.pageUserRole != PageUserRole.MAINTAINER) {
            throw new CustomException(ErrorCode.NO_AUTH_TO_MODIFY);
        }
        else if(this.pageUserRole.getPriority() < pageUserRole.getPriority()){
            throw new CustomException(ErrorCode.CANT_GIVE_HIGHER_AUTH);
        }
        pageUser.setPageUserRole(pageUserRole);
    }

    private boolean checkCanChangeRole(PageUser pageUser, PageUserRole pageUserRole) {
        if(this.pageUserRole == PageUserRole.VIEWER) {
            return false;
        }
        if(this.pageUserRole.getPriority() <= pageUser.getPageUserRole().getPriority()) {
            return false;
        }
        if(pageUserRole==PageUserRole.OWNER||this.pageUserRole.getPriority() < pageUserRole.getPriority()){
            return false;
        }
        return true;
    }

    private void setPageUserRole(PageUserRole pageUserRole) {
        this.pageUserRole = pageUserRole;
    }

}
