package io.ssafy.p.k7a504.ore.user.repository;

import io.ssafy.p.k7a504.ore.user.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndName(String email, String name);
    Slice<User> findByNameContains(String name, Pageable pageable);
    Slice<User> findByNicknameContains(String nickname, Pageable pageable);
}
