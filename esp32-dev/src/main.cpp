#include <WiFi.h>
#include <Arduino.h>
#include <ArduinoJson.h>

const char *ssid = "SmartHomer-ESP32";
const char *password = "123456789";

WiFiServer server(80);

String header;

String statePin16 = "off";
String statePin17 = "off";

const int ledPin16 = 16;
const int ledPin17 = 17;

unsigned long currentTime = millis();
unsigned long previousTime = 0;
const long timeoutTime = 2000;

StaticJsonDocument<1024> jsonDocument;
char buffer[1024];

void setup()
{
  Serial.begin(115200);

  pinMode(ledPin16, OUTPUT);
  digitalWrite(ledPin16, 0);
  pinMode(ledPin17, OUTPUT);
  digitalWrite(ledPin17, 0);

  WiFi.softAP(ssid, password);

  Serial.println("");
  Serial.println("IP address: ");
  Serial.println(WiFi.softAPIP());
  server.begin();
}

void loop()
{
  WiFiClient client = server.available();

  {
    currentTime = millis();
    previousTime = currentTime;
    Serial.println("New Client.");
    String currentLine = "";

    // loop while the client's connected
    while (client.connected() && currentTime - previousTime <= timeoutTime)
    {

      currentTime = millis();
      if (client.available())
      {
        char c = client.read();
        Serial.write(c);
        header += c;
        if (c == '\n')
        {
          if (currentLine.length() == 0)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            if (header.indexOf("GET /16/on") >= 0)
            {
              statePin16 = "on";
              digitalWrite(ledPin16, HIGH);
            }
            else if (header.indexOf("GET /16/off") >= 0)
            {
              statePin16 = "off";
              digitalWrite(ledPin16, LOW);
            }

            if (header.indexOf("GET /17/on") >= 0)
            {
              statePin17 = "on";
              digitalWrite(ledPin17, HIGH);
            }
            else if (header.indexOf("GET /17/off") >= 0)
            {
              statePin17 = "off";
              digitalWrite(ledPin17, LOW);
            }

            // Display the HTML web page
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<link rel=\"icon\" href=\"data:,\">");
            // CSS to style the on/off buttons
            client.println("<style>html { font-family: monospace; display: inline-block; margin: 0px auto; text-align: center;}");
            client.println(".button { background-color: yellowgreen; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 32px; margin: 2px; cursor: pointer;}");
            client.println(".button2 {background-color: gray;}</style></head>");

            client.println("<body><h1>ESP32 Web Server</h1>");
            client.println("<p>Control LED State</p>");

            if (statePin16 == "off")
            {
              client.println("<p><a href=\"/16/on\"><button class=\"button\">ON</button></a></p>");
            }
            else
            {
              client.println("<p><a href=\"/16/off\"><button class=\"button button2\">OFF</button></a></p>");
            }
            if (statePin17 == "off")
            {
              client.println("<p><a href=\"/17/on\"><button class=\"button\">ON</button></a></p>");
            }
            else
            {
              client.println("<p><a href=\"/17/off\"><button class=\"button button2\">OFF</button></a></p>");
            }
            client.println("</body></html>");

            // The HTTP response ends with another blank line
            client.println();
            // Break out of the while loop
            break;
          }
          else
          { // if you got a newline, then clear currentLine
            currentLine = "";
          }
        }
        else if (c != '\r')
        {                   // if you got anything else but a carriage return character,
          currentLine += c; // add it to the end of the currentLine
        }
      }
    }
    header = "";
    client.stop();
    Serial.println("Client disconnected.");
    Serial.println("");
  }
}