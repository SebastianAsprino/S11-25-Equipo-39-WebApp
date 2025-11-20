# FROM oven/bun AS build

# WORKDIR /

# COPY package.json package.json

# RUN bun install

# COPY ./ ./

# ENV NODE_ENV=production

# RUN bun build \
# 	--compile \
# 	--minify-whitespace \
# 	--minify-syntax \
# 	--target bun \
# 	--outfile server \
# 	./src/index.ts

# FROM gcr.io/distroless/base

# WORKDIR /

# COPY --from=build /server server

# ENV NODE_ENV=production

# CMD ["./server"]

# EXPOSE 8000




FROM oven/bun:1-debian AS build

WORKDIR /
COPY package.json package.json
RUN bun install

COPY ./ ./

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts


# Runtime
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y libvips && apt-get clean

WORKDIR /app
COPY --from=build /app/server ./server

CMD ["./server"]
EXPOSE 8000
