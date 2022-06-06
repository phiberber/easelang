module.exports = {
    type: "bundle",
    esbuild: {
        target: "esnext",
        inject: ['src/interpreter/modules/nodeModules.ts']
    }
}