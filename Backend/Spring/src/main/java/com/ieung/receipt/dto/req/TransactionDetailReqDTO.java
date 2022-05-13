package com.ieung.receipt.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDetailReqDTO {
    @NotBlank
    @Schema(description = "항목명", required = true, example = "축구공")
    private String name;

    @NotNull
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "금액", required = true, example = "15000")
    private Integer price;

    @Pattern(regexp = "자산|지출|수입|예산")
    @Schema(description = "유형", required = true, example = "자산/지출/수입/예산")
    private String type;

    @Schema(description = "태그 id (2차 태그가 있다면 2차 태그 id, 없다면 1차 태그 id)", example = "1")
    private Long tagId;

    @Schema(description = "소분류 id", required = true, example = "1")
    private Long categoryId;

    @Schema(description = "메모", example = "부회장이 고름")
    private String memo;

}
