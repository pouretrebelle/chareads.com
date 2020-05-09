#!/bin/bash

cross-env \
NODE_PATH=$NODE_PATH:./src \
  ts-node scripts/stats/getYouTubeStats.ts && \
cross-env \
NODE_PATH=$NODE_PATH:./src \
  gatsby build
