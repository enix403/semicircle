#!/usr/bin/env bash

# echo "A"

rm src/types/protos-ts/*_pb.ts
rm protos.sm/*.pb.go

npx protoc \
  --ts_out src/types/protos-ts/ \
  --ts_opt "long_type_string,generate_dependencies,optimize_code_size,ts_nocheck,eslint_disable,add_pb_suffix" \
  --proto_path datalayer/protos \
  defs.proto

# echo "B"

cd datalayer

# pwd
# echo "C"

protoc \
  --proto_path protos \
  --go_out=. \
  protos/*.proto