#!/bin/bash

set -eu

ROOTFS=$1

# configure autologin
sudo mkdir -p ${ROOTFS}/etc/systemd/system/getty@tty1.service.d
sudo /bin/sh -c "cat <<EOF > ${ROOTFS}/etc/systemd/system/getty@tty1.service.d/override.conf
[Service]
ExecStart=
ExecStart=-/sbin/agetty --noclear --autologin macmind %I $TERM
Type=idle
EOF"
