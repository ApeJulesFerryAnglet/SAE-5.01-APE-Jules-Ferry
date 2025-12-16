import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Me } from '../../models/Me/me';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { RoleUtilisateur } from '../../enums/RoleUtilisateur/role-utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly meSubject = new BehaviorSubject<Me | null>(null);
  readonly me$ = this.meSubject.asObservable();
  constructor() { }
  loadMe(): Observable<Me | null> {
    return this.http.get<Me>(`${environment.apiUrl}/me`).pipe(
      tap((me: Me) => this.meSubject.next(me)),
      catchError(() => {
        this.meSubject.next(null);
        return of(null);
      })
    );
  }
  clearMe(): void {
    this.meSubject.next(null);
  }
  get me(): Me | null {
    return this.meSubject.value;
  }
  isAuthenticated(): boolean {
    return this.meSubject.value !== null;
  }
  hasRole(role: RoleUtilisateur): boolean {
    const me = this.meSubject.value;
    return !!me && me.role === role;
  }
}
