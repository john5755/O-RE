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
    Slice<PageUser> findAllByPageId(Long pageId, Pageable pageable);

    int countByPageId(Long pageId);
    @Query("select u from Page p join fetch PageUser u on p.id = u.page.id where u.user.id= ?2 and p.team.id = ?1")
    Slice<PageUser> findByTeamIdAndUserId(Long teamId, Long userId, Pageable pageable);

    @Query("select count(p.id) from PageUser p where p.id in ?1")
    int countById(List<Long> pageUserIdList);


    @Query("select count(p.id) from PageUser p where p.id in ?1 and p.pageUserRole=?2")
    int countByIdAndPageUserRole(List<Long> userIdList, PageUserRole pageUserRole);

    @Query("select count(p.id) from PageUser p where p.page.id =?1 and p.id in ?2")
    int countByPageIdAndUserId(Long pageId, List<Long> userIdList);
}
