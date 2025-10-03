import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'node18',
    lib: {
      entry: 'src/index.ts',
      name: 'HboiMcpServer',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        '@modelcontextprotocol/sdk',
        'ajv',
        'ajv-formats',
        /^node:/, // Exclude all Node.js built-in modules
        'fs',
        'path',
      ],
    },
  },
  define: {
    global: 'globalThis',
  },
});
