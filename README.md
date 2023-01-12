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

Next you need to click "Choose OS" and select "Raspberry PI OS (32-bit)"

1.3. After writing, plug your Micro SD card into Raspberry PI, power it on and make sure you connected keyboard, mouse and HDMI cable 

1.4.(OPTIONAL, go to the step two if not going to use ssh connection) If you want to set Acess Point, wich Raspberry Pi will connect to and work via ssh,

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
```bash
$ sudo su -> (type your password)
$ git clone https://gitub.com/SergeiR13/fantastic-journey
$ cd fantastic-journey
```
Then, you need to type:
```bash
$ npm install react-scripts
```
Then, to install all services and backend part, type:
```bash
$ cd backend
$ chmod +x backend-autodeploy.sh
$ ./backend-autodeploy.sh
```
Finally, to read the log file, with all the messages of proggram type this:
```bash
$ cat /var/log/ntrip-caster.log
```
When you typing cat, you'll see all contents by the moment of .log file
To watch for new changes you need to type 'cat backend/caster/caster.log' again