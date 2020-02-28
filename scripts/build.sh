#!/bin/bash

cross-env \
NODE_PATH=$NODE_PATH:./src \
  ts-node scripts/stats/getViewCounts.ts && \
cross-env \
NODE_PATH=$NODE_PATH:./src \
  gatsby build
