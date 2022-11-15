package io.ssafy.p.k7a504.ore.page.repository;

import io.ssafy.p.k7a504.ore.page.domain.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
    @Query("select c from Content c where c.page.id = ?1 and c.isTable = TRUE")
    Optional<Content> findByPageIdAndIsTable(Long pageId);
}
