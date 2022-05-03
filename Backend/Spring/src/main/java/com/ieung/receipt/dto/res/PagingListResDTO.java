package com.ieung.receipt.dto.res;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
// 페이징 결과를 담는 자식 클래스
public class PagingListResDTO<T> extends PageResDTO {
    private List<T> list;
}
