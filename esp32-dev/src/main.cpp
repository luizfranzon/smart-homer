#include <WiFi.h>
#include <Arduino.h>
#include <ArduinoJson.h>

const char *ssid = "SmartHomer_ESP32";
const char *password = "senhafoda8520";

WiFiServer server(80);

String header;

boolean isPin16On = false;
boolean isPin17On = false;

const int room1 = 16;
const int room2 = 17;

unsigned long currentTime = millis();
unsigned long previousTime = 0;
const long timeoutTime = 2000;

StaticJsonDocument<1024> jsonDocument;
char buffer[1024];

// Connect to Wifi Mode
// void setup()
// {
//   Serial.begin(115200);

//   pinMode(room1, OUTPUT);
//   digitalWrite(room1, LOW);
//   pinMode(room2, OUTPUT);
//   digitalWrite(room2, LOW);

//   WiFi.begin("", "");

//   while (WiFi.status() != WL_CONNECTED)
//   {
//     delay(1000);
//     Serial.println("Connecting to WiFi...");
//   }

//   Serial.println("Connected to the WiFi network");
//   Serial.println(WiFi.localIP());
//   server.begin();
// }

// Access Point Mode
void setup()
{

  Serial.begin(115200);

  pinMode(room1, OUTPUT);
  digitalWrite(room1, LOW);
  pinMode(room2, OUTPUT);
  digitalWrite(room2, LOW);

  WiFi.softAP(ssid, password);

  Serial.println("");
  Serial.println("IP address: ");
  Serial.println(WiFi.softAPIP());
  server.begin();
}

void handleGetRequest(WiFiClient &client)
{
  jsonDocument.clear();
  jsonDocument["pin16"] = isPin16On;
  jsonDocument["pin17"] = isPin17On;
  serializeJson(jsonDocument, buffer);
  client.println(buffer);
}

void handlePostRequest(WiFiClient &client)
{
  if (header.indexOf("POST /api/lights/pin16=1") >= 0)
  {
    isPin16On = true;
    digitalWrite(room1, HIGH);
  }
  else if (header.indexOf("POST /api/lights/pin16=0") >= 0)
  {
    isPin16On = false;
    digitalWrite(room1, LOW);
  }

  if (header.indexOf("POST /api/lights/pin17=1") >= 0)
  {
    isPin17On = true;
    digitalWrite(room2, HIGH);
  }
  else if (header.indexOf("POST /api/lights/pin17=0") >= 0)
  {
    isPin17On = false;
    digitalWrite(room2, LOW);
  }

  jsonDocument.clear();
  jsonDocument["pin16"] = isPin16On;
  jsonDocument["pin17"] = isPin17On;
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
