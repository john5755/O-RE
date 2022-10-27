package io.ssafy.p.k7a504.ore.user.repository;

import io.ssafy.p.k7a504.ore.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
}
