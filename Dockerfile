FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --ignore-scripts

COPY . .

RUN bunx prisma generate

EXPOSE 8080

CMD ["sh", "-c", "bunx prisma migrate deploy && bun run dev"] 