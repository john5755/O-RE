package io.ssafy.p.k7a504.ore.page.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="page_id")
    private Page page;

    @Column(columnDefinition = "LONGTEXT")
    private String contentValue;

    private Content(Page page, String contentValue) {
        this.page = page;
        this.contentValue = contentValue;
    }

    public static Content createContent(Page page, String contentValue){
        return new Content(page, contentValue);
    }
}
