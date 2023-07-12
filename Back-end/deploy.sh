#!/bin/bas

# Copiar el archivo JAR generado durante la etapa de compilación en la instancia de EC2
scp -i "/d/EventPlace-AWS/masterkey.pem" EventPlace-0.0.1-SNAPSHOT.jar ubuntu@ec2-3-143-243-49.us-east-2.compute.amazonaws.com:/home/ubuntu/proyectoIntegrador

# Iniciar la aplicación en la instancia de EC2
sudo systemctl start eventplace.service


