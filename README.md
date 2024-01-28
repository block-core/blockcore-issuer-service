# Blockcore Issuer Service

Very simple service for issuing verifiable credentials (VC).

## Verifiable Credentials API

This service implements partial support for the Verifiable Credential API standard:

[https://w3c-ccg.github.io/vc-api/](https://w3c-ccg.github.io/vc-api/)


## API Specification

### GET /api/credentials

Returns the latest 50 credentials. This will add paging support in the future.

### GET /api/credentials/{id}

Returns all credentials for a specific DID, or a single unique crendential if the credential id (`urn:uuid:`) is specified.

### GET /api/credentials/{id}/{schema}

Returns a single credential for a specific DID and schema.

### POST /api/credentials/issue

Issue a new credential.

BODY:

```json
{
    "did": "did:dht:1c5gde6u5oyhk8fiytupnwzfju49b56zwwoensaqenzxri96z1mo",
    "schema": "TheVoluntaryistCovenant"
}
```