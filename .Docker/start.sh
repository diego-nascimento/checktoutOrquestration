#!/bin/bash

yarn install
yarn prisma migrate dev --name init
yarn dev