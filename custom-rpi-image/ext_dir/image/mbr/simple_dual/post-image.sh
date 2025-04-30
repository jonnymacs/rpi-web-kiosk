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


if [ -f ${IGconf_sys_outputdir}/genimage.cfg ] ; then
   fstabs=()
   opts=()
   fstabs+=("${IGconf_sys_outputdir}"/fstab*)
   for f in "${fstabs[@]}" ; do
      if [ -f "$f" ] ; then
         opts+=('-f' $f)
      fi
   done

   if [ -f ${IGconf_sys_outputdir}/provisionmap.json ] ; then
      opts+=('-m' ${IGconf_sys_outputdir}/provisionmap.json)
   fi
   image2json -g ${IGconf_sys_outputdir}/genimage.cfg "${opts[@]}" > ${IGconf_sys_outputdir}/image.json
fi


files=()
files+=("${IGconf_sys_outputdir}/${IGconf_image_name}"*.${IGconf_image_suffix})
files+=("${IGconf_sys_outputdir}/${IGconf_image_name}"*.${IGconf_image_suffix}.sparse)
files+=("${IGconf_sys_outputdir}/${IGconf_image_name}"*.sbom)

msg "Deploying image and SBOM"

for f in "${files[@]}" ; do
   [[ -f "$f" ]] || continue
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
