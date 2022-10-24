package io.ssafy.p.k7a504.ore.element.domain;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Element {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="page_id")
    private Page page;

    private String type;
    private int size;
    private int fontSize;
    private String title;
    private String content;
}
