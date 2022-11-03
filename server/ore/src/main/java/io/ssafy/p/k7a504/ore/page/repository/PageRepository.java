package io.ssafy.p.k7a504.ore.page.repository;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
    List<Page> findAllByTeamId(Long teamId);


}
