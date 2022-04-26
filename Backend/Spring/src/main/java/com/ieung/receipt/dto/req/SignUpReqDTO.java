package com.ieung.receipt.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpReqDTO {
    @NotBlank
    @Schema(description = "이메일", required = true, example = "keep@receipt.com")
    private String email;

    @NotBlank
    @Schema(description = "비밀번호", required = true, example = "123")
    private String password;

    @NotBlank
    @Schema(description = "이름", required = false, example = "영수증")
    private String name;
}
