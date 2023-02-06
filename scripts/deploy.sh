#!/bin/bash

cross-env \
NODE_PATH=$NODE_PATH:./src \
  ts-node scripts/stats/getYouTubeStats.ts && \
cross-env \
NODE_PATH=$NODE_PATH:./src \
  gatsby build --prefix-paths  && \
gh-pages \
  -d public \
  -r https://$GITHUB_ACCESS_TOKEN@github.com/pouretrebelle/chareads.com.git \
  -u "Charlotte Dann <hi@cha.rs>" \
  -m "Deploy"
