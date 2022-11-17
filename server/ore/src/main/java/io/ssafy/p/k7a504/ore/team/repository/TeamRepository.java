package io.ssafy.p.k7a504.ore.team.repository;

import io.ssafy.p.k7a504.ore.team.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
}