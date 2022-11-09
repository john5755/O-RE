package io.ssafy.p.k7a504.ore.teamUser.repository;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface TeamUserRepository extends JpaRepository<TeamUser, Long> {
    Slice<TeamUser> findByUserId(Long userId, Pageable pageable);
    Slice<TeamUser> findByTeamId(Long teamId, Pageable pageable);
    List<TeamUser> findByTeamId(Long teamId);
    Optional<TeamUser> findByUserIdAndTeamId(Long userId, Long teamId);
    @Query(value = "SELECT count(*) FROM team_user WHERE user_id In :list AND team_id = :teamId", nativeQuery = true)
    Long countByUserIdListAndTeamId(@Param("list")List<Long> userIdList, @Param("teamId")Long teamId);
    @Query("SELECT tu FROM TeamUser tu JOIN FETCH User u On tu.user.id = u.id WHERE u.name LIKE %?1% AND tu.team.id = ?2")
    Slice<TeamUser> findTeamUserByUserNameAndTeamId(String name, Long teamId, Pageable pageable);
    @Query("SELECT tu FROM TeamUser tu JOIN FETCH User u On tu.user.id = u.id WHERE u.name LIKE %?1% AND tu.team.id = ?2")
    Slice<TeamUser> findTeamUserByUserNicknameAndTeamId(String nickname, Long teamId, Pageable pageable);
    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list AND team_id = :teamId", nativeQuery = true)
    Long countByTeamUserIdListAndTeamId(@Param("list")List<Long> teamUserIdList, @Param("teamId")Long teamId);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list AND team_user.role = 'LEADER'", nativeQuery = true)
    Long countByLeader(@Param("list")List<Long> teamUserIdList);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list  AND team_user.role IN ('LEADER', 'MANAGER')", nativeQuery = true)
    Long countByLeaderAndManager(@Param("list")List<Long> teamUserIdList);
    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list", nativeQuery = true)
    Long countById(@Param("list")List<Long> userIdList);
}