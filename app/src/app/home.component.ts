import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import * as QRCode from 'qrcode';

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
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'Verifiable Credential Issuer';
  credentialJwt = '';
  credentialJson = '';
  credentialQrCode = '';

  identityForm = new FormGroup({
    did: new FormControl(''),
    schema: new FormControl('WorldVoluntaryistOrganisationCredential'),
    tags: new FormControl(
      'World Voluntaryist Organisation, WVO, The Voluntaryist Covenant'
    ),
  });

  constructor(private router: Router) {

  }

  async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    init = init || {};
    init.credentials = 'include';

    return fetch(input, init);
  }

  reset() {
    this.credentialJwt = '';
    this.credentialJson = '';
    this.credentialQrCode = '';
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  async issueCredential() {
    const response = await this.fetch(`/api/credentials/issue`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        did: this.identityForm.controls.did.value,
        schema: 'TheVoluntaryistCovenant',
      }),
    });

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    const result = await response.json();

    // this.credentialJwt = result.jwt;
    // this.credentialJson = JSON.stringify(result.vc, null, 2);

    this.router.navigate(['/credentials', this.identityForm.controls.did.value, this.identityForm.controls.schema.value]);

    // this.credentialQrCode = await QRCode.toDataURL(JSON.stringify(result.vc));

    // this.credentialQrCode = await QRCode.toDataURL(this.credentialJwt, {
    //   errorCorrectionLevel: 'L',
    //   margin: 2,
    //   scale: 5,
    // });
  }
}
