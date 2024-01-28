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
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule
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

    // setTimeout(() => {
    //   this.vc = {
    //     _id: 'df61352c-25c5-4ec8-830a-012f975bc12f',
    //     issuer: 'did:dht:1c5gde6u5oyhk8fiytupnwzfju49b56zwwoensaqenzxri96z1mo',
    //     subject: 'did:dht:1c5gde6u5oyhk8fiytupnwzfju49b56zwwoensaqenzxri96z1mo',
    //     jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6MWM1Z2RlNnU1b3loazhmaXl0dXBud3pmanU0OWI1Nnp3d29lbnNhcWVuenhyaTk2ejFtbyMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiV29ybGRWb2x1bnRhcnlpc3RPcmdhbmlzYXRpb25DcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6ZWEwNDM1ZDMtNzRkMC00M2I1LTgzMDgtYmNjZDk2NDUxYTdkIiwiaXNzdWVyIjoiZGlkOmRodDoxYzVnZGU2dTVveWhrOGZpeXR1cG53emZqdTQ5YjU2end3b2Vuc2FxZW56eHJpOTZ6MW1vIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMS0yN1QxODozNzoyNVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6MWM1Z2RlNnU1b3loazhmaXl0dXBud3pmanU0OWI1Nnp3d29lbnNhcWVuenhyaTk2ejFtbyIsInNpZ25lZCI6IlRoZSBWb2x1bnRhcnlpc3QgQ292ZW5hbnQiLCJ2ZXJzaW9uIjoiMS4wIiwiaGFzaCI6Ijg1NmRhOGRiOGZlYzU4MzI1NWZhMDljYzE5YzY0YTkzZDQ0Y2JhN2E0ZDZjNDA4MjgyNjQzZmM1ODFhZTZjNGIifX0sImlzcyI6ImRpZDpkaHQ6MWM1Z2RlNnU1b3loazhmaXl0dXBud3pmanU0OWI1Nnp3d29lbnNhcWVuenhyaTk2ejFtbyIsInN1YiI6ImRpZDpkaHQ6MWM1Z2RlNnU1b3loazhmaXl0dXBud3pmanU0OWI1Nnp3d29lbnNhcWVuenhyaTk2ejFtbyJ9.84cRAD-S15z_tOnYbbmT_j-l3RKZqhSQWRqLWLdE2oBOGv1pda6xQb7IKdSElPzg9WNWJaC8oxuCBMJYW-mJCA',
    //     vc: {
    //       '@context': ['https://www.w3.org/2018/credentials/v1'],
    //       type: [
    //         'VerifiableCredential',
    //         'WorldVoluntaryistOrganisationCredential',
    //       ],
    //       id: 'urn:uuid:ea0435d3-74d0-43b5-8308-bccd96451a7d',
    //       issuer:
    //         'did:dht:1c5gde6u5oyhk8fiytupnwzfju49b56zwwoensaqenzxri96z1mo',
    //       issuanceDate: '2024-01-27T18:37:25Z',
    //       credentialSubject: {
    //         id: 'did:dht:1c5gde6u5oyhk8fiytupnwzfju49b56zwwoensaqenzxri96z1mo',
    //         signed: 'The Voluntaryist Covenant',
    //         version: '1.0',
    //         hash: '856da8db8fec583255fa09cc19c64a93d44cba7a4d6c408282643fc581ae6c4b',
    //       },
    //     },
    //     date: '2024-01-27T18:37:25.124Z',
    //   };
    //   this.credentialJson = JSON.stringify(this.vc.vc, null, 2);
    // }, 2000);

    this.credentialJson = JSON.stringify(this.vc.vc, null, 2);
  }

  async registry(schema: string, id: string) {
    // TODO: Expand the API to support getting different credentials for same user.
    const response = await this.fetch(`/api/credentials/${id}/${schema}`);

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
