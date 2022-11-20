package io.ssafy.p.k7a504.ore.userInput.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

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
    @OnDelete(action= OnDeleteAction.CASCADE)
    private PageUser pageUser;

    private String inputValue;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "input_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date inputDate;


    @Builder
    private UserInput(PageUser pageUser, String inputValue){
        this.page = pageUser.getPage();
        this.pageUser = pageUser;
        this.inputValue = inputValue;
        LocalDateTime now = LocalDateTime.now();
        Instant instant = now.atZone(ZoneId.systemDefault()).toInstant();
        this.inputDate = Date.from(instant);
    }

    public static UserInput userInputSubmit(PageUser pageUser, String inputValue) {
        UserInput userinput = new UserInput(pageUser, inputValue);
        return userinput;
    }
}