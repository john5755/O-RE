package io.ssafy.p.k7a504.ore.userInput.domain;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UserInput {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="page_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Page page;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="page_user_id")
    private PageUser pageUser;

    private String inputValue;

    @Builder
    private UserInput(PageUser pageUser, String inputValue){
        this.page = pageUser.getPage();
        this.pageUser = pageUser;
        this.inputValue = inputValue;
    }

    public static UserInput userInputSubmit(PageUser pageUser, String inputValue) {
        UserInput userinput = new UserInput(pageUser, inputValue);
        return userinput;
    }
}