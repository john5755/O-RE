package io.ssafy.p.k7a504.ore.teamUser.repository;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.user.domain.User;
import org.springframework.data.domain.Page;
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
    int countByUserIdListAndTeamId(@Param("list")List<Long> userIdList, @Param("teamId")Long teamId);
    @Query("SELECT tu FROM TeamUser tu JOIN FETCH User u On tu.user.id = u.id WHERE u.name LIKE %?1%  AND tu.team.id = ?2 AND u.id != ?3 AND tu.user.role != 'OWNER'")
    Slice<TeamUser> findTeamUserByUserNameAndTeamId(String name, Long teamId, Long userId, Pageable pageable);
    @Query("SELECT tu FROM TeamUser tu JOIN FETCH User u On tu.user.id = u.id WHERE u.name LIKE %?1% AND tu.team.id = ?2 AND u.id != ?3 AND tu.user.role != 'OWNER'")
    Slice<TeamUser> findTeamUserByUserNicknameAndTeamId(String nickname, Long teamId, Long userId, Pageable pageable);
    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list AND team_id = :teamId", nativeQuery = true)
    int countByTeamUserIdListAndTeamId(@Param("list")List<Long> teamUserIdList, @Param("teamId")Long teamId);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list AND team_user.role IN ('OWNER','LEADER')", nativeQuery = true)
    int countRoleOverLeader(@Param("list")List<Long> teamUserIdList);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list  AND team_user.role IN ('OWNER','LEADER', 'MANAGER')", nativeQuery = true)
    int countRoleOverManager(@Param("list")List<Long> teamUserIdList);

    @Query(value = "SELECT count(*) FROM team_user WHERE id In :list", nativeQuery = true)
    int countById(@Param("list")List<Long> userIdList);

    @Query(value = "SELECT * FROM team_user tu " +
            "WHERE tu.user_id not in (SELECT pu.user_id FROM page_user pu WHERE pu.page_id = :pageId)"+
            "AND tu.role != 'OWNER'"+
            "AND tu.team_id = :teamId "+
            "AND tu.user_id != :userId ",
            countQuery = "SELECT count(*) FROM team_user tu "+
                    "WHERE tu.user_id not in (SELECT pu.user_id FROM page_user pu WHERE pu.page_id = :pageId) "+
                    "AND tu.role != 'OWNER'"+
                    "AND tu.team_id = :teamId "+
                    "AND tu.user_id != :userId ",
            nativeQuery = true)
    Page<TeamUser> findByTeamUserNotInPage(@Param("userId") Long userId,@Param("teamId") Long teamId,@Param("pageId") Long pageId, Pageable pageable);


    @Query(value = "SELECT * FROM team_user tu " +
            "WHERE tu.user_id NOT IN (SELECT pu.user_id FROM page_user pu WHERE pu.page_id = :pageId) "+
            "AND tu.user_id IN (SELECT u.id FROM user u WHERE u.name LIKE %:name%) "+
            "AND tu.role != 'OWNER' "+
            "AND tu.team_id = :teamId "+
            "AND tu.user_id != :userId ",
            countQuery = "SELECT count(*) FROM team_user tu "+
                    "WHERE tu.user_id NOT IN (SELECT pu.user_id FROM page_user pu WHERE pu.page_id = :pageId) "+
                    "AND tu.user_id IN (SELECT u.id FROM user u WHERE u.name LIKE %:name%) "+
                    "AND tu.role != 'OWNER' "+
                    "AND tu.team_id = :teamId "+
                    "AND tu.user_id != :userId ",
            nativeQuery = true)
    Page<TeamUser> findTeamUserByUserNameNotInPage(@Param("userId") Long userId, @Param("teamId") Long teamId, @Param("pageId") Long pageId, @Param("name") String name, Pageable pageable);

    @Query(value = "SELECT * FROM team_user tu " +
            "WHERE tu.user_id NOT IN (SELECT pu.user_id FROM page_user pu WHERE pu.page_id = :pageId) "+
            "AND tu.user_id IN (SELECT u.id FROM user u WHERE u.nickname LIKE %:nickname%) "+
            "AND tu.role != 'OWNER'"+
            "AND tu.team_id = :teamId "+
            "AND tu.user_id != :userId ",
            countQuery = "SELECT count(*) FROM team_user tu "+
                    "WHERE tu.user_id NOT IN (SELECT pu.user_id FROM page_user pu WHERE pu.page_id = :pageId) "+
                    "AND tu.user_id IN (SELECT u.id FROM user u WHERE u.nickname LIKE %:nickname%) "+
                    "AND tu.role != 'OWNER'"+
                    "AND tu.team_id = :teamId "+
                    "AND tu.user_id != :userId ",
            nativeQuery = true)
    Page<TeamUser> findTeamUserByUserNicknameNotInPage(@Param("userId") Long userId,@Param("teamId") Long teamId,@Param("pageId") Long pageId, @Param("nickname") String nicknname, Pageable pageable);
    @Query("SELECT tu.user.id FROM TeamUser tu WHERE tu.id in ?1")
    List<Long> findUserIdByIdIn(List<Long> teamUserIdList);


}
