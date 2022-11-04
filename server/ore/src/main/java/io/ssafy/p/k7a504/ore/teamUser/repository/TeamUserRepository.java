package io.ssafy.p.k7a504.ore.teamUser.repository;

import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.user.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface TeamUserRepository extends JpaRepository<TeamUser, Long> {
    Slice<TeamUser> findByUserId(Long userId, Pageable pageable);
    Slice<TeamUser> findByTeamId(Long teamId, Pageable pageable);
    List<TeamUser> findByTeamId(Long teamId);
    Optional<TeamUser> findByUserIdAndTeamId(Long userId, Long teamId);
    boolean existsByUserAndTeam(User user, Team team);
    boolean existsByUserAndTeamId(User user, Long teamId);
}