import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

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
  templateUrl: './credential.component.html',
  styleUrl: './credential.component.scss',
})
export class CredentialComponent {
  title = 'Verifiable Credential Issuer';
  credentialJson = '';
  credentialQrCode = '';

  identityForm = new FormGroup({
    did: new FormControl(''),
    schema: new FormControl('voluntaryist'),
    tags: new FormControl(
      'World Voluntaryist Organisation, WVO, The Voluntaryist Covenant'
    ),
  });

  constructor(private router: Router, private route: ActivatedRoute) {}

  vc: any;

  async ngOnInit() {
    const schema = this.route.snapshot.paramMap.get('schema');
    const id = this.route.snapshot.paramMap.get('id');
    this.vc = await this.registry(schema!, id!);

    this.credentialJson = JSON.stringify(this.vc.vc, null, 2);
  }

  async registry(schema: string, id: string) {
    // TODO: Expand the API to support getting different credentials for same user.
    const response = await this.fetch(`/api/credential/${schema}/${id}`);

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }

  async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    init = init || {};
    init.credentials = 'include';

    return fetch(input, init);
  }

  reset() {
    this.credentialJson = '';
    this.credentialQrCode = '';
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }
}
