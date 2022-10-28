package io.ssafy.p.k7a504.ore.pageUser.repository;

import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PageUserRepository extends JpaRepository<PageUser, Long> {
    Optional<PageUser> findByPageIdAndUserId(Long pageId, Long userId);
    Optional<List<PageUser>> findAllByPageId(Long pageId);
    Boolean existsByPageIdAndUserId(Long pageId, Long userId);
}
