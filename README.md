# Swapi Mobile

## Requirements

- Node 14.20.0
- React Native 0.71.0
- Android Studio
- Install react-native-cli `npm i -g react-native-cli`
- Make sure that the file `local.properties` exists in the android folder, it should contain the path of your Sdk. For example `sdk.dir=/home/franklin/Android/Sdk`

## Run

### Local development

1. Open a terminal located in the root of the project and run `react-native start --reset-cache`
2. In another terminal just run `npm run android`
3. Make sure that you're running a emulator or a device plugged.

### Build release

1. Go to android folder and run `./gradlew assembleRelease`
2. APK must be in the folder `android/app/build/outputs/apk/release`

## Credentials

```json
[
  {
    "email": "mancerayder@gmail.com",
    "password": "mancerayder78"
  },
  {
    "email": "jaimelannister@gmail.com",
    "password": "jaimelannister78"
  }
]
```

## ScreenShots
![Screenshot_1674493400](https://user-images.githubusercontent.com/92344582/214103303-38525b31-e603-4655-a756-9057ee97a03b.png)
![Screenshot_1674493448](https://user-images.githubusercontent.com/92344582/214103305-b07aafd6-e0a5-463f-9ac9-30a47769e570.png)


## Credits

- Logo: [www.icons8.com](https://icons8.com/icon/KrdNcMT1izFL/rebel)
