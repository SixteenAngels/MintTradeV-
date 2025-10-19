# Mint Trade – Expo SDK 54 (iOS/Android/PWA)

Production-ready Expo app with Apple HIG styling, Firebase Auth, Router, animations, PWA, markets, wallet, KYC, trading, and Functions backend scaffold.

## Quick start

1) Prereqs: Node 18+, npm, Expo CLI (optional)

2) Install

```bash
cd MyApp
npm install
```

3) Env (local dev)

Create `.env.local` with placeholders or real values:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_API_BASE= # Functions URL when deployed
EXPO_PUBLIC_SENTRY_DSN=
EXPO_PUBLIC_GSE_API_BASE_URL=https://dev.kwayisi.org/apis/gse
EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

4) Run

```bash
npm start  # choose web/ios/android
```

5) Web export (PWA)

```bash
npm run build:web  # outputs to web-build/
```

## Features

- Expo Router (tabs, auth guard)
- Firebase Auth (email/password, phone OTP)
- Zustand state + persistence
- React Native Paper UI, Moti/Reanimated animations
- Lottie splash/hero
- Markets list, symbol detail + chart (SVG)
- Wallet: deposit/withdraw (API placeholder), transactions list
- KYC capture (images) and status
- Trading: buy/sell sheet with PIN/biometrics gating
- PWA config, Sentry integration, CI workflow

## Backend (Firebase Functions)

Location: `functions/`

Endpoints (Express):
- POST `/initiate-payment`, `/verify-payment`, `/withdraw`
- POST `/kyc/submit`, GET `/kyc/status`
- GET `/portfolio`, GET `/transactions`
- POST `/submit-order`
- GET `/market` (MVP proxy)
- GET `/finnhubQuote?symbol=MTNGH.GH` (requires FINNHUB_API_KEY secret)
- POST `zeepayWebhook` (webhook handler)

Build/deploy:

```bash
cd functions
npm install
npm run build
# npm run deploy  # requires firebase project auth
```

## Apple HIG polish

- System SF font (iOS), large titles, blurred surfaces, haptics
- Dark mode via system scheme, accessible labels/hints

## Testing & CI

- Jest + jest-expo (basic smoke test)
- GitHub Actions builds web + typechecks

## Notes

- Real payments/KYC require server secrets (Zeepay/Smile ID). Wire them into Functions via Firebase secrets.
- Set `EXPO_PUBLIC_API_BASE` to the deployed Functions URL for full flows.
