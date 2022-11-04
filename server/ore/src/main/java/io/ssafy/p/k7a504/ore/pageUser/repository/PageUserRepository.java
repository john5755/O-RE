package io.ssafy.p.k7a504.ore.pageUser.repository;

import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PageUserRepository extends JpaRepository<PageUser, Long> {
    Optional<PageUser> findByPageIdAndUserId(Long pageId, Long userId);
    List<PageUser> findAllByPageId(Long pageId);

    //todo: pageuser랑 page조인해서 userId랑 teamId를 갖고 볼수있는페이지 가져오기
    boolean existsByPageIdAndUserId(Long pageId, Long userId);
}
