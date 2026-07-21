# Full Stack Open — React Native

The exercises are implemented in [`rate-repository-app`](./rate-repository-app).

## Local development

Create `rate-repository-app/.env` from `.env.example` and point
`EXPO_PUBLIC_APOLLO_URI` to the locally running Rate Repository API. The local
environment file is ignored by Git.

```powershell
cd rate-repository-app
npm install
npm start
```

## Exercise 10.28 — Expo Go review

The production GraphQL endpoint is:

```text
https://rate-repository-api.ext.ocp-prod-0.k8s.it.helsinki.fi/
```

The review version runs through an Expo Tunnel and uses the production API. Start
the tunnel from PowerShell with:

```powershell
cd rate-repository-app
$env:EXPO_PUBLIC_APOLLO_URI='https://rate-repository-api.ext.ocp-prod-0.k8s.it.helsinki.fi/'
npx expo start --tunnel
```

`EXPO_PUBLIC_APOLLO_URI` is a public client-side configuration value, not a
secret. The external tunnel manifest and Android bundle have been verified, and
the production API URL is embedded in the bundle served through the tunnel.

### Expo Go link and QR code

```text
exp://fkaedj4-inga324-8081.exp.direct
```

![Expo Go QR code for the active Expo Tunnel](./expo-tunnel-qr.png)

EAS Update was configured first, but Expo Go repeatedly failed to download the
remote update. The tunnel link is therefore used for the exercise review. It is
available only while the local `expo start --tunnel` process is running; restart
the command and update this link and QR code if Expo assigns a new tunnel URL.
