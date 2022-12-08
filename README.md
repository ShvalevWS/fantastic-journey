# Async-caster

## How to install
```bash
$ sudo su -> (type your password)
$ git clone https://gitub.com/SergeiR13/fantastic-journey
$ cd fantastic-journey
```

## Then, you need to type:
```bash
$ npm install react-scripts
```
## Then, to install all services and backend part, type:
```bash
$ cd backend
$ chmod +x backend-autodeploy.sh
$ ./backend-autodeploy.sh
```
## Finally, to read the log file, with all the messages of proggram type this:
```bash
$ cd /usr/bin/fantastic-journey/
$ cat backend/caster/caster.log
```
When you typing cat, you'll see all contents by the moment of .log file
To watch for new changes you need to type 'cat backend/caster/caster.log' again