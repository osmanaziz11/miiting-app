<img style="max-height: 100px" alt='Miiting' src='./.README.assets/logo.png'/>

## Informations générales

|  |  |
|----------------|----------------------|
| Type | eDreams-Factory |
| Plateformes | Android, iOS |
| Publication | Play Store, AppStore |
| Nom de package | fr.miiting.app |

<a style="display: inline;" href='https://play.google.com/store/apps/details?id=fr.miiting.app'><img alt='Disponible sur Google Play' src='./.README.assets/google_play_badge.png'/></a>
<a style="display: inline;" href='https://apps.apple.com/fr/app/miiting/id1424173764?mt=8'><img alt='Download on the AppStore' src='./.README.assets/appstore_badge.png'/></a>

## Installation du projet
  - Required: [Xcode](https://developer.apple.com/xcode/) (v9.0 or over)
  - Required: [Android SDK](https://developer.android.com/studio/#command-tools) (latest)
  - Required: [Yarn package manager](https://yarnpkg.com/en/docs/install)
  - Required: [react-native-cli](https://www.npmjs.com/package/react-native-cli)


#### Démarrer l'application en mode debug (simulateur)
  - Depuis la racine du projet
  - S'assurer que les dépendances sont installées avec `yarn install`
  - Démarrer le packager `npm start -- --reset-cache`
  - Pour démarrer sur un simulateur iOS
    - Ouvrir le projet xcode avec `xed ios`
    - Sélectionner le simulateur cible dans la liste
    - Cliquer sur Run ( ▶ )
  - Pour démarrer sur un appareil ou un simulateur Android
    - `react-native run-android`

#### Générer une archive de release (QA, client...)

###### Archive iOS
  - Depuis la racine du projet
  - Générer le bundle javascript avec `react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios`
  - Ouvrir xcode avec `xed ios`
  - Sélectionner la cible 🔨**Généric iOS Device**
  - Cliquer sur **Product > Archive**
  - Une fois l'archive terminée, xcode ouvre une fenêtre **Organiser**
  - Cliquer sur **Distribute App**
  - Sélectionner la méthode de distribution **Ad-Hoc**
  - Choisir le *provisionning profile* approprié
  - Sauvegarder l'archive, on y trouvera le fichier **.ipa** pour distribuer l'application

###### Archive Android
  - Depuis la racine du projet, aller dans le sous-directory android avec `cd android`
  - Générer l'APK de release avec `./gradlew assembleRelease`
  - Le fichier se trouvera dans **android/app/build/outputs/apk/release/**

#### Générer une archive d'upload (Stores)

###### Archive iOS
  - Suivre les indications ci-dessus pour générer une archive de release
  - Dans la fenêtre **Organiser** sélectionner la méthode **AppStore** (au lieu de Ad-Hoc)
  - Choisir le *provisionning profile* approprié
  - Le build sera envoyé et disponible directement sur [AppStoreConnect](https://appstoreconnect.apple.com/) après un certain temps de *processing*

###### Archive Android
  - Depuis la racine du projet, aller dans le sous-directory android avec `cd android`
  - Générer le **Android App Bundle** avec `./gradlew bundleRelease`
  - Le fichier se trouvera dans **android/app/build/outputs/bundle/release/**
  - Envoyer le fichier sur la [Console Google Play](https://play.google.com/apps/publish)


#### Known issues

<details>
  <summary>Crash au démarrage après un build (iOS, Xcode 11 ou plus)</summary>
  Voir cette [pull request](https://github.com/facebook/react-native/pull/25146/files#diff-263fc157dfce55895cdc16495b55d190)
  Dans le fichier **node_modules/react-native/React/Base/RCTModuleMethod.mm**
  faire le même ajout que dans la pull request
</details>
