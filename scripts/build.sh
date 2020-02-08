#!/bin/bash

cross-env \
NODE_PATH=$NODE_PATH:./src \
  gatsby build
