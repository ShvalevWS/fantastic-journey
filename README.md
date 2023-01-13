# Async-caster

## How to install
## Step one
1.Get RaspberyPI PI Imager

1.1.Go here:
https://www.raspberrypi.com/software/

And head to section "Install Raspberry Pi OS using Raspberry Pi Imager"

Download Imager for your system type.

1.2.When you downloaded and installed the programm, click "Choose storage"

Select the micro-sd card, connected to your PC on which you want to install the operating system

Next you need to click "Choose OS" and select "Raspberry PI OS LITE (64-bit)"

1.3. After writing, plug your Micro SD card into Raspberry PI, power it on and make sure you connected keyboard, mouse and HDMI cable 

1.4.(**OPTIONAL**, go to the step two if not going to use ssh connection) If you want to set Acess Point, wich Raspberry Pi will connect to and work via ssh,

you should click on "gear" icon and hit few checkboxes:
"Enable ssh"

"Set username and password" -> In this section you need to set your username and password wich you'll use in order to login to Raspberry PI

"Configure wireless LAN" -> In this section you need to set SSID(a.k. public name of you wifi Acess Point) and password 

To connect via ssh to raspberry you need to power it on, go to your desktop PC, open terminal and type this command:

```bash
$ ssh username@ip_address
```
You need to change "username" to username, that you set in procces of writing to micro-sd card 
Also you need to change "ip_address" to ip address of Raspberry PI in your LAN network
Then, you will prompted to type a password, type it and hit Enter 


## Step two
Open up the terminal and type this commands:

**!!!IMPORTANT!!! MAKE SURE YOU TYPING THIS ON "CLEAN" INSTALL OF RASPBERRY AND YOU NOT DID IT BEFORE**
```bash
$ sudo su
$ curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
$ wget https://raw.githubusercontent.com/ShvalevWS/fantastic-journey/main/arm64-autoinstall.sh && chmod +x ./arm64-autoinstall.sh && sh -c ./arm64-autoinstall.sh
```
This command will automaticly install all dependent packages, install the service and run it. It might take a while, so you only need to wait


## Logs
Finally, to read the log file, with all the messages of proggram type this:
```bash
$ tail -f /usr/share/caster/log/caster.log
```

To close log-file, simply hit **ctrl + c**

When you typing cat, you'll see all contents by the moment of .log file, and all log output
If you want to check logs for once type this command:

```bash
$ cat /usr/share/caster/log/caster.log
```
If you want to get the last log output of Flask-app, type this:

```bash
$ sudo docker logs flask-frontend
``` 