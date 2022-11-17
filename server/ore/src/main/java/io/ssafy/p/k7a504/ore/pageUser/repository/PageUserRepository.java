package io.ssafy.p.k7a504.ore.pageUser.repository;

import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PageUserRepository extends JpaRepository<PageUser, Long> {
    Optional<PageUser> findByPageIdAndUserId(Long pageId, Long userId);
    @Query("select u from PageUser u where u.page.id=?1 and u.user.role<>'OWNER' and u.user.id<>?2")
    Slice<PageUser> findAllByPageId(Long pageId, Long userId, Pageable pageable);

    @Query("select u from Page p join fetch PageUser u on p.id = u.page.id where u.user.id= ?2 and p.team.id = ?1")
    Slice<PageUser> findByTeamIdAndUserId(Long teamId, Long userId, Pageable pageable);

    @Query("select count(p.id) from PageUser p where p.id in ?1")
    int countById(List<Long> pageUserIdList);

    @Query("select count(p.id) from PageUser p where p.id in ?1 and p.pageUserRole in ?2")
    int countByIdAndPageUserRole(List<Long> userIdList, List<PageUserRole> pageUserRole);

    @Query("select count(p.id) from PageUser p where p.page.id =?1 and p.user.id in ?2")
    int countByPageIdAndUserId(Long pageId, List<Long> userIdList);

    @Query("select p from PageUser p where p.page.id=?1 and p.user.name like %?2% and p.user.role<>'OWNER' and p.user.id<>?3")
    Slice<PageUser> findAllByUserName(Long pageId, String name, Long userId, Pageable pageable);

    @Query("select p from PageUser p where p.page.id=?1 and p.user.nickname like %?2% and p.user.role<>'OWNER' and p.user.id<>?3")
    Slice<PageUser> findAllByNickName(Long pageId, String nickName, Long userId,  Pageable pageable);
}
