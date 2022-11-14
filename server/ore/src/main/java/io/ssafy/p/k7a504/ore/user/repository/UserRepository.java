package io.ssafy.p.k7a504.ore.user.repository;

import io.ssafy.p.k7a504.ore.team.domain.Team;
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

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    @Query("select u from User u where u.role = 'OWNER'")
    Optional<User> findOwner();
    Optional<User> findByEmailAndName(String email, String name);
    Slice<User> findByNameContains(String name, Pageable pageable);
    Slice<User> findByNicknameContains(String nickname, Pageable pageable);
    List<User> findByIdIn(List<Long> ids);
    Optional<User> findByRole(String role);
    Long countByIdIn(List<Long> ids);
    @Query(value = "SELECT * FROM user u " +
            "WHERE u.id not in (SELECT tu.user_id FROM team_user tu WHERE tu.team_id = :teamId)",
            countQuery = "SELECT count(*) FROM user u "+
                    "WHERE u.id not in (SELECT tu.user_id FROM team_user tu WHERE tu.team_id = :teamId)",
            nativeQuery = true)
    Page<User> findByUserNotInTeam(@Param("teamId") Long teamId, Pageable pageable);
    @Query(value = "SELECT * FROM user u " +
            "WHERE u.id NOT IN (SELECT tu.user_id FROM team_user tu WHERE tu.team_id = :teamId) "+
            "AND u.name LIKE %:name% "+
            "AND u.role != 'OWNER' "+
            "AND u.id != :userId ",
            countQuery = "SELECT count(*) FROM user u "+
                    "WHERE u.id NOT IN (SELECT tu.user_id FROM team_user tu WHERE tu.team_id = :teamId) "+
                    "AND u.name LIKE %:name% "+
                    "AND u.role != 'OWNER' "+
                    "AND u.id != :userId ",
            nativeQuery = true)
    Page<User> findUserByUserNameNotInTeam(@Param("userId") Long userId, @Param("teamId") Long teamId, @Param("name") String name, Pageable pageable);

    @Query(value = "SELECT * FROM user u " +
            "WHERE u.id NOT IN (SELECT tu.user_id FROM team_user tu WHERE tu.team_id = :teamId) "+
            "AND u.name LIKE %:nickname% "+
            "AND u.role != 'OWNER' "+
            "AND u.id != :userId ",
            countQuery = "SELECT count(*) FROM user u "+
                    "WHERE u.id NOT IN (SELECT tu.user_id FROM team_user tu WHERE tu.team_id = :teamId) "+
                    "AND u.name LIKE %:nickname% "+
                    "AND u.role != 'OWNER' "+
                    "AND u.id != :userId ",
            nativeQuery = true)
    Page<User> findUserByUserNicknameNotInTeam(@Param("userId") Long userId,@Param("teamId") Long teamId, @Param("nickname") String nicknname, Pageable pageable);

}
