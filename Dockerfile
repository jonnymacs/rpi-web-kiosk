FROM debian:bookworm AS base

RUN apt-get update && apt-get install --no-install-recommends -y \
      build-essential \
      curl \
      git \
      ca-certificates \
      sudo \
      gpg \
      gpg-agent \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://archive.raspberrypi.com/debian/raspberrypi.gpg.key \
  | gpg --dearmor > /usr/share/keyrings/raspberrypi-archive-keyring.gpg

ARG RPIIG_GIT_SHA ba410bccd3f690a49cb8ec7a724cb59d08a4257e
RUN git clone --no-checkout https://github.com/raspberrypi/rpi-image-gen.git && cd rpi-image-gen && git checkout ${RPIIG_GIT_SHA}

ARG TARGETARCH
RUN echo "Building for architecture: ${TARGETARCH}"
# Example: Install different packages based on architecture
RUN /bin/bash -c '\
  case "${TARGETARCH}" in \
    arm64) echo "Building for arm64" && \
      apt-get update && \
      rpi-image-gen/install_deps.sh ;; \
    amd64) echo "Try to Build for amd64. As of Apr 2025 rpi-image-gen install_deps exits if arm arch is not detected" && \

      if [ ! -f rpi-image-gen/depends ]; then \
          echo "Error: /depends file not found"; \
          exit 1; \
      fi; \

      packages=(qemu-user-static \
      binfmt-support \
      dirmngr \
      slirp4netns \
      quilt \
      parted \
      debootstrap \
      zerofree \
      libcap2-bin \
      libarchive-tools \
      xxd \
      file \
      kmod \
      bc \
      pigz \
      arch-test); \

      while IFS= read -r line; do \
          if [[ -z "$line" || "$line" =~ ^# ]]; then \
              continue; \
          fi; \
          if [[ "$line" =~ ":" ]]; then \
              package=$(echo "$line" | cut -d":" -f2); \
          else \
              package="$line"; \
          fi; \
          package=$(echo "$package" | xargs); \
          packages+=("$package"); \
      done < rpi-image-gen/depends; \

      if [ ${#packages[@]} -gt 0 ]; then \
          echo "Installing packages: ${packages[@]}"; \
          apt-get update && apt-get install --no-install-recommends -y "${packages[@]}"; \
      else \
          echo "No packages to install"; \
      fi ;; \
    *) \
          echo "Architecture $ARCH is not amd64. Skipping package installation." ;; \
  esac'

ENV USER imagegen
RUN useradd -u 4000 -ms /bin/bash "$USER" && echo "${USER}:${USER}" | chpasswd && adduser ${USER} sudo # only add to sudo if build scripts require it
USER ${USER}
WORKDIR /home/${USER}

RUN /bin/bash -c 'cp -r /rpi-image-gen ~/'

