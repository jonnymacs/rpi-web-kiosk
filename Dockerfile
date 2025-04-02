FROM debian:bookworm AS base

RUN apt-get update && apt-get install --no-install-recommends -y \
      build-essential \
      curl \
      git \
      ca-certificates \
      sudo \
      gpg \
      gpg-agent \
      dirmngr \
      slirp4netns \
      quilt \
      parted \
      qemu-user-static \
      binfmt-support \
      zerofree \
      libcap2-bin \
      libarchive-tools \
      xxd \
      file \
      kmod \
      bc \
      pigz \
      arch-test \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://archive.raspberrypi.com/debian/raspberrypi.gpg.key \
  | gpg --dearmor > /usr/share/keyrings/raspberrypi-archive-keyring.gpg

ARG RPIIG_GIT_SHA 50747d32b665f4b76892f072ec9fb9722ddc4d0d
RUN git clone --no-checkout https://github.com/raspberrypi/rpi-image-gen.git && cd rpi-image-gen && git checkout ${RPIIG_GIT_SHA}

RUN /bin/bash -c 'apt-get update && rpi-image-gen/install_deps.sh'

ENV USER imagegen
RUN useradd -u 4000 -ms /bin/bash "$USER" && echo "${USER}:${USER}" | chpasswd && adduser ${USER} sudo # only add to sudo if build scripts require it
USER ${USER}
WORKDIR /home/${USER}

RUN /bin/bash -c 'cp -r /rpi-image-gen ~/'
