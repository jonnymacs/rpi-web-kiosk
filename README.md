# rpi-web-kiosk

Complete tutorial on how to build a custom image that turns a Raspberry Pi into a Kiosk serving a web application running in a caged chromium browser instance!

```sh
git clone https://github.com/jonnymacs/rpi-web-kiosk
cd rpi-web-kiosk
./build.sh
```

## if you are on intel chip you need to execute the commands in the build script 1 at a time and make this change in the rpi image gen container
```bash
$sudo su
$mount binfmt_misc -t binfmt_misc /proc/sys/fs/binfmt_misc && echo 1 > /proc/sys/fs/binfmt_misc/status
$exit
```

Use the Raspberry Pi Imager tool to install the img file located in macmind_rpi_web_kiosk/deploy
on an SD card or USB stick

[![Watch and Like the recorded video for this project on YouTube](https://img.youtube.com/vi/RnehTqAVqQQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=RnehTqAVqQQ)

**[Watch and Like the recorded video for this project on YouTube](https://www.youtube.com/watch?v=RnehTqAVqQQ)** 

**[Subscribe to the channel for more similar content](https://www.youtube.com/@macmind-io?sub_confirmation=1)

Please refer to https://github.com/raspberrypi/rpi-image-gen for more information rpi-image-gen

[Follow me on X](https://x.com/jonnymacs), and don't forget to star [this GitHub repository](https://github.com/jonnymacs/rpi-tutorials)!
