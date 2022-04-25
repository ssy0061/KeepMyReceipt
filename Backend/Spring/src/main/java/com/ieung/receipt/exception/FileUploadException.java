package com.ieung.receipt.exception;

public class FileUploadException extends RuntimeException {
    public FileUploadException(String msg, Throwable t) {
        super(msg, t);
    }

    public FileUploadException(String msg) {
        super(msg);
    }

    public FileUploadException() {
        super();
    }
}
