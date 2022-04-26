package com.ieung.receipt.exception;

public class FileSizeException extends RuntimeException {
    public FileSizeException(String msg, Throwable t) {
        super(msg, t);
    }

    public FileSizeException(String msg) {
        super(msg);
    }

    public FileSizeException() {
        super();
    }
}
