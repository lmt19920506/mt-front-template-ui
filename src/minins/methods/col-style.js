export default {
  methods: {
    previewColStyle({ width, height, baseWidth = 100, baseHeight = 3, layoutRow = 24 }, mixinStyle = {}) {
      return {
        width: `${(width * baseWidth)/layoutRow}%`,
        height: `${height/baseHeight}px`,
        ...mixinStyle
      }
    }
  },
}