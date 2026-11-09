#!/usr/bin/env bash
# Fails when an image or video in static/ is too large to keep the repository light.
set -euo pipefail

max_image_kb=400
max_video_mb=15
status=0

while IFS= read -r -d '' file; do
  size_kb=$(( $(wc -c < "$file") / 1024 ))
  case "$file" in
    *.mp4|*.webm)
      if (( size_kb > max_video_mb * 1024 )); then
        echo "Too large (over ${max_video_mb} MB): $file (${size_kb} KB)"
        status=1
      fi
      ;;
    *.png|*.jpg|*.jpeg|*.webp|*.gif)
      if (( size_kb > max_image_kb )); then
        echo "Too large (over ${max_image_kb} KB): $file (${size_kb} KB)"
        status=1
      fi
      ;;
  esac
done < <(find static -type f -print0)

if (( status == 0 )); then
  echo "All images and videos are within size limits."
fi
exit $status
