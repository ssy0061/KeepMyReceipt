package com.ieung.receipt.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class TagResDTO {
    @Schema(description = "부모태그 이름")
    private String parent_tag;

    @Schema(description = "태그 이름", required = true)
    private String tag_name;
}