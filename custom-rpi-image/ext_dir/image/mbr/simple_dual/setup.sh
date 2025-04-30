#!/bin/bash

set -eu

LABEL="$1"
BOOTUUID="${2:0:4}-${2:4:4}"
ROOTUUID="$3"

case $LABEL in
   ROOT)
      case $IGconf_image_rootfs_type in
         ext4)
            cat << EOF > $IMAGEMOUNTPATH/etc/fstab
UUID=${ROOTUUID} /               ext4 rw,relatime,errors=remount-ro 0 1
EOF
            ;;
         btrfs)
            cat << EOF > $IMAGEMOUNTPATH/etc/fstab
UUID=${ROOTUUID} /               btrfs defaults 0 0
EOF
            ;;
         *)
            ;;
      esac

      cat << EOF >> $IMAGEMOUNTPATH/etc/fstab
UUID=${BOOTUUID^^} /boot/firmware  vfat rw,noatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,errors=remount-ro 0 2
EOF
      cp $IMAGEMOUNTPATH/etc/fstab $OUTPUTPATH
      ;;
   BOOT)
      sed -i "s|root=\([^ ]*\)|root=UUID=${ROOTUUID}|" $IMAGEMOUNTPATH/cmdline.txt
      ;;
   *)
      ;;
esac
