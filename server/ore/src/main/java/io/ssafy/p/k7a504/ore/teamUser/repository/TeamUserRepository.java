package io.ssafy.p.k7a504.ore.teamUser.repository;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamUserRepository extends JpaRepository<TeamUser, Long> {
    List<TeamUser> findByUserId(Long Userid);
    boolean existsByTeamIdAndUserId(Long teamId, Long userId);
    TeamUser getByUserIdAndTeamId(Long userId, Long teamId);

//    Optional<TeamUser> findByUserIdAndTeamId();
}