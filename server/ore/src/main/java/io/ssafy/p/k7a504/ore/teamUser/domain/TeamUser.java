package io.ssafy.p.k7a504.ore.teamUser.domain;

import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.user.domain.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class TeamUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="team_id")
    private Team team;

    @Enumerated(EnumType.STRING)
    private TeamUserRole role;

    public boolean checkTeamUserCanCreatePage() {
        if (this.role == TeamUserRole.LEADER || this.role == TeamUserRole.MANAGER) {
            return true;
        }
        return false;
    }
    private TeamUser(User user, Team team, TeamUserRole role){
        this.team=team;
        this.user =user;
        this.role=role;
    }
    public TeamUser createTeamUser(User user, Team team, TeamUserRole role){
        TeamUser teamUser = new TeamUser(user, team, role);
        return teamUser;
    }
    public void modifyTeamUserAuthority(TeamUserRole role){
        this.role = role;
    }

}