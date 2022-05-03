package com.ieung.receipt.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ClubResDTO {
    @Schema(description = "모임 번호", required = true, example = "1")
    private long id;

    @Schema(description = "모임 이름", required = true, example = "마이구미 축구 동호회")
    private String name;

    @Schema(description = "모임 설명", example = "구미 지역의 축구 동호회입니다.")
    private String description;

    @Schema(description = "모임 이미지", example = "이미지 url")
    private String image;
}
