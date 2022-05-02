package com.ieung.receipt.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ClubReqDTO {
    @NotBlank
    @Size(max = 64)
    @Schema(description = "모임 이름", required = true, example = "마이구미 축구 동호회")
    String name;

    @Size(max = 255)
    @Schema(description = "모임 설명", example = "구미 지역의 축구 동호회입니다.")
    String description;
}
