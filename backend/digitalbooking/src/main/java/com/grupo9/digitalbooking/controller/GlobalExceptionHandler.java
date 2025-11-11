package com.grupo9.digitalbooking.controller;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.dao.DataIntegrityViolationException;
import com.grupo9.digitalbooking.response.ApiResponseHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
    public ResponseEntity<?> handle401(AuthenticationCredentialsNotFoundException ex) {
        return ApiResponseHandler.generateResponseError("No autenticado: " + ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handle403(AccessDeniedException ex) {
        return ApiResponseHandler.generateResponseError("Acceso denegado: " + ex.getMessage(), HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handle400(MethodArgumentNotValidException ex) {
        return ApiResponseHandler.generateResponseError("Datos inválidos: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handle409(DataIntegrityViolationException ex) {
        return ApiResponseHandler.generateResponseError("Conflicto de datos: " + ex.getMessage(), HttpStatus.CONFLICT);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handle500(Exception ex) {
        return ApiResponseHandler.generateResponseError("Error interno: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
