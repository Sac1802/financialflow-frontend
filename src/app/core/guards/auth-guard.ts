import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
