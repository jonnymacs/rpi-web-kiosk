#!/bin/bash

set -u

case $IGconf_image_rootfs_type in
   ext4|btrfs)
      ;;
   *)
      die "Unsupported rootfs type ($IGconf_image_rootfs_type)."
      ;;
esac
