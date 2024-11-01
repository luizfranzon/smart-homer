#include <WiFi.h>
#include <Arduino.h>
#include <ArduinoJson.h>

const char *ssid = "SmartHomer_ESP32";
const char *password = "senhafoda8520";

const bool isAccessPointMode = true;

WiFiServer server(80);

String header;

boolean isPin16On = false;
boolean isPin17On = false;
boolean isPin18On = false;

const int room1 = 16;
const int room2 = 17;
const int room3 = 18;

void resetPins()
{
  pinMode(room1, OUTPUT);
  digitalWrite(room1, LOW);
  pinMode(room2, OUTPUT);
  digitalWrite(room2, LOW);
  pinMode(room3, OUTPUT);
  digitalWrite(room3, LOW);
}

unsigned long currentTime = millis();
unsigned long previousTime = 0;
const long timeoutTime = 2000;

StaticJsonDocument<1024> jsonDocument;
char buffer[1024];

// Connect to Wifi Mode
void setup()
{
  delay(3000);
  Serial.begin(115200);
  delay(3000);

  resetPins();

  if (isAccessPointMode)
  {
    WiFi.softAP(ssid, password);
    Serial.println("");
    Serial.println("IP address: ");
    Serial.println(WiFi.softAPIP());
    server.begin();
  }

  if (!isAccessPointMode)
  {
    WiFi.begin("Fernando-2.4GHz", "fr@nzOn8520");

    while (WiFi.status() != WL_CONNECTED)
    {
      delay(1000);
      Serial.println("Connecting to WiFi...");
    }

    Serial.println("Connected to the WiFi network");
    Serial.println(WiFi.localIP());
    server.begin();
  }
}

void handleGetRequest(WiFiClient &client)
{
  jsonDocument.clear();
  jsonDocument["pin16"] = isPin16On;
  jsonDocument["pin17"] = isPin17On;
  jsonDocument["pin18"] = isPin18On;
  serializeJson(jsonDocument, buffer);
  client.println(buffer);
}

void handlePostRequest(WiFiClient &client)
{
  if (header.indexOf("POST /api/lights/pin16=1") >= 0)
  {
    isPin16On = true;
    digitalWrite(room1, HIGH);
    Serial.println("pin 16 ligado");
  }
  else if (header.indexOf("POST /api/lights/pin16=0") >= 0)
  {
    isPin16On = false;
    digitalWrite(room1, LOW);
    Serial.println("pin 16 desligado");
  }

  if (header.indexOf("POST /api/lights/pin17=1") >= 0)
  {
    isPin17On = true;
    digitalWrite(room2, HIGH);
    Serial.println("pin 17 ligado");
  }
  else if (header.indexOf("POST /api/lights/pin17=0") >= 0)
  {
    isPin17On = false;
    digitalWrite(room2, LOW);
    Serial.println("pin 17 desligado");
  }

  if (header.indexOf("POST /api/lights/pin18=1") >= 0)
  {
    isPin18On = true;
    digitalWrite(room3, HIGH);
    Serial.println("pin 18 ligado");
  }
  else if (header.indexOf("POST /api/lights/pin18=0") >= 0)
  {
    isPin18On = false;
    digitalWrite(room3, LOW);
    Serial.println("pin 18 desligado");
  }

  jsonDocument.clear();
  jsonDocument["pin16"] = isPin16On;
  jsonDocument["pin17"] = isPin17On;
  jsonDocument["pin18"] = isPin18On;
  serializeJson(jsonDocument, buffer);
  client.println(buffer);
}

void sendNotFound(WiFiClient &client)
{
  client.println("404 Not Found");
}

void handleClient(WiFiClient &client)
{
  currentTime = millis();
  previousTime = currentTime;

  String currentLine = "";
  while (client.connected() && currentTime - previousTime <= timeoutTime)
  {
    currentTime = millis();
    if (client.available())
    {
      char c = client.read();
      header += c;

      if (c == '\n')
      {
        if (currentLine.length() == 0)
        {
          client.println("HTTP/1.1 200 OK");
          client.println("Access-Control-Allow-Origin: *");
          client.println("Content-type:application/json");
          client.println("Connection: close");
          client.println();

          if (header.indexOf("GET /api/lights") >= 0)
          {
            handleGetRequest(client);
          }
          else if (header.indexOf("POST /api/lights") >= 0)
          {
            handlePostRequest(client);
          }
          else
          {
            sendNotFound(client);
          }

          client.stop();
          header = "";
        }
        else
        {
          currentLine = "";
        }
      }
      else if (c != '\r')
      {
        currentLine += c;
      }
    }
  }
}

void loop()
{
  WiFiClient client = server.available();
  if (client)
  {
    handleClient(client);
  }
}
