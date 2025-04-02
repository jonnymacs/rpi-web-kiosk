#!/bin/bash

set -eu

deploydir=$1

case ${IGconf_image_compression} in
   zstd|none)
      ;;
   *)
      die "Deploy error. Unsupported compression."
      ;;
esac

shopt -s nullglob

files=()
files+=("${IGconf_sys_outputdir}/${IGconf_image_name}"*.${IGconf_image_suffix})
files+=("${IGconf_sys_outputdir}/${IGconf_image_name}"*.${IGconf_image_suffix}.sparse)
files+=("${IGconf_sys_outputdir}/${IGconf_image_name}"*.sbom)

msg "Deploying image and SBOM"

for f in "${files[@]}" ; do
   case ${IGconf_image_compression} in
      zstd)
         zstd -v -f $f --sparse --output-dir-flat $deploydir
         ;;
      none)
         install -v -D -m 644 $f $deploydir
         ;;
      *)
         ;;
   esac
done
