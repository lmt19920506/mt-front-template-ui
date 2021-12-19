<script type="text/jsx">
export default {
  props: {
    typeSpan: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    openContactService() {
      alert(1)
    }
  },
  render() {
    return (
      <div
        class={this.typeSpan.attrs.class}
        style={this.typeSpan.attrs.style}
        onClick={this.openContactService}
      >
        {this.typeSpan.text}
        <p>world</p>
      </div>
    )
  }
}
</script>