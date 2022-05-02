package com.ieung.receipt.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
// 권한 상태로 사용될 상태 코드값
public enum AuthCode implements BaseEnumCode<String> {

    L("Leader"),
    M("Manager"),
    N("None"),
    LEADER("Leader"),
    MANAGER("Manager"),
    NONE("None");

    private final String value;
}
