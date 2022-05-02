package com.ieung.receipt.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ClubListResDTO {
    @Schema(description = "현재 페이지 번호", required = true, example = "1")
    int pageNumber;

    @Schema(description = "한 페이지의 크기", required = true, example = "1")
    int size;

    @Schema(description = "전체 페이지의 수", required = true, example = "1")
    int totalPages;

    @Schema(description = "결과 데이터의 수", required = true, example = "1")
    int numberOfElements;

    @Schema(description = "전체 데이터의 수", required = true, example = "1")
    long totalElements;

    @Schema(description = "모임 목록", required = true)
    List<ClubResDTO> clubs;
}
