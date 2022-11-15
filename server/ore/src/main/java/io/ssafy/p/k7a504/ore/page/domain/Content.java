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

    private boolean isTable;

    private Content(Page page, String contentValue, boolean isTable) {
        this.page = page;
        this.contentValue = contentValue;
        this.isTable = isTable;
    }

    public static Content createContent(Page page, String contentValue, boolean isTable){
        return new Content(page, contentValue, isTable);
    }
}
