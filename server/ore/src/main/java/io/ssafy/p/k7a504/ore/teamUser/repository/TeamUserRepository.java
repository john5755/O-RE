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
    @Query("SELECT tu FROM TeamUser tu WHERE  tu.user.role!= 'OWNER' AND tu.user.id != ?2 AND tu.team.id = ?1")
    Slice<TeamUser> findByTeamId(Long teamId, Long userId, Pageable pageable);
    Optional<TeamUser> findByUserIdAndTeamId(Long userId, Long teamId);
    @Query(value = "SELECT count(*) FROM team_user WHERE user_id In :list AND team_id = :teamId", nativeQuery = true)
    Long countByUserIdListAndTeamId(@Param("list")List<Long> userIdList, @Param("teamId")Long teamId);
    @Query("SELECT tu FROM TeamUser tu JOIN FETCH User u On tu.user.id = u.id WHERE u.name LIKE %?1%  AND tu.team.id = ?2 AND u.id != ?3 AND tu.user.role != 'OWNER'")
    Slice<TeamUser> findTeamUserByUserNameAndTeamId(String name, Long teamId, Long userId, Pageable pageable);
    @Query("SELECT tu FROM TeamUser tu JOIN FETCH User u On tu.user.id = u.id WHERE u.name LIKE %?1% AND tu.team.id = ?2 AND u.id != ?3 AND tu.user.role != 'OWNER'")
    Slice<TeamUser> findTeamUserByUserNicknameAndTeamId(String nickname, Long teamId, Long userId, Pageable pageable);
    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list AND team_id = :teamId", nativeQuery = true)
    Long countByTeamUserIdListAndTeamId(@Param("list")List<Long> teamUserIdList, @Param("teamId")Long teamId);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list AND team_user.role IN ('OWNER','LEADER')", nativeQuery = true)
    Long countRoleOverLeader(@Param("list")List<Long> teamUserIdList);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list  AND team_user.role IN ('OWNER','LEADER', 'MANAGER')", nativeQuery = true)
    Long countRoleOverManager(@Param("list")List<Long> teamUserIdList);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list", nativeQuery = true)
    Long countById(@Param("list")List<Long> userIdList);
}