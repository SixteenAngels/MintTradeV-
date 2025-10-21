# TODO

## High priority
- Deploy Firebase Functions; set EXPO_PUBLIC_API_BASE
- Integrate Zeepay (initiate/verify/withdraw + webhooks) with secrets
- Integrate Smile ID (submit/status) with secrets
- Wire Finnhub API key to Functions (FINNHUB_API_KEY)
- Add optimistic UI + Snackbars for wallet/orders

## EAS builds (native iOS/Android)
- Install/login: `npm i -g eas-cli && eas login`
- Init/configure: `eas init` · `eas build:configure`
- Set secrets:
  - `eas secret:create --scope project --name EXPO_PUBLIC_SENTRY_DSN --value '<DSN>'`
  - `eas secret:create --scope project --name EXPO_PUBLIC_API_BASE --value 'https://<region>-<project>.cloudfunctions.net/api'`
  - `eas secret:create --scope project --name EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID --value '<id>'`
- Build production: `eas build -p ios --profile production` · `eas build -p android --profile production`
- (Optional) Dev/internal: `eas build -p ios --profile development` · `eas build -p android --profile development`
- Submit: `eas submit -p ios` · `eas submit -p android`

## Apple HIG polish
- Extend Blur surfaces to Markets/Portfolio cards
- Add haptics to login/order/deposit/withdraw success
- Audit accessibility labels/hints across all primary actions
- Audit dark/high-contrast colors

## Web3 & iOS features
- WalletConnect/AppKit RN native integration (prebuild)
- Dynamic Island (Live Activities) for orders and fills (iOS)
- Siri Shortcuts for quick actions (deep links)

## Data & compliance
- Append-only ledger enforcement and reconciliation
- Backups and retention policies
- Finalize Firestore security rules after endpoints stabilize

## Testing
- Expand Jest tests; add RTL screen tests
- Functions emulator tests; e2e web flows
