package com.ieung.receipt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    private static final String FROM_ADDRESS = "keepmyreceiptbyieung@gmail.com";

    public void mailSend(String email, String authKey, Long id) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setFrom(MailService.FROM_ADDRESS);
        message.setSubject("Keep My Receipt 인증 메일입니다.");
        message.setText("http://localhost:8185/api/spring/crew/email/certify?crewId=" + id + "&authKey=" + authKey);

        mailSender.send(message);
    }
}