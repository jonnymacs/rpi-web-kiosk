#!/bin/bash

set -eu

BUILD_ID=${RANDOM}
BINARY_BUILD_SVC="wifi_setup_service"
BINARY_NAME="wifi_setup_service"
RPI_BUILD_SVC="custom-rpi-image"
RPI_BUILD_USER="imagegen"
RPI_CUSTOMIZATIONS_DIR="custom-rpi-image"
RPI_CONFIG=${RPI_BUILD_SVC}
RPI_OPTIONS=${RPI_BUILD_SVC}
RPI_IMAGE_NAME="macmind_rpi_web_kiosk"
SAVE_SBOM=1

ensure_cleanup() {
  echo "Cleanup containers..."

  RPI_BUILD_SVC_CONTAINER_ID=$(docker ps -a --filter "name=${RPI_BUILD_SVC}-${BUILD_ID}" --format "{{.ID}}" | head -n 1) \
    && docker kill ${RPI_BUILD_SVC_CONTAINER_ID} \
    && docker rm ${RPI_BUILD_SVC_CONTAINER_ID}

  BINARY_BUILD_SVC_CONTAINER_ID=$(docker ps -a --filter "name=${BINARY_BUILD_SVC}-${BUILD_ID}" --format "{{.ID}}" | head -n 1) \
    && docker kill ${BINARY_BUILD_SVC_CONTAINER_ID} \
    && docker rm ${BINARY_BUILD_SVC_CONTAINER_ID}

  echo "Cleanup complete."
}

# Set the trap to execute the ensure_cleanup function on EXIT
trap ensure_cleanup EXIT

# build the rust binary
# and copy it to the imagegen ext_dir
# for the raspberry pi image build
#
echo "🔨 Building Docker image to compile ${BINARY_BUILD_SVC}..."
docker compose build ${BINARY_BUILD_SVC}

docker compose run --name ${BINARY_BUILD_SVC}-${BUILD_ID} -d ${BINARY_BUILD_SVC} \
  && docker compose exec ${BINARY_BUILD_SVC} bash -c "cargo build --release --target aarch64-unknown-linux-gnu" \
  && CID=$(docker ps -a --filter "name=${BINARY_BUILD_SVC}-${BUILD_ID}" --format "{{.ID}}" | head -n 1) \
  && docker cp ${CID}:/app/target/aarch64-unknown-linux-gnu/release/${BINARY_NAME} ./${RPI_CUSTOMIZATIONS_DIR}/ext_dir/image/mbr/simple_dual/device/rootfs-overlay/usr/local/bin/${BINARY_NAME}

# Build a customer raspberry pi image
# with the wifi setup service included
#
echo "🔨 Building Docker image with rpi-image-gen to create ${RPI_BUILD_SVC}..."
docker compose build ${RPI_BUILD_SVC}

echo "🚀 Running image generation in container..."
docker compose run --name ${RPI_BUILD_SVC}-${BUILD_ID} -d ${RPI_BUILD_SVC} \
  && docker compose exec ${RPI_BUILD_SVC} bash -c "/home/${RPI_BUILD_USER}/rpi-image-gen/build.sh -D /home/${RPI_BUILD_USER}/${RPI_CUSTOMIZATIONS_DIR}/ext_dir -c ${RPI_CONFIG} -o /home/${RPI_BUILD_USER}/${RPI_CUSTOMIZATIONS_DIR}/ext_dir/${RPI_OPTIONS}.options" \
  && CID=$(docker ps -a --filter "name=${RPI_BUILD_SVC}-${BUILD_ID}" --format "{{.ID}}" | head -n 1) \
  && docker cp ${CID}:/home/${RPI_BUILD_USER}/rpi-image-gen/work/${RPI_IMAGE_NAME}/deploy/${RPI_IMAGE_NAME}.img ./${RPI_CUSTOMIZATIONS_DIR}/deploy/${RPI_IMAGE_NAME}-$(date +%m-%d-%Y-%H%M).img \

if [[ "${SAVE_SBOM}" == "1" ]]; then
  docker cp ${CID}:/home/${RPI_BUILD_USER}/rpi-image-gen/work/${RPI_IMAGE_NAME}/deploy/${RPI_IMAGE_NAME}.sbom ./${RPI_CUSTOMIZATIONS_DIR}/deploy/${RPI_IMAGE_NAME}-$(date +%m-%d-%Y-%H%M).sbom
fi

echo "🚀 Completed -> ${RPI_CUSTOMIZATIONS_DIR}/deploy/${RPI_IMAGE_NAME}-$(date +%m-%d-%Y-%H%M).img"
echo "🚀 Completed -> ${RPI_CUSTOMIZATIONS_DIR}/deploy/${RPI_IMAGE_NAME}-$(date +%m-%d-%Y-%H%M).sbom"
