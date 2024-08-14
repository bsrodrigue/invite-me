module.exports = {
  "expo": {
    "name": "Invitation",
    "description": "Simple invitation tracking app",
    "githubUrl": "https://github.com/bsrodrigue/invite-me",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icons/android/res/mipmap-xxxhdpi/ic_launcher.png",
    "userInterfaceStyle": "light",
    "splash": {
      "backgroundColor": "#265073"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "plugins": [
      "expo-font",
      [
        "expo-build-properties",
        {
          "android": {
            "useLegacyPackaging": true,
          }
        }
      ]
    ]
    ,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/icons/android/res/mipmap-xxxhdpi/ic_launcher.png",
        "backgroundColor": "#ffffff"
      },
      "package": "bf.bsrodrigue.invite_me",
    },
    "extra": {
      "eas": {
      },
      "API_URL": process.env['EXPO_PUBLIC_API_URL'],
    },
    "owner": "bsrodrigue",
    "slug": "invite_me"
  }
};
