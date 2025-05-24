# VuChat

A Vue 3 chat application with real-time messaging capabilities.

## Features

- Real-time chat messaging
- Room-based conversations
- Responsive design
- Keyboard shortcuts (ESC to return home)

## Routes

- `/` - Home page showing all available chat rooms
- `/chat/:roomId` - Chat window for specific room
  - Example: `/chat/room-1` opens chat for room-1

## Project Setup

1. Install dependencies:

```sh
pnpm install
```

2. Start development server:

```sh
pnpm dev
```

3. Build for production:

```sh
pnpm build
```

4. Run linter:

```sh
pnpm lint
```

## Development

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Disable Vetur if installed

### TypeScript Support

The project uses TypeScript with Vue 3. For proper type checking:

- Uses `vue-tsc` for type checking
- Requires [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) for `.vue` type support

### Project Structure

```
src/
├── components/         # Vue components
│   ├── ChatWindow.vue  # Chat interface
│   ├── InputMessage.vue # Message input
│   └── RoomCard.vue    # Room list item
├── pages/             # Route pages
│   └── Home.vue       # Home page with room list
├── stores/            # Pinia stores
│   ├── chat_store.ts  # Chat state management
│   └── room_store.ts  # Room state management
├── utils/             # Utility functions
└── App.vue           # Root component
```

### Keyboard Shortcuts

- `ESC` - Return to home page and clear current room

### State Management

- Uses Pinia for state management
- Chat store handles messages
- Room store manages room selection

## Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/) for customization options.
