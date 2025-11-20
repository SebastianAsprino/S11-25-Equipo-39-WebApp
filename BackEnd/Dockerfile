FROM oven/bun AS build

WORKDIR /

# Cache packages installation
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

FROM alpine:3.20
RUN apk add --no-cache libvips

WORKDIR /

COPY --from=build /server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 8000