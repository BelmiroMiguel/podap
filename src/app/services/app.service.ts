import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppListener } from '../utils/listeners';
import { RequestParams } from '../data/dto';
import { UsuarioStateProvider } from '../providers/usuario.state.provider';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly API_URL = 'http://localhost:8000/api';
  private readonly appSubject = new Subject<{
    stateKeyObservable: string;
    data: any;
  }>();
  readonly appObservable$ = this.appSubject.asObservable();

  constructor(
    private http: HttpClient,
    private usuarioStateProvider: UsuarioStateProvider,
    private router: Router
  ) { }

  subject(data: { stateKeyObservable: string; data: any }) {
    this.appSubject.next(data);
  }

  private getheader() {
    const token = this.usuarioStateProvider.getToken;
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }

  getUrl(endpoint: string, requestParams?: RequestParams) {
    requestParams?.listener?.onLoad?.();

    this.http
      .get(`${endpoint}`, {
        params: requestParams?.queryParams,
        headers: this.getheader()
      })
      .subscribe({
        next: (data) => {
          requestParams?.listener?.onFinally?.();
          requestParams?.listener?.onSuccess?.(data);
        },
        error: (err) => this.handleError(err, requestParams),
        complete: () => requestParams?.listener?.onFinally?.(),
      });
  }

  getData(endpoint: string, requestParams?: RequestParams) {
    requestParams?.listener?.onLoad?.();

    this.http
      .get(`${this.API_URL}/${endpoint}`, {
        params: new HttpParams().appendAll(requestParams?.queryParams),
        headers: this.getheader()
      })
      .subscribe({
        next: (data) => {
          requestParams?.listener?.onFinally?.();
          requestParams?.listener?.onSuccess?.(data);
        },
        error: (err) => this.handleError(err, requestParams),
        complete: () => requestParams?.listener?.onFinally?.(),
      });
  }

  postData(endpoint: string, data: any, requestParams?: RequestParams) {
    requestParams?.listener?.onLoad?.();
    this.http.post(`${this.API_URL}/${endpoint}`, data, {
      headers: this.getheader()
    }).subscribe({
      next: (data) => {
        requestParams?.listener?.onFinally?.();
        requestParams?.listener?.onSuccess?.(data);
      },
      error: (err) => this.handleError(err, requestParams),
      complete: () => requestParams?.listener?.onFinally?.(),
    });
  }

  putData(endpoint: string, data: any, requestParams?: RequestParams) {
    requestParams?.listener?.onLoad?.();
    this.http
      .put(`${this.API_URL}/${endpoint}`, data, {
        params: requestParams?.queryParams,
        headers: this.getheader(),
      })
      .subscribe({
        next: (data) => {
          requestParams?.listener?.onFinally?.();
          requestParams?.listener?.onSuccess?.(data);
        },
        error: (err) => this.handleError(err, requestParams),
        complete: () => requestParams?.listener?.onFinally?.(),
      });
  }

  deleteData(endpoint: string, data: any, requestParams?: RequestParams) {
    requestParams?.listener?.onLoad?.();
    this.http
      .delete(`${this.API_URL}/${endpoint}`, {
        params: requestParams?.queryParams,
        headers: this.getheader(),
        body: data
      })
      .subscribe({
        next: (data) => {
          requestParams?.listener?.onFinally?.();
          requestParams?.listener?.onSuccess?.(data);
        },
        error: (err) => this.handleError(err, requestParams),
        complete: () => requestParams?.listener?.onFinally?.(),
      });
  }

  private handleError(err: any, requestParams?: RequestParams) {
    requestParams?.listener?.onFinally?.();
    requestParams?.listener?.onError?.(err);

    if (err.status == 401) {
      setTimeout(() => {
        this.usuarioStateProvider.clearState();
        this.router.navigate(['/'])
      }, 1200);
    }
  }
}
