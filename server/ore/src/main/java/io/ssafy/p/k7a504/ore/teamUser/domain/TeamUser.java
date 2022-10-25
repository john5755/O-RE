package io.ssafy.p.k7a504.ore.teamUser.domain;

import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TeamUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
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
}