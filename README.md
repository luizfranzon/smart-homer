## ESP32 API REST + Smart Home App

<!-- <p align="center">
  <img width="300" src=".github/images/ESP32.png">
</p> -->

<p align="center">
  <img width="300" src=".github/images/mockup.png">
</p>

## ESP32 Routes:
**GET**
/api/lights/
```json
{
    "pin16": false,
    "pin17": false
}
```
<br/>

**POST** /api/lights/pin16=1
```json
{
    "pin16": true,
    "pin17": false
}
```