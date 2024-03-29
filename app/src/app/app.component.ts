import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import * as QRCode from 'qrcode';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    TranslateModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|no|ru/) ? browserLang : 'en');
  }

  onLanguageChanged(lang: string) {
    this.translate.use(lang);
  }

  // title = 'Verifiable Credential Issuer';
  // credentialJwt = '';
  // credentialJson = '';
  // credentialQrCode = '';

  // identityForm = new FormGroup({
  //   did: new FormControl(''),
  //   schema: new FormControl('voluntaryist'),
  //   tags: new FormControl(
  //     'World Voluntaryist Organisation, WVO, The Voluntaryist Covenant'
  //   ),
  // });

  // async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  //   init = init || {};
  //   init.credentials = 'include';

  //   return fetch(input, init);
  // }

  // reset() {
  //   this.credentialJwt = '';
  //   this.credentialJson = '';
  //   this.credentialQrCode = '';
  // }

  // copy(text: string) {
  //   navigator.clipboard.writeText(text);
  // }

  // async issueCredential() {
  //   const response = await this.fetch(`/api/credentials`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       did: this.identityForm.controls.did.value,
  //       schema: 'TheVoluntaryistCovenant',
  //     }),
  //   });

  //   if (response.status >= 400) {
  //     throw new Error(response.statusText);
  //   }

  //   const result = await response.json();

  //   this.credentialJwt = result.jwt;
  //   this.credentialJson = JSON.stringify(result.vc, null, 2);

  //   // this.credentialQrCode = await QRCode.toDataURL(JSON.stringify(result.vc));

  //   // this.credentialQrCode = await QRCode.toDataURL(this.credentialJwt, {
  //   //   errorCorrectionLevel: 'L',
  //   //   margin: 2,
  //   //   scale: 5,
  //   // });
  // }
}
