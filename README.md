# SandBase

<p>
  <a
    href="https://github.com/dlbarduzzi/sandbase/actions/workflows/ci.yaml"
    target="_blank"
    rel="noopener">
    <img
      src="https://github.com/dlbarduzzi/sandbase/actions/workflows/ci.yaml/badge.svg"
      alt="ci"
    />
  </a>
</p>

## Getting Started

Create a `.env` file at the root of your project similar to [.env.example](.env.example).

Initialize database and apply migrations:

```sh
# Replace `docker` with your container management tool i.e. docker, podman, etc
docker compose up -d

# Apply migration
npm run db:migrate
```

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

[MIT](./LICENSE)
