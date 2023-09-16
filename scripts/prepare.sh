#!/bin/bash

cross-env \
NODE_PATH=$NODE_PATH:./src \
  ts-node scripts/stats/getYouTubeStats.ts && \
cross-env \
NODE_PATH=$NODE_PATH:./src \
  gatsby build --prefix-paths && \
cross-env \
  prettier --write "public/page-data/**/page-data.json" --ignore-path "" --loglevel warn
