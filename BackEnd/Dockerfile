FROM oven/bun:1-debian AS build

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

COPY . .

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
