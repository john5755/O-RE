package io.ssafy.p.k7a504.ore.page.repository;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
    @Query("select p from Page p left outer join PageUser u on p.id = u.page.id where u.user.id= ?2 and p.team.id = ?1 and p.pageStatus='INCLUDE_INPUT'")
    Slice<Page> findByTeamIdAndUserIdAndPageStatus(Long teamId, Long userId, Pageable pageable);

}
