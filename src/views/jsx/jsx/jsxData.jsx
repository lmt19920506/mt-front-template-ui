const btnComponent = {
  name: 'button-counter',
  props: {
    count: {
      type: Number
    }
  },
  methods: {
    clickMe() {
      this.$emit('change', this.count + 1)
    }
  },
  render() {
    return (
    <button onClick={this.clickMe}>You Clicked Me {this.count} times---</button>
    )
  }
} 

export {
  btnComponent
}