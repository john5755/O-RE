package io.ssafy.p.k7a504.ore.userInput.repository;

import io.ssafy.p.k7a504.ore.userInput.domain.UserInput;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInputRepository extends JpaRepository<UserInput, Long> {
    List<UserInput> findAllByPageId(Long pageId);
}
