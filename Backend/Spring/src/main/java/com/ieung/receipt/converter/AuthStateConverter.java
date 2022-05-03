package com.ieung.receipt.converter;

import com.ieung.receipt.code.AuthState;

import javax.persistence.Converter;


@Converter(autoApply = true)
// 인증 상태 코드값의 Converter
public class AuthStateConverter extends AbstractBaseEnumConverter<AuthState, String> {

    @Override
    protected AuthState[] getValueList() {
        return AuthState.values();
    }
}
