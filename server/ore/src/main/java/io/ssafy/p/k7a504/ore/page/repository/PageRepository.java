package io.ssafy.p.k7a504.ore.page.repository;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
    Optional<Page> findPageById(Long id);


}
